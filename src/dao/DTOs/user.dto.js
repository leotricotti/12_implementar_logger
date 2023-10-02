export default class UserDto {
  constructor(user) {
    this.first_name = user.first_name;
    this.username = user.email;
    this.role = user.role;
  }
}
