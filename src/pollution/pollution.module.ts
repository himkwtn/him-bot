import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LineModule } from 'src/line/line.module';
import { PollutionService } from './pollution.service';
import { PollutionController } from './pollution.controller';

@Module({
  imports: [HttpModule, ConfigModule, LineModule],
  providers: [PollutionService],
  controllers: [PollutionController],
})
export class PollutionModule {}
