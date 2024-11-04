import bcryptjs from "bcryptjs";
import { Realm } from "@realm/react";
import { User } from "../models/User";
import { getRealm } from "../storage/storage";

const SALT_ROUNDS = 10;

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthenticationService {
  private realm: Realm;

  constructor(realm: Realm) {
    this.realm = realm;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, SALT_ROUNDS);
  }

  private async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcryptjs.compare(plainPassword, hashedPassword);
  }

  async registerUser(username: string, password: string): Promise<User> {
    const existingUser = this.realm
      .objects<User>("User")
      .filtered("username == $0", username)[0];
    if (existingUser) {
      throw new AuthenticationError("Username already exists");
    }

    if (password.length < 8) {
      throw new AuthenticationError(
        "Password must be at least 8 characters long",
      );
    }

    const hashedPassword = await this.hashPassword(password);

    return new Promise((resolve, reject) => {
      try {
        let newUser: User;
        this.realm.write(() => {
          newUser = this.realm.create<User>("User", {
            _id: new Realm.BSON.ObjectId(),
            username,
            password: hashedPassword,
            createdAt: new Date(),
            trips: [],
          });
        });
        resolve(newUser!);
      } catch (error) {
        reject(new AuthenticationError("Failed to create user"));
      }
    });
  }

  async loginUser(username: string, password: string): Promise<User> {
    const user = this.realm
      .objects<User>("User")
      .filtered("username == $0", username)[0];

    if (!user) {
      throw new AuthenticationError("User not found");
    }

    const isPasswordValid = await this.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError("Invalid password");
    }

    return user;
  }

  async changePassword(
    username: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = this.realm
      .objects<User>("User")
      .filtered("username == $0", username)[0];

    if (!user) {
      throw new AuthenticationError("User not found");
    }

    const isPasswordValid = await this.verifyPassword(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new AuthenticationError("Current password is incorrect");
    }

    if (newPassword.length < 8) {
      throw new AuthenticationError(
        "New password must be at least 8 characters long",
      );
    }

    const hashedPassword = await this.hashPassword(newPassword);

    this.realm.write(() => {
      user.password = hashedPassword;
    });
  }

  // Helper method to get the currently logged-in user
  getCurrentUser(userId: Realm.BSON.ObjectId): User | null {
    return this.realm.objectForPrimaryKey<User>("User", userId);
  }
}
