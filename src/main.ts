import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common/pipes';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import * as yaml from 'js-yaml';
import { SwaggerModule } from '@nestjs/swagger';
import { MyLogger } from './logger/logger.service';
config();

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 4000;
  const app = await NestFactory.create(AppModule);

  try {
    const filePath = resolve(__dirname, '..', 'doc', 'api.yaml');
    const yamlFile = await readFile(filePath, 'utf8');
    const yamlObject: any = yaml.load(yamlFile);

    SwaggerModule.setup('doc', app, yamlObject);
  } catch (e) {
    console.error(e.message);
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useLogger(app.get(MyLogger));
  await app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
  });
}
bootstrap();
