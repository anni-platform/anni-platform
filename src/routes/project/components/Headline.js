import React from 'react';
import { TextEditor } from 'components/baseline';


const Headline = ({name, client}) => {
  return (
    <div className='Headline'>
      <div className="content">
        <TextEditor html={`<h1>${name}</h1>`} />
        <TextEditor html={`<h3>${client ? client : 'Client Name'}</h3>`} />
        <TextEditor html={`<p className=\"date\">November 20, 2016</p>`} />
      </div>
    </div>
  )
}

export default Headline;
