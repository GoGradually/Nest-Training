import {Controller, Get, Post, Param, Body, ParseIntPipe} from '@nestjs/common';
import {UserService} from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {PostService} from "../post/post.service";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly postService: PostService
    ) {
    }

    // 모든 유저 조회 (GET /users)
    @Get()
    async getAllUsers() {
        return this.userService.findAll();
    }

    // 특정 유저 조회 (GET /users/:id)
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    // 유저 생성 (POST /users)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get(':id/posts')
    async getPostsByUser(@Param('id', ParseIntPipe) id: number) {
        // 우선 유저 존재 확인 (없는 ID면 findOne에서 예외 발생)
        await this.userService.findOne(id);
        // 존재하면 해당 유저의 게시글 조회
        return this.postService.findByUser(id);
    }
}