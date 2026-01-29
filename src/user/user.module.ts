import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PostModule } from '../post/post.module';

@Module({
    imports: [PostModule],        // PostService를 주입받기 위해 PostModule import
    controllers: [UserController],// 이 모듈에서 사용하는 컨트롤러 등록
    providers: [UserService],     // 이 모듈에서 사용하는 서비스 등록
})
export class UserModule {}
