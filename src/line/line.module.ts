import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LineClient } from './line.client';
import { LineController } from './line.controller';

@Module({
  imports: [ConfigModule],
  providers: [LineClient],
  exports: [LineClient],
  controllers: [LineController],
})
export class LineModule {}
