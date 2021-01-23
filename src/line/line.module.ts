import { Module } from '@nestjs/common';
import { LineClient } from './line.client';

@Module({
  providers: [LineClient],
  exports: [LineClient],
})
export class LineModule {}
