// ServiceRequirementForm.tsx
import { useState } from "react";
import { FormControl, FormLabel, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface ServiceRequirementFormProps {
  serviceName: string;
  onSaveRequirement: (requirementDesc: string) => void;
}

const ServiceRequirementForm = ({
  serviceName,
  onSaveRequirement,
}: ServiceRequirementFormProps) => {
  const [requirementDesc, setRequirementDesc] = useState("");

  const handleSave = () => {
    onSaveRequirement(requirementDesc);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-6 mb-4">
      <h3 className="text-lg font-semibold mb-2">{serviceName}</h3>
      <FormItem className="flex flex-col gap-4 mb-6">
        <FormLabel>Requirement Description</FormLabel>
        <FormControl>
          <textarea
            value={requirementDesc}
            onChange={(e) => setRequirementDesc(e.target.value)}
            placeholder="Enter the requirement description"
            className="h-32 resize-y w-full border rounded-md p-2"
          />
        </FormControl>
      </FormItem>
      <Button onClick={handleSave} className="mt-2">
        Save
      </Button>
    </div>
  );
};

export default ServiceRequirementForm;
