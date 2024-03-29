import React from 'react'
import Image from 'next/image';
import aboutimg from '@/public/Images/about us.jpg';
import aerplain from '@/public/Images/aeroplain.jpg'


const About = () => {

  const headingStyle: React.CSSProperties = {
    fontFamily: 'cursive',
    color: '#000',
    fontSize: '4rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    textDecoration: 'underline' 
  };

  return (
    <div className='relative h-screen bg-gray-100 ' > 
      <p style={headingStyle}> About Our Traveling App
      </p>
      <div className='w-10/12 flex h-5/6  p-7  mt-4   ml-48 gap-7'>
        <div className='   w-96 h-6/7   ml-16'>
          <Image src={aboutimg} alt='img' />
        </div>
        <div className='relative w-96 h-6/7'>
          <Image src={aerplain} alt='plane' className='object-cover w-full h-full' />
          <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-end p-4 '>
            <p className='font-mono  leading-8  text-slate-700'>
              Welcome to <span className='font-semibold text-indigo-300'>[Tourist]</span>,
              where your journey begins! We are more than just a travel app; we're curators of unforgettable adventures. 
              Our passion lies in crafting travel experiences that transcend the ordinary, leaving you with memories to cherish. Our mission is simple yet powerful – to inspire and empower travelers like you to explore the world with confidence, curiosity, and an unwavering sense of adventure.
               Let [Tourist] be your compass as you navigate the wonders of our planet, one journey at a time.
            </p>
        </div>
        </div>
        </div>
        </div>
  )
}

export default About;