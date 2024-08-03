import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { PassportModule } from '@nestjs/passport';

import { join } from 'path';
import { Todo } from './models/todo.entity';
import { User } from './models/user.entity';
import { UserModule } from './modules/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './modules/mail.module';
import { AuthModule } from './modules/auth.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TodoModule } from './modules/todo.module';
import { jwtConstants } from './contanst/contanst';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        // password: 'e25a1e5c95d84a32abfd6f3545cd2c57',
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp://sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'ee79e560449ca6',
          pass: 'dd190c08bf3bd2',
        },
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [Todo, User],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    TodoModule,
    UserModule,
    MailModule,
    AuthModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
