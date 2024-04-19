import React from 'react';

interface params {
  children: React.ReactNode
}

const SimpleWithChildren = (values: params): React.ReactNode => {
  return (<div> {values.children} </div>)
}


export default SimpleWithChildren;