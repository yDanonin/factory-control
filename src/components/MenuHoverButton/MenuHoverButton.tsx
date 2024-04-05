/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import "./MenuHoverButton.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useMediaQuery } from "react-responsive";

// eslint-disable-next-line react-hooks/rules-of-hooks

const MenuHoverButton: React.FC<any> = ({ name, menuItens, children }) => {
  const is2Xl = useMediaQuery({ query: "(min-width: 1536px)" });

  return (
    <div className="my-1 w-full ml-3">
      {is2Xl ? (
        <Button variant={"ghost"}>
          <DropdownMenu>
            <DropdownMenuTrigger className="mr-5">{children}</DropdownMenuTrigger>
            <DropdownMenuTrigger>{name}</DropdownMenuTrigger>
            <DropdownMenuContent className="ms-16 border-zinc-800" align="start" alignOffset={100} sideOffset={-30}>
              {menuItens.map((item: any) => (
                <Link href={item.route} key={item.id}>
                  <DropdownMenuItem className="cursor-pointer">{item.item}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      ) : (
        <Button variant={"ghost"}>
          <HoverCard>
            <HoverCardTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger className="mx-auto">{children}</DropdownMenuTrigger>
                <DropdownMenuContent className="ms-16 border-zinc-800" align="start" alignOffset={-30} sideOffset={-30}>
                  {menuItens.map((item: any) => (
                    <Link href={item.route} key={item.id}>
                      <DropdownMenuItem className="cursor-pointer">{item.item}</DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </HoverCardTrigger>
            <HoverCardContent
              className="ms-6 border-zinc-800 w-auto h-auto cursor-default"
              align="start"
              alignOffset={100}
              sideOffset={-40}
            >
              {name}
            </HoverCardContent>
          </HoverCard>
        </Button>
      )}
    </div>
  );
};

export default MenuHoverButton;
