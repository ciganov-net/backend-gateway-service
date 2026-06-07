import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { DeleteAvatarRequest, GetFileRequest, MediaServiceClient, UploadAvatarRequest, UploadFileRequest } from '@ciganov/contracts/dist/gen/media';
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

    uploadAvatar(req: UploadAvatarRequest) {
        return this.mediaService.uploadAvatar(req)
    }

    deleteAvatar(req: DeleteAvatarRequest) {
        return this.mediaService.deleteAvatar(req)
    }

    uploadFile(req: UploadFileRequest) {
        return this.mediaService.uploadFile(req)
    }

    getFile(req: GetFileRequest) {
        return this.mediaService.getFile(req)
    }
}