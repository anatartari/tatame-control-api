import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenPort } from '../port/use-case/token.port';

@Injectable()
export class JwtTokenAdapter implements ITokenPort {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: { sub: string; email: string }): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<{ sub: string; email: string }> {
    return this.jwtService.verifyAsync(token);
  }
}

