export const TOKEN_PORT = Symbol('TOKEN_PORT');

export interface ITokenPort {
  generateToken(payload: { sub: string; email: string }): Promise<string>;
  verifyToken(token: string): Promise<{ sub: string; email: string }>;
}

