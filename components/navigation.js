"use client";
import { Toggle } from "./toggle";
export function Navigation() {
  return (
    <div className=" border-b">
      <nav className=" container mx-auto flex justify-between items-center p-4 ">
        <img
          src="/td.svg"
          alt="logo"
          className="h-10 brightness-0 dark:brightness-100"
        />

        <Toggle />
      </nav>
    </div>
  );
}
