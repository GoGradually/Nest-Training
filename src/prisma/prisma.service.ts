import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        const url =
            process.env.DATABASE_URL ?? `file:./dev.db`;
        const adapter = new PrismaBetterSqlite3({ url });
        super({ adapter });
    }

    async onModuleInit() {
        // 애플리케이션 모듈 초기화 시 DB 연결
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        process.on('beforeExit', async () => {
            await app.close();
        });
    }
}
