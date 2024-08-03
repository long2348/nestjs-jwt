import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/models/user.entity';
import { UserService } from 'src/service/user.service';
import { UserController } from 'src/controllers/user.controller';
import { AuthService } from 'src/service/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, AuthService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
