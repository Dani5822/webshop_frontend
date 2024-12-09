import {
    Controller,
    Post,
    Body,
    Session,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('register')
    async register(
      @Body('username') username: string,
      @Body('password') password: string,
    ) {
      try {
        return await this.authService.register(username, password);
      } catch (e) {
        throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
      }
    }
  
    @Post('login')
    async login(
      @Body('username') username: string,
      @Body('password') password: string,
      @Session() session: Record<string, any>,
    ) {
      const user = await this.authService.validateUser(username, password);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      session.userId = user.id; // Ensure this line is setting the userId correctly
      return { message: 'Login successful' };
    }
  
    @Post('logout')
    logout(@Session() session: Record<string, any>) {
      session.destroy((err) => {
        if (err) {
          throw new HttpException('Logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      });
      return { message: 'Logout successful' };
    }
  }
  