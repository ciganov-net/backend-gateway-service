import { Module } from "@nestjs/common";
import { MediaController } from "./media.controller";
import { MediaClientGrpc } from "./media.grpc";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { PROTO_PATHS } from "@ciganov/contracts";

@Module({
    controllers: [MediaController],
    providers: [MediaClientGrpc],
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'MEDIA_PACKAGE',
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: 'media.v1',
                        protoPath: PROTO_PATHS.MEDIA,
                        url: configService.getOrThrow<string>('MEDIA_GRPC_URL')
                    }
                }),
                inject: [ConfigService]
            }
        ])
    ],
    exports: [MediaClientGrpc]
})
export class MediaModule {}