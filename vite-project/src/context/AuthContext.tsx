import axios from "axios";
import { IUser, IInputs } from "../shared/types";
import {  useEffect, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage.tsx";
import Cookies from "js-cookie";
import React, { useCookies } from 'react-cookie';

interface AuthContextProps {
  currentUser: IUser | null;
  login(inputs: IInputs): void;
  logout: () => void;
  signup(inputs: IInputs): void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage<IUser | null>(
    "currentUser",
    null
  );

  // Example login and logout functions
  const login = async (inputs: IInputs): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:3000/login", inputs, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
        },
        withCredentials: true,
      });
      await setCurrentUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Login error:", error);
      // Handle errors or throw them as needed
    }
  };

  const signup = async (inputs: IInputs): Promise<void> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        inputs,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      await console.log(`user created ${response}`);
    } catch (error) {
      console.error("signup error:", error);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    const token = Cookies.get("access_token");
    console.log(token);
    if (!token) {
      console.error("Missing access token.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/logout", {
        Credential:true
      }
      );
      setCurrentUser(null);
      localStorage.clear()
      console.log(response);
   
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
   useEffect(() => {
   
    if(currentUser === null) document.cookie('')

  }, []);
  useEffect(() => {
   
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
