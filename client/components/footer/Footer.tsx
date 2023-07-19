"use client";

import React from 'react'
import './Footer.scss'


import { FaPhoneAlt, FaPortrait } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsFillGeoAltFill, BsGithub, BsLinkedin } from 'react-icons/bs';

import Link from 'next/link'
const Footer = () => {
  return (
    <footer className='Footer'>
      <div className='Footer__container'>
        <div className='Footer__container__left'>
          <div className='Footer__title'>
            <h1>Receita<span>Master</span></h1>
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
      </div>
    </footer >
  )
}

export default Footer