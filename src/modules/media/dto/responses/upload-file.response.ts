import { ApiProperty } from "@nestjs/swagger";

export class UploadFileResponse {
    @ApiProperty({
        example: 'afaf821abe260_newfile'
    })
    fileId: string;
}