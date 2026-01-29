import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 전역 ValidationPipe 설정: DTO에 명시된 검증규칙을 모두 적용
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    // PrismaService의 shutdown hook 활성화 (Graceful shutdown)
    const prismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);
    const port = Number(process.env.PORT ?? 5000);
    await app.listen(port);
}
bootstrap();
