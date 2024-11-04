import { useState, useCallback, useRef, useEffect } from "react";
import { Alert } from "react-native";
import { Realm } from "@realm/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/User";
import { AuthenticationService, AuthenticationError } from "./authentication";

const USER_ID_KEY = "USER_ID";

let globalAuthService: AuthenticationService | null = null;

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const initializeStartedRef = useRef(false);

  // Initialize auth state
  const initialize = useCallback(async (realm: Realm) => {
    if (initializeStartedRef.current) {
      console.log("Initialization already started, skipping...");
      return;
    }

    try {
      console.log("Starting initialization...");
      initializeStartedRef.current = true;

      if (!globalAuthService) {
        globalAuthService = new AuthenticationService(realm);
        console.log("Auth service created:", globalAuthService);
      }

      const storedUserId = await AsyncStorage.getItem(USER_ID_KEY);
      if (storedUserId) {
        const user = globalAuthService.getCurrentUser(
          new Realm.BSON.ObjectId(storedUserId),
        );
        if (user) {
          setCurrentUser(user);
        }
      }

      setIsInitialized(true);
      console.log(
        "Initialization complete. Auth service status:",
        Boolean(globalAuthService),
      );
    } catch (error) {
      console.error("Error initializing auth:", error);
      setIsInitialized(false);
      initializeStartedRef.current = false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      console.log("Login attempt - Auth state:", {
        isInitialized,
        hasAuthService: Boolean(globalAuthService),
      });

      if (!globalAuthService) {
        throw new Error(
          "Authentication service not initialized. Please try again.",
        );
      }

      try {
        setIsLoading(true);
        const user = await globalAuthService.loginUser(username, password);
        await AsyncStorage.setItem(USER_ID_KEY, user._id.toString());
        setCurrentUser(user);
        return user;
      } catch (error) {
        if (error instanceof AuthenticationError) {
          Alert.alert("Login Error", error.message);
        } else {
          Alert.alert("Error", "An unexpected error occurred during login");
          console.error("Login error:", error);
        }
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [isInitialized],
  );

  const signUp = useCallback(async (username: string, password: string) => {
    if (!globalAuthService) {
      throw new Error(
        "Authentication service not initialized. Please try again.",
      );
    }

    try {
      setIsLoading(true);
      const user = await globalAuthService.registerUser(username, password);
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
        console.error("Registration error:", error);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
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
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      // Don't cleanup globalAuthService here as it needs to persist
      initializeStartedRef.current = false;
    };
  }, []);

  const changePassword = async (
    username: string,
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      setIsLoading(true);
      if (!globalAuthService) {
        throw new Error("Authentication service not initialized");
      }
      await globalAuthService.changePassword(
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
      if (storedUserId && globalAuthService) {
        return globalAuthService.getCurrentUser(
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
    isInitialized,
    initialize,
    signUp,
    login,
    logout,
    changePassword,
    getCurrentUser,
  };
};
