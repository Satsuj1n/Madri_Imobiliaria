import React from 'react';
import Navbar from '../../components_i/ui/Navbar'; // Adjust the path based on your structure


const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero bg-gray-100 py-16">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-black mb-4">
            Buy, rent, or sell your property easily
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A great platform to buy, sell, or even rent your properties without any commissions.
          </p>
          <div className="flex space-x-8">
            <div className="bg-purple-100 p-8 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold text-purple-500">50k+</h2>
              <p className="text-sm text-gray-500">Renters</p>
            </div>
            <div className="bg-purple-100 p-8 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold text-purple-500">10k+</h2>
              <p className="text-sm text-gray-500">Properties</p>
            </div>
          </div>
        </div>
      </section>

      {/* Add more sections as needed */}
      <section className="additional-section bg-white py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Why Choose Us?</h2>
          <p className="text-lg text-gray-600">
            We make it easy for landlords to find tenants and for renters to find the perfect property.
          </p>
          {/* Additional content can be added here */}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
