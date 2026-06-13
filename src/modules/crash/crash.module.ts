import { Module } from '@nestjs/common';
import { CrashService } from './crash.service';
import { CrashController } from './crash.controller';

@Module({
  controllers: [CrashController],
  providers: [CrashService],
})
export class CrashModule {}
