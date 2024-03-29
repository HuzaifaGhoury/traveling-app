import React from 'react';

const MainContent: React.FC = () => {

  const headingStyle: React.CSSProperties = {
    fontFamily: 'cursive',
    color: '#fff',
    fontSize: '4rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    // textDecoration: 'underline'
  };

  return (

    <div className='h-44 relative  mt-32  ml-56  w-5/12'>

      <p style={headingStyle}>Travel far enough, you meet yourself.</p>

    </div>
)
};

export default MainContent;
