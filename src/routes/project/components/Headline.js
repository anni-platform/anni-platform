import React from 'react';

const Headline = ({name}) => {
  return(
    <div className='Headline'>
      <div className="content">
        <h1>{name}</h1>
        <h3>StudioAKA</h3>
        <p className='date'>November 20, 2016</p>
      </div>
    </div>
  )
}

export default Headline;
