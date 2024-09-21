"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "./user-provider";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/api/auth/login", { email, password })
      .then((response) => {
        if (response.data?.token) {
          // Store token in localStorage or cookies
          localStorage.setItem("authToken", response.data.token);

          
          localStorage.setItem("user", JSON.stringify(response.data.user));

          setUser(response.data.user);

          // Redirect after successful login
          router.push("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Please enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit">Log In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
