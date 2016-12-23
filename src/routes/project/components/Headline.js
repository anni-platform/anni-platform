import React from 'react';

const Headline = ({name}) => {
  return(
    <div className='headline'>
      <div>
        <h1>{name}</h1>
        <h3>StudioAKA</h3>
        <p className='date'>November 20, 2016</p>
        <div className='border'></div>
      </div>
    </div>
  )
}

export default Headline;
