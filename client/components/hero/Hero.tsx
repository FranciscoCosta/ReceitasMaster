"use client"

import React from 'react'
import './Hero.scss'
import bg from '../../public/assets/white_green_spacer.svg'

import { motion } from "framer-motion"
import Image from 'next/image'
const Hero = () => {
  return (
    <div className='Hero'>
      <div className='Hero__container'>
        <div className="Hero__left">
          <motion.h1
            whileInView={{ x: [-100, 0], opacity: [0, 1], }}
            transition={{ duration: 1, delay: 0.5 }}
            className='Hero__title'
          >
            As melhores Receitas
          </motion.h1>
          <motion.p
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 1, delay: 1 }}
            className='Hero__text'
          >
            Bem-vindo ao <span>MasterReceita</span> , onde a arte da culinária se encontra com a facilidade da tecnologia.
            <br />
            Descubra e crie sabores únicos que encantam o paladar, tudo isso ao alcance de suas mãos!
          </motion.p>
          <motion.button
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className='Hero__btn'
          >
            Ver Receitas
          </motion.button>
        </div>
        <div className="Hero__right">
          <motion.div
            whileInView={{ x: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 1, delay: 1 }}
            className='Hero__img-container'>
            <Image src={"/assets/hero-plate.png"} fill className='Hero__img' alt='hero' />


          </motion.div>
        </div>
      </div>
      <div className='spacer ' style={{
        backgroundImage: `url(${bg.src})`
      }} />
    </div >
  )
}

export default Hero