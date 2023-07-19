import React from 'react'
import './Hero.scss'
const Hero = () => {
  return (
    <div className='Hero'>
      <div className='Hero__container'>
        <div className="Hero__left">
         <h1>
          As melhores Receitas
         </h1>
         <p>
         Explore sabores incríveis com as melhores receitas do MasterReceita
         </p>
         <button>
            Ver Receitas
         </button>
        </div>
        <div className="Hero__right"></div>
        </div>
    </div>
  )
}

export default Hero