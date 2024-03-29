
import React from 'react'
import Image from 'next/image';
import clientone from '@/public/Images/clientne.avif'
import clienttwo from '@/public/Images/clienttw.avif'
import clienthree from '@/public/Images/clientthree.avif'
import clientfour from '@/public/Images/clientfour.avif'


const Review = () => {

    const headingStyle: React.CSSProperties = {
        fontFamily: 'cursive',
        color: '#000', 
        fontSize: '4rem', 
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
        textAlign:'center',
        textDecoration: 'underline'
      };

  return (
    <div className='relative h-screen bg-gray-100'>
         <p style={headingStyle}> Reviews
</p>
<div className='  w-10/12 h-5/6   ml-36   mt-6'>
    <div className='flex flex-row  gap-28 w-11/12 h-5/6'>

<div className='  w-9/12 h-3/6 flex  '>
<div className=' w-48 h-44 rounded-full overflow-hidden'>
  <Image src={clientone} alt='clientimg' className='object-cover w-full h-full rounded-full' />
</div>
<div className='border border-red-700  w-9/12 '>

</div>
</div>
<div className='  w-9/12 h-3/6 '>
<div className=' w-48 h-44 rounded-full overflow-hidden'>
  <Image src={clienttwo} alt='clientimg' className='object-cover w-full h-full rounded-full' />
</div>
</div>
    </div>
    <div className='flex flex-row gap-28 w-11/12 h-5/6 -mt-40'>

<div className='  w-9/12 h-3/6'>
<div className=' w-48 h-44 rounded-full overflow-hidden'>
  <Image src={clienthree} alt='clientimg' className='object-cover w-full h-full rounded-full' />
</div>
</div>
<div className='  w-9/12 h-3/6'>
<div className=' w-48 h-44 rounded-full overflow-hidden'>
  <Image src={clientfour} alt='clientimg' className='object-cover w-full h-full rounded-full' />
</div>
</div>
    </div>
</div>

    </div>
  )
}

export default Review;