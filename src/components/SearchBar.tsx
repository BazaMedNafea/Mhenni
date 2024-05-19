import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const formSchema = z.object({
  searchQuery: z.string(), // Make searchQuery a required field
  selectedWilaya: z.string(), // Make selectedWilaya a required field
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
  wilayaOptions: string[];
};

const SearchBar = ({
  onSubmit,
  onReset,
  placeHolder,
  searchQuery = "",
  wilayaOptions,
}: Props) => {
  const [selectedWilaya, setSelectedWilaya] = useState<string>("");

  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
      selectedWilaya: "",
    },
  });

  useEffect(() => {
    form.reset({ searchQuery, selectedWilaya: "" });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  const handleSubmit = (formData: SearchForm) => {
    onSubmit(formData);
  };

  const handleWilayaChange = (value: string) => {
    setSelectedWilaya(value);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
        form.formState.errors.searchQuery && "border-red-500"
      } bg-transparent`}
    >
      <Search
        strokeWidth={2.5}
        size={30}
        className='ml-1 text-yellow-300 hidden md:block'
      />
      <Input
        {...form.register("searchQuery")}
        className='border-none shadow-none text-xl focus-visible:ring-0 placeholder:text-white block bg-transparent text-white flex-1'
        placeholder={placeHolder}
      />

      <div className='flex items-center gap-2'>
        <div className='text-sm font-semibold text-white'>Wilaya</div>
        <Select value={selectedWilaya} onValueChange={handleWilayaChange}>
          <SelectTrigger className='w-32'>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent>
            {wilayaOptions.map((wilaya) => (
              <SelectItem key={wilaya} value={wilaya}>
                {wilaya}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleReset}
        type='button'
        variant='outline'
        className='rounded-full'
      >
        Reset
      </Button>
      <Button
        type='submit'
        className='rounded-full bg-yellow-300 text-black hover:bg-[#222831] hover:text-yellow-300'
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
