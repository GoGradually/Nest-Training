import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';  // 전역 등록된 PrismaService
import { Prisma, User } from '@prisma/client';             // Prisma가 생성한 User 타입

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    // 유저 생성
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }

    // 모든 유저 조회
    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    // ID로 특정 유저 조회 (없으면 404 예외)
    async findOne(userId: number): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`ID ${userId}에 해당하는 유저를 찾을 수 없습니다.`);
        }
        return user;
    }
}