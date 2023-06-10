import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.AuthService.signup(dto);
  }

  @Post('login')
  login() {
    return this.AuthService.login();
  }
}
