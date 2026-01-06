import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  accessToken: string;

  @ApiProperty({
    example: {
      email: 'user@example.com',
      name: 'John Doe',
    },
    description: 'User information',
  })
  user: {
    email: string;
    name: string;
  };
}

