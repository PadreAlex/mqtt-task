import { Module } from '@nestjs/common';
import { AppController } from './mqtt.controller';
import { MqttSenderService } from './mqtt.service';
import { Bootstrappable } from '@app/bootstrap';
import { MqttModule } from '@app/mqtt';

@Bootstrappable('mqttSender')
@Module({
  imports: [MqttModule.forRoot({})],
  controllers: [AppController],
  providers: [MqttSenderService],
})
export class MqttMSModule {}
