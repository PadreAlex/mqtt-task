export interface IMicroservice {
  readonly url: string;
  readonly port: string;
}

export interface IMicroservicesConfig {
  mqttSender: IMicroservice;
  mqttListener: IMicroservice;
}

export type AppKey = keyof IMicroservicesConfig;
