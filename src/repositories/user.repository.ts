import { Injectable } from '@nestjs/common';
import * as low from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileSync';
import { User } from '../entities/user';

@Injectable()
export class UserRepository {
  private db: any;

  constructor() {
    this.db = low(new FileAsync('db.json'));
  }

  public async create(user: User): Promise<User> {
    await this.db.defaults({ users: [] }).write();
    await this.db.get('users')
      .push({
        id: user.id,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      })
      .write();

    return user;
  }

  public async findOne(query: string|any): Promise<User> {
    let record;

    if (typeof query === 'string') {
      record = await this.db.get('users')
        .find({ id: query })
        .value();
    } else {
      record = await this.db.get('users')
        .find(query)
        .value();
    }

    const user = new User();
    user.id = record.id;
    user.email = record.email;
    user.password = record.password;
    user.firstName = record.firstName;
    user.lastName = record.lastName;

    return user;
  }

  public async findAll(): Promise<User[]> {
    const records = await this.db.get('users')
      .value();

    return records.map(record => {
      const user = new User();
      user.id = record.id;
      user.email = record.email;
      user.password = record.password;
      user.firstName = record.firstName;
      user.lastName = record.lastName;

      return user;
    });
  }

  public async delete(id: string): Promise<void> {
    await this.db.get('users')
      .remove({ id })
      .write();
  }

  public async update(id: string, obj: any): Promise<User> {
    const updatedRecord = await this.db.get('users')
      .find({ id })
      .assign(obj)
      .write();

    const user = new User();
    user.id = updatedRecord.id;
    user.email = updatedRecord.email;
    user.password = updatedRecord.password;
    user.firstName = updatedRecord.firstName;
    user.lastName = updatedRecord.lastName;

    return user;
  }
}
