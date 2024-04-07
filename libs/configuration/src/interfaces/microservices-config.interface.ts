export interface IMicroservice {
  readonly url: string;
  readonly port: string;
}

export interface IMicroservicesConfig {
  mqtt: IMicroservice;

}

export type AppKey = keyof IMicroservicesConfig;
