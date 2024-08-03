import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from 'src/service/user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/user/:id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('/user')
  createrUser(@Body() requestBody: any) {
    return this.userService.create(requestBody);
  }

  @Put('/user/:id')
  updateUser(@Param('id') id: number, requestBody: any) {
    return this.userService.updateById(id, requestBody);
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
