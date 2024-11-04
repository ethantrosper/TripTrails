import { Realm } from "@realm/react";
import bcrypt from "react-native-bcrypt";
import { User } from "../models/User";
import { getRealm } from "../storage/storage";

// Initialize bcrypt with a custom salt round
const SALT_ROUNDS = 10;

// Use crypto.getRandomValues for random bytes
function getRandomBytes(len: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(len));
}

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

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Generate a salt using the random bytes
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        // Hash the password with the generated salt
        const hash = bcrypt.hashSync(password, salt);
        resolve(hash);
      } catch (error) {
        reject(new Error("Failed to hash password"));
      }
    });
  }

  private verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const isValid = bcrypt.compareSync(plainPassword, hashedPassword);
        resolve(isValid);
      } catch (error) {
        reject(new Error("Failed to verify password"));
      }
    });
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

    try {
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
    } catch (error) {
      throw new AuthenticationError("Failed to hash password");
    }
  }

  async loginUser(username: string, password: string): Promise<User> {
    const user = this.realm
      .objects<User>("User")
      .filtered("username == $0", username)[0];

    if (!user) {
      throw new AuthenticationError("User not found");
    }

    try {
      const isPasswordValid = await this.verifyPassword(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new AuthenticationError("Invalid password");
      }
      return user;
    } catch (error) {
      throw new AuthenticationError("Failed to verify password");
    }
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

    try {
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
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      throw new AuthenticationError("Failed to change password");
    }
  }

  // Helper method to get the currently logged-in user
  getCurrentUser(userId: Realm.BSON.ObjectId): User | null {
    return this.realm.objectForPrimaryKey<User>("User", userId);
  }
}
