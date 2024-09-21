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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../src/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "./user-provider";
import Link from "next/link";
import { ProductsProps } from "../lib/interfaces";




const Products = ({ data }: ProductsProps) => {
  const { user,cart,setCart } = useAuth();
  const isLogedIn = !!user;
  return (
    <div className="grid grid-cols-4 gap-4">
      <h1 className="text-3xl font-bold">{user?.name}</h1>
      {data?.map((product: any) => (
        <Card
          key={product._id}
          className="w-[350px] min-h-[400px] h-full border-red-500"
        >
          <CardHeader>
            {product.image && (
              <Image
                src={`http://localhost:8000/uploads/${product.image}`}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-md"
              />
            )}
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.price}€</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-between">
            {isLogedIn ? (
              <Button
                onClick={() => {
                  setCart([...cart, product]);
                }}
              >
                Add to cart
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger className={buttonVariants({})}>
                  Add to cart
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>You are not logged in</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please log in to add products to the cart or create an
                      account
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Link
                      href="/login"
                      className={buttonVariants({ variant: "outline" })}
                    >
                      Log in
                    </Link>

                    <Link href="/register" className={buttonVariants({})}>
                      Create account
                    </Link>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Products;
