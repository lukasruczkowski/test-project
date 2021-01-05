import { ApiProperty } from '@nestjs/swagger';

export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class User {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public lastName: string;

  // hidden
  public password: string;

  constructor(obj: IUser) {
    this.id = obj.id;
    this.email = obj.email;
    this.password = obj.password;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
  }

  public toResponseObject(): User {
    const obj = Object.assign({}, this);
    delete obj.password;

    return obj;
  }

  public isPasswordValid(password: string): boolean {
    return this.password === password;
  }
}
