import { Module } from '@nestjs/common';
import { AppController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { Bootstrappable } from '@app/bootstrap';
import { MqttModule } from '@app/mqtt';

@Bootstrappable('mqttSecond')
@Module({
  imports: [MqttModule.forRoot({})],
  controllers: [AppController],
  providers: [MqttService],
})
export class MqttMSModule {}
