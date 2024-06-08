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
  const [isLoading, setIsLoading] = useState(false);
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

  const handleDeleteSelection = (index: number) => {
    setSelections(selections.filter((_, i) => i !== index));
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

    setIsLoading(true);

    try {
      await createProviderOffer.mutateAsync({
        requestId,
        offerDates,
        offerTimes,
      });
      onOfferCreated();
    } catch (error) {
      console.error("Error creating provider offer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mt-4'>
      {selections.map((_, index) => (
        <div key={index} className='flex flex-col md:flex-row gap-4 mb-4'>
          <DatePickerWithPresets
            onSelect={(date) => handleDateSelect(date, index)}
          />
          <TimePickerWithPresets
            onSelect={(time) => handleTimeSelect(time, index)}
          />
          <div className='flex items-center'>
            <Button onClick={handleAddSelection}>Add Selection</Button>
            {index !== 0 && (
              <Button
                onClick={() => handleDeleteSelection(index)}
                className='ml-2'
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      ))}
      <div className='flex justify-end'>
        <Button onClick={handleCreateOffer} disabled={isLoading}>
          {isLoading ? (
            <svg
              className='animate-spin h-5 w-5 mr-3 text-white'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          ) : (
            "Create Offer"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProviderOfferForm;
