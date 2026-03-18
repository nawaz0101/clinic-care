//This layout ensures Navbar+Footer appear on every page
//Layout wrapper for all pages

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({children}){
    return(
        <div>
            <Navbar/>

            <main style={{padding:"20px"}}>
                {children}
            </main>

            <Footer/>
        </div>
    );
}

export default MainLayout;