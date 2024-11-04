import { useState, useCallback, useRef } from "react";
import { Alert } from "react-native";
import { Realm } from "@realm/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/User";
import { AuthenticationService, AuthenticationError } from "./authentication";

const USER_ID_KEY = "USER_ID";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authServiceRef = useRef<AuthenticationService | null>(null);

  // Initialize auth state
  const initialize = useCallback(async (realm: Realm) => {
    try {
      if (!authServiceRef.current) {
        authServiceRef.current = new AuthenticationService(realm);

        const storedUserId = await AsyncStorage.getItem(USER_ID_KEY);
        if (storedUserId) {
          const user = authServiceRef.current.getCurrentUser(
            new Realm.BSON.ObjectId(storedUserId),
          );
          if (user) {
            setCurrentUser(user);
          }
        }
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      if (!authServiceRef.current) {
        throw new Error("Authentication service not initialized");
      }
      const user = await authServiceRef.current.registerUser(
        username,
        password,
      );
      await AsyncStorage.setItem(USER_ID_KEY, user._id.toString());
      setCurrentUser(user);
      return user;
    } catch (error) {
      if (error instanceof AuthenticationError) {
        Alert.alert("Registration Error", error.message);
      } else {
        Alert.alert(
          "Error",
          "An unexpected error occurred during registration",
        );
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      if (!authServiceRef.current) {
        throw new Error("Authentication service not initialized");
      }
      const user = await authServiceRef.current.loginUser(username, password);
      await AsyncStorage.setItem(USER_ID_KEY, user._id.toString());
      setCurrentUser(user);
      return user;
    } catch (error) {
      if (error instanceof AuthenticationError) {
        Alert.alert("Login Error", error.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred during login");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem(USER_ID_KEY);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "An unexpected error occurred during logout");
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (
    username: string,
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      setIsLoading(true);
      if (!authServiceRef.current) {
        throw new Error("Authentication service not initialized");
      }
      await authServiceRef.current.changePassword(
        username,
        currentPassword,
        newPassword,
      );
      Alert.alert("Success", "Password changed successfully");
    } catch (error) {
      if (error instanceof AuthenticationError) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert(
          "Error",
          "An unexpected error occurred while changing password",
        );
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem(USER_ID_KEY);
      if (storedUserId && authServiceRef.current) {
        return authServiceRef.current.getCurrentUser(
          new Realm.BSON.ObjectId(storedUserId),
        );
      }
      return null;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  };

  return {
    currentUser,
    isLoading,
    initialize,
    signUp,
    login,
    logout,
    changePassword,
    getCurrentUser,
  };
};
