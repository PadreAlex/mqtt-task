import { NestFactory } from '@nestjs/core';
import { Logger, NestInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { AppKey, IMicroservice } from '@app/configuration/interfaces';
import { writeFile } from 'fs/promises';
import { MicroservicesConfig } from '@app/configuration';
import { json } from 'express';

/**
 * Im just lazy and I don`t like setting up
 * bootstrap every single time,
 * so using this common class instead
 */
class Microservice {
  private appKey: AppKey;
  private config: IMicroservice;
  private app: NestExpressApplication;
  private logger: Logger;

  constructor(private appModule: any) {
    this.getAppKey();
    this.setupLogger();
    this.getConfig();
  }

  private getAppKey(): void {
    this.appKey = Reflect.getMetadata('appKey', this.appModule);
    if (!this.appKey) {
      throw new Error(
        `Class ${this.appModule.name} missing appKey metadata property`,
      );
    }
  }

  private setupLogger(): void {
    const ctx = `${this.appKey.replace(/^\w/, c =>
      c.toUpperCase(),
    )}Microservice`;
    this.logger = new Logger(ctx, { timestamp: true });
  }

  private getConfig() {
    this.config = MicroservicesConfig[this.appKey];
    if (!this.config) {
      throw new Error(`Missing config for microservice ${this.appKey}`);
    }
  }

  async run(): Promise<void> {
    try {
      this.app = await NestFactory.create<NestExpressApplication>(
        this.appModule,
      );

      this.app.use(json({ limit: '50mb' }));

      this.setupMiddlewares();
      this.setupPipes();
      this.setupInterceptors();
      this.setupCors();
      await this.setupDocumentation();

      await this.app.listen(this.config.port);
      this.logger.log(`Listening on port ${this.config.port}`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async setupDocumentation(): Promise<void> {
    const openApiConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Archon API')
      .setDescription('backend for archon service')
      .setVersion('1.0')
      .build();

    // everybody likes swagger
    const document = SwaggerModule.createDocument(this.app, openApiConfig);
    SwaggerModule.setup('swagger', this.app, document);
    await writeFile(
      // all files should be in this folder. If folder does not exist, create it manually
      `swagger-files/${this.appModule.name}.json`,
      JSON.stringify(document),
    );
  }

  private setupCors(): void {
    this.app.enableCors();
  }

  private setupMiddlewares(): void {
    this.app.use(cookieParser(), bodyParser.text({ type: ['*/xml', '+xml'] }));
  }

  private setupPipes(): void {
    this.app.useGlobalPipes(new ValidationPipe({ transform: true }));
  }

  private setupInterceptors(): void {
    const globalInterceptors: NestInterceptor[] = [];
    this.app.useGlobalInterceptors(...globalInterceptors);
  }
}

export async function bootstrap(appModule: any): Promise<void> {
  await new Microservice(appModule).run();
}
