import { Controller, Get } from '@nestjs/common';
import { PollutionService } from './pollution.service';

@Controller('pollution')
export class PollutionController {
  constructor(private readonly pollutionService: PollutionService) {}

  @Get()
  test() {
    // this.pollutionService.sendDailyMessage();
  }
}
