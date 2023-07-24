import React from 'react'

import Image from 'next/image';

const Loading = () => {
  return (
    <div className='Loader'>
        <Image src={'/assets/Loader.gif'} alt='Loading...' fill objectFit='contain'/>
    </div>
  )
}

export default Loading;