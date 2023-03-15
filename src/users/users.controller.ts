import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
const bcrypt = require('bcrypt');

@ApiTags('users')
@ApiBearerAuth()
@ApiHeader({ 
  name: 'Bearer', 
  description: 'access token provided by the /login endpoint', 
  required:true,
  schema:{
    type:'string',
    example:'token'
  }
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto,  @Res() res) {
    return this.usersService.create(createUserDto, res);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.usersService.findOne(+id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res) {
    return this.usersService.update(+id, updateUserDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    return this.usersService.remove(+id, res);
  }
}
