
import React from 'react';
import Navbar from './Navbar'; 

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 min-h-screen py-12">
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-5xl font-extrabold text-center text-purple-700 mb-6">
            About Us
          </h1>
          <p className="text-lg text-gray-800 leading-relaxed text-center">
            Welcome to <span className="font-bold text-purple-800">CyberMinds</span>, your trusted partner in
            <span className="decoration-purple-500 decoration-2"><strong> Talent acquisition</strong></span> and career growth.
            At CyberMindsWorks, we specialize in bridging the gap between exceptional talent and dynamic organizations, creating
            opportunities that empower individuals and drive businesses forward.
          </p>
          <div className="my-8 border-t-2 border-dashed border-purple-300"></div>
          <p className="text-lg text-gray-800 leading-relaxed text-center">
            <span className="font-semibold text-purple-700">Our Mission: </span>
            Redefining recruitment by fostering meaningful connections that inspire innovation and growth. We provide
            tailored solutions for job seekers and employers, leveraging advanced technology, strategic insights, and
            personalized support.
          </p>
          <div className="my-8 border-t-2 border-dashed border-purple-300"></div>
          <p className="text-lg text-gray-800 leading-relaxed text-center">
            Together, let’s shape the future of work and unlock limitless potential in the digital era.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
