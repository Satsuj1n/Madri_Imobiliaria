import Footer from "components_i/ui/Footer";
import Navbar from "components_i/ui/Navbar";
import PropertySearch from "components_i/ui/PropertySearch";
import React from "react";

const ImoveisAluguel = () => {
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center">
                <PropertySearch />
            </div>
            <Footer />
        </div>
    );
};

export default ImoveisAluguel;
