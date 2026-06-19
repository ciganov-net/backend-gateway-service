import { ApiProperty } from "@nestjs/swagger";

export class GetFileResponse {
    @ApiProperty()
    url: string;
}