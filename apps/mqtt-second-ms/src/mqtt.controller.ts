import { Body, Controller, Post } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { SendMessageDTO } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: MqttService) {}
}
