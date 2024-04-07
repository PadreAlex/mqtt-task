export interface IMqttConfig {
  readonly port: number;
  readonly host: string;
  readonly protocol: string;
  readonly username: string;
  readonly password: string;
  readonly clean: boolean;
  readonly connectTimeout: number;
  readonly reconnectPeriod: number;
}
