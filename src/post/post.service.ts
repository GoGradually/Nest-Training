import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Post } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    // 게시글 생성 (주어진 userId의 유저가 작성자로 설정됨)
    async create(userId: number, data: Prisma.PostCreateInput): Promise<Post> {
        // 우선 해당 ID의 유저가 존재하는지 확인
        const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            throw new NotFoundException(`ID ${userId}에 해당하는 유저가 없어 게시글을 생성할 수 없습니다.`);
        }
        // Prisma의 관계 연결을 통해 새 게시글 생성 및 유저와 연관짓기
        return this.prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                author: { connect: { id: userId } }  // 관계 연결: authorId 설정
            },
        });
    }

    // 모든 게시글 조회
    async findAll(): Promise<Post[]> {
        return this.prisma.post.findMany();
    }

    // ID로 특정 게시글 조회 (없으면 예외)
    async findOne(postId: number): Promise<Post> {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post) {
            throw new NotFoundException(`ID ${postId}에 해당하는 게시글을 찾을 수 없습니다.`);
        }
        return post;
    }

    // 특정 유저가 작성한 게시글 목록 조회
    async findByUser(userId: number): Promise<Post[]> {
        // 유저 존재 여부는 호출하는 Controller에서 별도 확인하거나, 여기서 해도 무방
        // 여기서는 존재하지 않으면 빈 배열 혹은 예외를 선택적으로 처리 가능
        return this.prisma.post.findMany({
            where: { authorId: userId },
        });
    }
}