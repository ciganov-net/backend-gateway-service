import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { MediaClientGrpc } from "./media.grpc";
import { UploadAvatarResponse } from "./dto/responses/upload-avatar.response";
import { lastValueFrom } from "rxjs";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { CurrentUser, Protected } from "@/shared/decorators";
import { DeleteAvatarResponse } from "./dto/responses/delete-avatar.response";
import { UploadFileRequest } from "./dto/requests/upload-file.request";
import { UploadFileResponse } from "./dto/responses/upload-file.response";
import { GetFileResponse } from "./dto/responses/get-file.response";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('media')
export class MediaController {
    constructor(private readonly client: MediaClientGrpc) {}

    @ApiOperation({
        summary: 'Upload user\'s avatar',
        description: 'Uploades the image and sets it as the user\'s profile picture by returning fileId which later can be used to retrieve the image'
    })
    @ApiOkResponse({
        type: UploadAvatarResponse
    })
    @Protected()
    @UseInterceptors(FileInterceptor('file'))
    @Post('avatar')
    @HttpCode(HttpStatus.CREATED)
    async uploadAvatar(
        @CurrentUser('id') userId: string,

        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 10 * 1024 * 1024,
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp|gif)$/i,
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ): Promise<UploadAvatarResponse> {
        return await lastValueFrom(
            this.client.uploadAvatar({
                userId,
                file: new Uint8Array(file.buffer),
                filename: file.originalname,
                contentType: file.mimetype,
            }),
        )
    }

    @ApiOperation({
        summary: 'Delete user\'s avatar',
        description: 'Deletes user\'s profile picture'
    })
    @ApiOkResponse({
        type: DeleteAvatarResponse
    })
    @Protected()
    @Delete('avatar')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAvatar(
        @CurrentUser('id') userId: string
    ): Promise<DeleteAvatarResponse> {
        return await lastValueFrom(this.client.deleteAvatar({ userId }))
    }

    @ApiOperation({
        summary: 'Uploads file',
        description: 'Uploads file and returns fileId'
    })
    @ApiOkResponse({
        type: UploadFileResponse
    })
    @Protected()
    @UseInterceptors(FileInterceptor('file'))
    @Post('file')
    @HttpCode(HttpStatus.CREATED)
    async uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 10 * 1024 * 1024,
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp|gif)$/i,
                    }),
                ],
            }),
        )
        file: Express.Multer.File,

        @Body() dto: UploadFileRequest
    ): Promise<UploadFileResponse> {
        return await lastValueFrom(
            this.client.uploadFile({
                file: new Uint8Array(file.buffer),
                filename: file.originalname,
                contentType: file.mimetype,
                category: dto.category
            })
        )
    }

    @ApiOperation({
        summary: 'Gets file url',
        description: 'Returns url which can be used to access the image by its id'
    })
    @ApiOkResponse({
        type: GetFileResponse
    })
    @Protected()
    @Get('file/:fileId')
    @HttpCode(HttpStatus.OK)
    async getFile(@Param('fileId') fileId: string): Promise<GetFileResponse> {
        return await lastValueFrom(this.client.getFile({ fileId }))
    }
}

