import React, { useState } from "react";
import { DatePickerWithPresets } from "@/components/DatePickerWithPresets";
import { TimePickerWithPresets } from "@/components/TimePickerWithPresets";
import { useCreateProviderOffer } from "@/api/MyProviderApi";
import { Button } from "@/components/ui/button";

interface ProviderOfferFormProps {
  requestId: number;
  onOfferCreated: () => void;
}

const ProviderOfferForm: React.FC<ProviderOfferFormProps> = ({
  requestId,
  onOfferCreated,
}) => {
  const [selections, setSelections] = useState<
    { date: Date | null; time: Date | null }[]
  >([{ date: null, time: null }]);
  const createProviderOffer = useCreateProviderOffer();

  const handleDateSelect = (date: Date | undefined, index: number) => {
    const updatedSelections = [...selections];
    updatedSelections[index].date = date || null;
    setSelections(updatedSelections);
  };

  const handleTimeSelect = (time: Date | undefined, index: number) => {
    const updatedSelections = [...selections];
    updatedSelections[index].time = time || null;
    setSelections(updatedSelections);
  };

  const handleAddSelection = () => {
    setSelections([...selections, { date: null, time: null }]);
  };

  const handleCreateOffer = async () => {
    const offerDates = selections
      .map(({ date }) => date?.toISOString() || "")
      .filter(Boolean);
    const offerTimes = selections
      .map(({ time }) => time?.toISOString() || "")
      .filter(Boolean);

    if (offerDates.length === 0 || offerTimes.length === 0) {
      // Handle the case where no dates or times are selected
      return;
    }

    try {
      await createProviderOffer.mutateAsync({
        requestId,
        offerDates,
        offerTimes,
      });
      onOfferCreated();
    } catch (error) {
      console.error("Error creating provider offer:", error);
    }
  };

  return (
    <div className="mt-4">
      {selections.map((_, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
          <DatePickerWithPresets
            onSelect={(date) => handleDateSelect(date, index)}
          />
          <TimePickerWithPresets
            onSelect={(time) => handleTimeSelect(time, index)}
          />
          {index === selections.length - 1 && (
            <div className="flex items-center">
              <Button onClick={handleAddSelection}>Add Selection</Button>
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-end">
        <Button onClick={handleCreateOffer}>Create Offer</Button>
      </div>
    </div>
  );
};

export default ProviderOfferForm;
