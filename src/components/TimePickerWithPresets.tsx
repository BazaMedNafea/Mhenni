import * as React from "react";
import { ClockIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TimePicker } from "@/components/ui/timePicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TimePickerWithPresets({
  onSelect,
}: {
  onSelect: (time: Date | undefined) => void;
}) {
  const [time, setTime] = React.useState<Date>();

  const handleSelect = (selectedTime: Date | undefined) => {
    setTime(selectedTime);
    onSelect(selectedTime);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal", // Increase width here
            !time && "text-muted-foreground"
          )}
        >
          <ClockIcon className="mr-2 h-4 w-4" />
          {time ? format(time, "p") : <span>Pick a time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-[240px] flex-col space-y-2 p-2" // Increase width here
      >
        <div className="rounded-md border">
          <TimePicker selected={time} onSelect={handleSelect} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
