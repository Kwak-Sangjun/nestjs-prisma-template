import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: '사용자 이름' })
    name: string;
    @ApiProperty({ description: '사용자 이메일' })
    email: string;
}
