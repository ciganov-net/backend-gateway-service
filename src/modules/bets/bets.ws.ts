import { Logger, UnauthorizedException } from '@nestjs/common'
import {
	ConnectedSocket,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { lastValueFrom } from 'rxjs'
import { Server, Socket } from 'socket.io'

import { AuthClientGrpc } from '../auth/auth.grpc'

import { WsPayload } from './dto'

@WebSocketGateway({
	cors: {
		origin: true,
		credentials: true
	}
})
export class BetsWebsocketGateway
	implements OnGatewayConnection, OnGatewayDisconnect
{
	private logger = new Logger(BetsWebsocketGateway.name)
	constructor(private readonly authClient: AuthClientGrpc) {}

	@WebSocketServer()
	server: Server

	async handleConnection(client: Socket) {
		const cookies = client.handshake.headers.cookie
		const token = cookies
			?.split('; ')
			.find(cookie => cookie.startsWith('x-session-token='))
			?.split('=')[1]
		if (!token) client.disconnect()
		const { session } = await lastValueFrom(this.authClient.getSession(token))
		if (!session) throw new UnauthorizedException('Session expired')
		client.data.user = session
		this.logger.log(`Successfully connected to websocket: ${client.id}`)
	}

	async handleDisconnect(client: Socket) {
		this.logger.log(`Successfully disconnecting to websocket: ${client.id}`)
	}

	@SubscribeMessage('join')
	handleJoin(@ConnectedSocket() client: Socket) {
		const userId = client.data.user.id
		client.join(`user:${userId}`)

		this.logger.log(`${client.id} joined user:${userId}`)
	}

	notify(payload: WsPayload) {
		this.server
			.to(`user:${payload.userId}`)
			.emit('notification', payload.status)
	}
}
