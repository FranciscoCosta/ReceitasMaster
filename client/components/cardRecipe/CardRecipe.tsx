import React from 'react'
import { motion } from 'framer-motion'
import './CardRecipe.scss'
import Image from 'next/image';
import { useRouter } from 'next/navigation'

MdTimer
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdTimer } from 'react-icons/md';
import { BsPeopleFill } from 'react-icons/bs';
import { PiForkKnifeLight } from 'react-icons/pi';
import { CustomCardRecipeProps } from '@/types';


const CardRecipe = ({ tumbnail, title, duration, serves, category, id }: CustomCardRecipeProps) => {
  const router = useRouter();

  return (
    <div className='CardRecipe'
      onClick={() => {
        router.push("/recipes/" + id)
        router.refresh()
      }}

    >
      <div className="CardRecipe__top">
        <div className='overlay__bg'> </div>
        <AiOutlineHeart className='CardRecipe__heart' />
        <div className='CardRecipe__img'>
          <Image src={tumbnail} alt={title} layout='fill' objectFit='cover' />
        </div>
      </div>
      <div className="CardRecipe__bottom">
        <div className="CardRecipe__title">
          <h3>{title}</h3>

        </div>
        <div className="CardRecipe__info">
          <div className="CardRecipe__info--duration">
            <MdTimer />
            <p>{duration} min</p>
          </div>
          <div className="CardRecipe__info--serves">
            <BsPeopleFill />
            <p>{serves} pessoas</p>
          </div>
          <div className="CardRecipe__info--category">
            <PiForkKnifeLight />
            <p>{category}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardRecipe