import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UploadFileRequest {
    @ApiProperty({
        example: 'sport'
    })
    @IsNotEmpty()
    @IsString()
    category: string;
}