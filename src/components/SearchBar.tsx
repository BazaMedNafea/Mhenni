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
  searchQuery: z.string().nonempty("Search query is required"),
  selectedWilaya: z.string().optional(),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
  wilayaOptions: string[];
  className?: string;
  wilayaSelectClassName?: string;
};

const SearchBar = ({
  onSubmit,
  onReset,
  placeHolder,
  searchQuery = "",
  wilayaOptions,
  className,
  wilayaSelectClassName,
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
      selectedWilaya: "",
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
    form.setValue("selectedWilaya", value);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 bg-white/70 ${
        form.formState.errors.searchQuery && "border-red-500"
      }`}
    >
      <Search
        strokeWidth={2.5}
        size={30}
        className={`ml-1 hidden md:block text-black ${className}`}
      />
      <Input
        {...form.register("searchQuery")}
        className={`border-none shadow-none text-xl focus-visible:ring-0 placeholder:text-gray-500 text-black bg-transparent flex-1 ${className} ${
          window.innerWidth < 768 ? "w-full" : "w-96"
        }`} // Adjusted width based on screen size
        placeholder={placeHolder}
      />

      <div className='flex items-center gap-2'>
        <Select value={selectedWilaya} onValueChange={handleWilayaChange}>
          <SelectTrigger
            className={`px-3 py-2 text-xl bg-transparent border-none text-black ${wilayaSelectClassName}`}
          >
            <SelectValue
              className='text-xl text-black'
              placeholder='Select wilaya'
            />
          </SelectTrigger>
          <SelectContent>
            {wilayaOptions.map((wilaya) => (
              <SelectItem key={wilaya} value={wilaya} className='text-black'>
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
        className='rounded-full border-none text-black hover:bg-white/50'
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
