import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService],      // 다른 모듈(UserModule)에서 PostService를 주입받을 수 있도록 export
})
export class PostModule {}
