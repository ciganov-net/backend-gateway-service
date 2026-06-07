import { ApiProperty } from "@nestjs/swagger";

export class UploadAvatarResponse {
    @ApiProperty({
        example: 'afaf821abe260_newfile'
    })
    fileId: string;
}