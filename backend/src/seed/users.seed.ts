import * as uuid from 'uuid';
import { NestFactory } from '@nestjs/core';

import { User } from '../entities/user';
import { AppModule } from '../app.module';
import { UserService } from '../services/user.service';

const users: User[] = [
  new User({
    id: uuid.v4(),
    email: 'user1@example.com',
    firstName: 'User1',
    lastName: 'User',
    password: 'P@ssword123',
  }),
  new User({
    id: uuid.v4(),
    email: 'user2@example.com',
    firstName: 'User2',
    lastName: 'User',
    password: 'P@ssword123',
  }),
  new User({
    id: uuid.v4(),
    email: 'user3@example.com',
    firstName: 'User3',
    lastName: 'User',
    password: 'P@ssword123',
  }),
  new User({
    id: uuid.v4(),
    email: 'user4@example.com',
    firstName: 'User4',
    lastName: 'User',
    password: 'P@ssword123',
  }),
  new User({
    id: uuid.v4(),
    email: 'user5@example.com',
    firstName: 'User5',
    lastName: 'User',
    password: 'P@ssword123',
  }),
];

(async () => {
  const app = await NestFactory.create(AppModule);
  const userService = app.get<UserService>(UserService);
  await Promise.all(users.map(u => userService.createUser(u)));
  await app.close();
  process.exit();
})();
