import Benefits from "@/components/Benifts/Benifts";
import ContactUs from "@/components/ContactUs";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OurCategories from "@/components/categories/OurCategires";
import ServiceCards from "@/components/mostservices";
import { SelectedPage } from "@/types/selectepage";

export default function HomePage() {
  return (
    <div>
        <Header />
     <Hero/>
      <OurCategories
        setSelectedPage={function (_value: SelectedPage): void {
          // throw new Error('Function not implemented.')
        }}
      />  
      <Benefits />

      <h1 className="text-3xl font-bold text-center my-8">Best Services</h1>
      <ServiceCards /> 
      
      <ContactUs
        setSelectedPage={function (_value: SelectedPage): void {
          // throw new Error('Function not implemented.')
        }}
      />
    </div>
  );
}
