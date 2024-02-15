"use client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export const ModeToggleSimple = () => {
  const { setTheme } = useTheme();
  return (
    <div className=" w-10 h-10">
      <Button
        variant="outline"
        size="icon"
        className="dark:hidden flex "
        onClick={() => setTheme("dark")}
      >
        <MoonIcon className=" w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="hidden dark:flex bg-[#111827] border-primary"
        onClick={() => setTheme("light")}
      >
        <SunIcon className=" w-5 h-5" />
      </Button>
    </div>
  );
};
