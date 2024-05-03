import Benefits from "@/components/Benifts/Benifts";
import ContactUs from "@/components/ContactUs";
import OurCategories from "@/components/categories/OurCategires";
import { SelectedPage } from "@/types/selectepage";

export default function HomePage() {
  return (
    <div>
      <Benefits />
      <OurCategories
        setSelectedPage={function (_value: SelectedPage): void {
          // throw new Error('Function not implemented.')
        }}
      />
      <ContactUs
        setSelectedPage={function (_value: SelectedPage): void {
          // throw new Error('Function not implemented.')
        }}
      />
    </div>
  );
}
