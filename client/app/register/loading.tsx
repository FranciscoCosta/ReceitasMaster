import React from 'react'

import Image from 'next/image';

const Loading = () => {
  return (
    <div className='Loader'>
        <Image src={'/assets/Loader.gif'} alt='Loading...' width={200} height={200}/>
    </div>
  )
}

export default Loading;