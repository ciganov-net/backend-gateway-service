import { PROTO_PATHS } from '@ciganov/contracts'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { AuthController } from './auth.controller'
import { AuthClientGrpc } from './auth.grpc'

@Global()
@Module({
	controllers: [AuthController],
	providers: [AuthClientGrpc],
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'AUTH_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'auth.v1',
						protoPath: PROTO_PATHS.AUTH,
						url: configService.getOrThrow<string>('AUTH_GRPC_URL')
					}
				}),
				inject: [ConfigService]
			}
		])
	],
	exports: [AuthClientGrpc]
})
export class AuthModule {}
