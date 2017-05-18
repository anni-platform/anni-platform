import React from 'react';

const Headline = ({name, client}) => {
  return(
    <div className='Headline'>
      <div className='background' />
      <div className="content">
        <h1>{name}</h1>
        <h3>{client ? client : 'Client Name'}</h3>

        <p className='date'>November 20, 2016</p>
      </div>
    </div>
  )
}

export default Headline;
