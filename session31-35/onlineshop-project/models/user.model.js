const db = require("../data/database");
const bcrypt = require("bcryptjs");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.address = {
      street,
      postalCode: postal,
      city,
    };
  }

  async getUserWithSameEmail() {
    return await db.getDb().collection("users").findOne({ email: this.email });
  }

  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }

  async hasMatchingPssword(hasedPassword) {
    return await bcrypt.compare(this.password, hasedPassword);
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      fullname: this.fullname,
      address: this.address,
    });
  }
}

module.exports = User;
