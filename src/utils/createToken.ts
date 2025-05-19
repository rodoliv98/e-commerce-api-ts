import jwt, { JwtPayload } from 'jsonwebtoken';

export function createAccessAndRefreshTokens(id: string, role: string): string[] {
    const accessToken = jwt.sign({ userId: id, role: role }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ userId: id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    
    return  [accessToken, refreshToken] ;
}

export function createToken(id: string): string {
    return jwt.sign({ userId: id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
}
    
export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
} 