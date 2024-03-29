import React from 'react';
import Navbar from '../../components/navbar';
import bgimg from '@/public/Images/mountain-bg.jpeg';
import Image from 'next/image';
import Maincontent from '../../components/maincontent'
// import LandingPage from './components/LandingPage/page'
import Pagetwo from '../../components/about'
import Pagethree from '../../components/review'

const Page = () => {
  return (
    <div>

      {/* <LandingPage/> */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image src={bgimg} alt="background image"
            layout="fill" objectFit="cover" />

        </div>
        <Navbar />

        <Maincontent />
      </div>
      <Pagetwo />
      <Pagethree />
    </div>
  );
};

export default Page; 