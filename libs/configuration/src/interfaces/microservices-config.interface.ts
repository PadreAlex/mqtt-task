export interface IMicroservice {
  readonly url: string;
  readonly port: string;
}

export interface IMicroservicesConfig {
  mqttFirst: IMicroservice;
  mqttSecond: IMicroservice;
}

export type AppKey = keyof IMicroservicesConfig;
