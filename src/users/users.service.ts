import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async create(createUserInput: CreateUserInput) {
    const hashed = await bcrypt.hash(createUserInput.password, 10);
    const user = this.userRepo.create({
      ...createUserInput,
      password: hashed,
    });
    return this.userRepo.save(user);
  }

  findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  findById(id: string) {
    return this.userRepo.findOneBy({ id });
  }
}
