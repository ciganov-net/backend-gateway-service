import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { MediaServiceClient } from '@ciganov/contracts/dist/gen/media';
import type { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class MediaClientGrpc implements OnModuleInit {
    private mediaService: MediaServiceClient

    public constructor(
        @Inject('MEDIA_PACKAGE') private readonly client: ClientGrpc
    ) {}

    public onModuleInit() {
        this.mediaService = this.client.getService<MediaServiceClient>('MediaService')
    }
}