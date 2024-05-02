/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./MenuHoverButton.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
// import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

const MenuHoverButton: React.FC<any> = ({ name, menuItens, children }) => {
  const router = useRouter();
  // const is2Xl = useMediaQuery({ query: "(min-width: 1536px)" });
  return (
    <div className="my-1 w-full px-5">
      <DropdownMenu>
        <DropdownMenuTrigger className="mr-5" asChild>
          <div className="w-full flex flex-row justify-between items-center text-[#64748b] hover:bg-[#f1f5f9] rounded-lg cursor-pointer">
            <Button variant="ghost" className="gap-3 hover:text-[#64748b] hover:bg-transparent">
              {children} {name}
            </Button>
            <ChevronRight color="#64748b" className="h-4 w-4 mr-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-16" align="start" alignOffset={100} sideOffset={-30}>
          {menuItens.map((item: any) => (
            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(item.route)} key={item.id}>
              {item.item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MenuHoverButton;

{
  /* <Button variant={"ghost"}>
          <HoverCard>
            <HoverCardTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger className="mx-auto">{children}</DropdownMenuTrigger>
                <DropdownMenuContent className="ms-16 border-zinc-800" align="start" alignOffset={-30} sideOffset={-30}>
                  {menuItens.map((item: any) => (
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(item.route)} key={item.key}>
                      {item.item}
                    </DropdownMenuItem>
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
        </Button> */
}
