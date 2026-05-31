import { Controller } from "@nestjs/common";
import { MediaClientGrpc } from "./media.grpc";

@Controller('media')
export class MediaController {
    constructor(private readonly client: MediaClientGrpc) {}
}