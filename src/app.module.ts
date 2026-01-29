import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
    imports: [PrismaModule, UserModule, PostModule],  // 각종 모듈을 import
})
export class AppModule {}
