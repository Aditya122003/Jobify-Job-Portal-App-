// import React, { useEffect } from 'react'
// import Navbar from './shared/Navbar'
// import HeroSection from './HeroSection'
// import CategoryCarousel from './CategoryCarousel'
// import LatestJobs from './LatestJobs'
// import Footer from './shared/Footer'
// import useGetAllJobs from '@/hooks/useGetAllJobs'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const Home = () => {
//   useGetAllJobs();
//   const { user } = useSelector(store => store.auth);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (user?.role === 'recruiter') {
//       navigate("/admin/companies");
//     }
//   }, []);
//   return (
//     <div>
//       <Navbar />
//       <HeroSection />
//       <CategoryCarousel />
//       <LatestJobs />
//       <Footer />
//     </div>
//   )
// }

// export default Home


import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // Fetch all jobs using the custom hook
  useGetAllJobs();

  // Get the user from the Redux store
  const { user } = useSelector((store) => store.auth);

  // Initialize the navigate function for redirection
  const navigate = useNavigate();

  // Redirect to the admin page if the user is a recruiter
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [user, navigate]); // Add `user` and `navigate` to the dependency array

  return (
    <div>
      {/* Render the Navbar */}
      <Navbar />

      {/* Render the Hero Section */}
      <HeroSection />

      {/* Render the Category Carousel */}
      <CategoryCarousel />

      {/* Render the Latest Jobs Section */}
      <LatestJobs />

      {/* Render the Footer */}
      <Footer />
    </div>
  );
};

export default Home;
