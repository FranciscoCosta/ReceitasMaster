import { Body, Controller, Post } from '@nestjs/common';
import AuthService from './auth.service';
import { AuthDto } from './dto';
@Controller()
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}

export default AuthController;
