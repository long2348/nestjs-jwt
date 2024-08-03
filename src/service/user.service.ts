import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/models/user.entity';

export type UserRead = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findUser(username: string): Promise<UserRead | null> {
    return this.users.find((user) => user.username === username);
  }

  create(requestBody: any) {
    const user = this.userRepository.create(requestBody);
    return this.userRepository.save(user);
  }

  async updateById(id: number, requestBody: any) {
    let user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User ${id} does not exist`);
    }

    user = { ...user, ...requestBody };

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User ${id} does not exist`);
    }

    return this.userRepository.remove(user);
  }
}
