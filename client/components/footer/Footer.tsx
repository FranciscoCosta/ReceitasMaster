"use client";

import React from 'react'
import './Footer.scss'


import { FaPhoneAlt, FaPortrait } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsFillGeoAltFill, BsGithub, BsLinkedin } from 'react-icons/bs';
import { motion } from 'framer-motion';

import Link from 'next/link'
const Footer = () => {
  return (
    <footer className='Footer'>
      <motion.div
      whileInView={{ opacity: [0,1] , y: [50,0] }}
      transition={{ duration: 0.8 , delay: 0.2}}
      className='Footer__container'>
        <div className='Footer__container__left'>
          <div className='Footer__title'>
            <h1>Master<span>Receita</span></h1>
          </div>
          <div className='Footer__description'>
            <Link href='/'>Home</Link>
            <Link href='/'>Novas Receitas</Link>
            <Link href='/'>Cadastre-se</Link>
          </div>
        </div>
        <div className='Footer__container__center'>
          <div className='Footer__title'>
            <h1>Contato</h1>
          </div>
          <div className='Footer__description'>
            <div className='Footer__contact'>
              <FaPhoneAlt /> <span>+55(31)99158-3328</span>
            </div>
            <div className='Footer__contact'>
              <MdEmail /> <span>francisco100eg@gmail.com</span>
            </div>
            <div className='Footer__contact'>
              <BsFillGeoAltFill /> <span>Belo Horizonte - MG</span>
            </div>
          </div>
        </div>
        <div className='Footer__container__right'>
          <div className='Footer__title'>
            <h1>Redes Sociais</h1>
          </div>
          <div className='Footer__description-social'>
            <div
              className="social__container"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/francisco-costa-dev/",
                  "_blank"
                )
              }
            >
              <BsLinkedin className="svg-social" />
            </div>
            <div
              className="social__container"
              onClick={() =>
                window.open(
                  "https://github.com/FranciscoCosta/",
                  "_blank"
                )
              }
            >
              <BsGithub className="svg-social" />
            </div>
            <div
              className="social__container"
              onClick={() =>
                window.open(
                  "https://franciscostaportfolio.netlify.app/",
                  "_blank"
                )
              }
            >
              <FaPortrait className="svg-social" />
            </div>
          </div>
        </div>
      </motion.div>
    </footer >
  )
}

export default Footer