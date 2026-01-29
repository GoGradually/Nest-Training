import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    title: string;      // 게시글 제목 (필수)

    @IsNotEmpty()
    content: string;    // 게시글 내용 (간단히 필수로 가정)

    @IsNotEmpty()
    userId: number;     // 작성자 유저 ID (필수, 숫자)
}