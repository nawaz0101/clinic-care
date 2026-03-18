//Home page composed of multiple UI sections

import Hero from "../components/Home/Hero";
import ServicesPreview from "../components/Home/ServicesPreview";
import DoctorsPreview from "../components/Home/DoctorsPreview";
import AppointmentCTA from "../components/Home/AppointmentCTA";

function Home(){
    return(
        <div>
            {/* Hero Section*/}
            <Hero/>

            {/* Services Section*/}
            <ServicesPreview/>

            {/* Doctors Section*/}
            <DoctorsPreview/>

            {/* Appointment CTA - Call to action*/}
            <AppointmentCTA/>

        </div>
    );
}

export default Home;