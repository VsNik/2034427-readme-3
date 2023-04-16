import {Controller, Get, Inject, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {FileType} from "@project/shared/app-types";
import {fillObject} from "@project/util/util-core";
import {uploaderConfig} from "@project/config/config-uploader";
import {ConfigType} from "@nestjs/config";
import {UploadedFileRdo} from "./rdo/uploaded-file.rdo";
import {FileService} from "./file.service";
import {MongoidValidationPipe} from "@project/shared/shared-pipes";

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(uploaderConfig.KEY) private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: FileType) {
    const newFile = await this.fileService.saveFile(file);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    const path = `${this.applicationConfig.serveRoot}${existFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}
