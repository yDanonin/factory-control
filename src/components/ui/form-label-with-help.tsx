"use client";

import React from "react";
import { HelpCircle } from "lucide-react";
import { FormLabel } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FormLabelWithHelpProps {
  htmlFor?: string;
  label: string;
  helpText?: string;
  optional?: boolean;
  children?: React.ReactNode;
}

export const FormLabelWithHelp: React.FC<FormLabelWithHelpProps> = ({
  htmlFor,
  label,
  helpText,
  optional = false,
  children
}) => {
  return (
    <FormLabel htmlFor={htmlFor} className="flex items-center gap-1.5">
      <span>{label}</span>
      {optional && (
        <span className="text-sm font-normal text-muted-foreground">(Opcional)</span>
      )}
      {helpText && (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-sm">{helpText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {children}
    </FormLabel>
  );
};
