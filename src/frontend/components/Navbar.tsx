"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { ModeToggle } from "@/components/theme-provider";
import { useAuth } from "./user-provider";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function NavigationMenuDemo() {
  const {cart} = useAuth();
  return (
    <div className="flex justify-between mx-4 pt-4">
      <ul className="flex space-x-2">
        <li>Home</li>
        <li>About</li>
      </ul>
      <div className="flex space-x-4 items-center">
        <div className="relative w-10 h-10 flex items-center justify-center" >
         {
          cart.length > 0 ?  <p className="absolute top-0 right-0 text-xs bg-red-500 w-4 h-4 rounded-full text-center">{cart.length} </p> : null
         }
        <ShoppingCartIcon />
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}
