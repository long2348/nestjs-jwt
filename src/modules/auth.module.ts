import { Module } from '@nestjs/common';

import { AuthService } from 'src/service/auth.service';
import { UserModule } from './user.module';
import { AuthController } from 'src/controllers/auth.controller';

@Module({
  imports: [UserModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
