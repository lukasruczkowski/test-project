export class User {
  public id: string;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;

  public toResponseObject() {
    const obj = Object.assign({}, this);
    delete obj.password;

    return obj;
  }

  public isPasswordValid(password: string) {
    return this.password === password;
  }
}
