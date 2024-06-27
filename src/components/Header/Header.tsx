"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  backTo?: string;
}

const Header: React.FC<HeaderProps> = ({ title, backTo }) => {
  const router = useRouter();

  return (
    <div className="flex items-center py-5">
      {backTo && (
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => {
            router.push(backTo);
          }}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
      )}

      <div className="flex-1 flex justify-center">
        <h1 className="text-center shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Header;
