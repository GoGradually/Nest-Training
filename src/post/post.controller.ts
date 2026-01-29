import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    // 모든 게시글 조회 (GET /posts)
    @Get()
    async getAllPosts() {
        return this.postService.findAll();
    }

    // 특정 게시글 조회 (GET /posts/:id)
    @Get(':id')
    async getPostById(@Param('id', ParseIntPipe) id: number) {
        return this.postService.findOne(id);
    }

    // 게시글 생성 (POST /posts)
    @Post()
    async createPost(@Body() createPostDto: CreatePostDto) {
        const { userId, ...postData } = createPostDto;
        return this.postService.create(userId, postData);
    }
}