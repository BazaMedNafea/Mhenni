import * as React from "react";

interface TimePickerProps {
  selected?: Date;
  onSelect: (time: Date) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  selected,
  onSelect,
}) => {
  const [hours, setHours] = React.useState<number>(
    selected ? selected.getHours() : 0
  );
  const [minutes, setMinutes] = React.useState<number>(
    selected ? selected.getMinutes() : 0
  );

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = parseInt(e.target.value);
    if (!isNaN(newHours)) {
      setHours(newHours);
      onSelect(new Date(selected ? selected.setHours(newHours) : 0));
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = parseInt(e.target.value);
    if (!isNaN(newMinutes)) {
      setMinutes(newMinutes);
      onSelect(new Date(selected ? selected.setMinutes(newMinutes) : 0));
    }
  };

  return (
    <div className="time-picker">
      <div className="time-input">
        <input
          type="number"
          value={hours}
          min={0}
          max={23}
          onChange={handleHoursChange}
        />
        <span className="time-separator">:</span>
        <input
          type="number"
          value={minutes}
          min={0}
          max={59}
          onChange={handleMinutesChange}
        />
      </div>
      <div className="time-label">
        <span>Hours</span>
        <span>Minutes</span>
      </div>
    </div>
  );
};
