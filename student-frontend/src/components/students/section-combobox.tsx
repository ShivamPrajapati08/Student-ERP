"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SECTIONS } from "@/lib/sections";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SectionCombobox({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
            "w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm font-normal",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
     )}
>
     <span className={value ? "" : "text-muted-foreground"}>
         {value || "Select a section..."}
    </span>
        <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
    </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {SECTIONS.map((section) => (
                <CommandItem
                  key={section}
                  value={section}
                  onSelect={() => {
                    onChange(section);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === section ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {section}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
