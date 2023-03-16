import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guards/jwt-auth-guard';

@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get('/me')
  // getMe(@CurrentUser() currentUser: User) {
  //   // console.log(currentUser);
  //   return currentUser;
  // }
}
