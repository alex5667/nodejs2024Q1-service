import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common/pipes';
config();

async function bootstrap() {
  const PORT = Number(process.env.PORT);
  console.log('PORT', PORT);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      enableDebugMessages: true,
    }),
  );
  await app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
  });
}
bootstrap();
