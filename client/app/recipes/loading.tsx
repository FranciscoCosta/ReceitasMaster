import React from 'react'

import Image from 'next/image';

const Loading = () => {
  return (
    <div className='Loader'>
        <Image src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHlxbDZlbXcyaDZxanp4aXI2ZTBqbTFvYmE4OHk0enl1Ym1ybGJ0cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu8sRnYpTOG1p8k/giphy.gif" alt='Loading...' fill objectFit='contain'/>
    </div>
  )
}

export default Loading;