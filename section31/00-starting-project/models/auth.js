const db = require("../data/database");
const bcrypt = require("bcryptjs");

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async getUserWithSameEmail() {
    const exitingUser = await db.getDb().collection("users").findOne({ email: this.email });
    return exitingUser;
  }

  async exitsAlready() {
    const exitingUser = await this.getUserWithSameEmail();
    if (exitingUser) {
      return true;
    } else {
      return false;
    }
  }

  async signUp() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    const user = {
      email: this.email,
      password: hashedPassword,
    };

    const result = await db.getDb().collection("users").insertOne(user);

    return result;
  }

  async login(comparePassword) {
    const passwordsAreEqual = await bcrypt.compare(this.password, comparePassword);
    return passwordsAreEqual;
  }
}

module.exports = User;
