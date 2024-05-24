import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetCategoryList,
  useGetServicesByCategory,
} from "@/api/ServiceCategoryApi";

const wilayaOptions = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Algiers",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arréridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
];

type Props = {
  onExpandedClick: () => void;
  onCategoryChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onWilayaChange: (value: string) => void;
};

const SearchFilter = ({
  onCategoryChange,
  onServiceChange,
  onWilayaChange,
}: Props) => {
  const [categoryValue, setCategoryValue] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [wilayaValue, setWilayaValue] = useState("");

  const { categories, isLoading: categoriesLoading } = useGetCategoryList();
  const selectedCategory = categoryValue;
  const { services: categoryServices, isLoading: servicesLoading } =
    useGetServicesByCategory(selectedCategory);

  const handleCategoryChange = (value: string) => {
    onCategoryChange(value);
    setCategoryValue(value);
    setServiceValue(""); // Reset the service value when category changes
  };

  const handleServiceChange = (value: string) => {
    onServiceChange(value);
    setServiceValue(value);
  };

  const handleWilayaChange = (value: string) => {
    onWilayaChange(value);
    setWilayaValue(value);
  };

  if (categoriesLoading) return <div>Loading categories...</div>;

  if (!categories) {
    console.error("Categories data not available");
    return <div>Error: Categories data not available</div>;
  }

  return (
    <div className="p-4 border rounded-md shadow-md">
      <div className="mt-4 flex flex-col gap-4">
        <div className="text-lg font-semibold">Filtering Options</div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold">Category</div>
          <Select value={categoryValue} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.category_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {categoryValue && categoryServices && categoryServices.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold">Service</div>
            <Select value={serviceValue} onValueChange={handleServiceChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {servicesLoading ? (
                  <SelectItem value="loading">Loading services...</SelectItem>
                ) : (
                  categoryServices.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.service_name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold">Wilaya</div>
          <Select value={wilayaValue} onValueChange={handleWilayaChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a wilaya" />
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
      </div>
    </div>
  );
};

export default SearchFilter;
