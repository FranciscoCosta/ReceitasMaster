"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdTimer } from 'react-icons/md';
import { BsPeopleFill } from 'react-icons/bs';
import { PiForkKnifeLight } from 'react-icons/pi';
import { CustomCardRecipeProps } from '@/types';

import { motion } from 'framer-motion';
import './CardRecipe.scss';

const CardRecipe = ({ tumbnail, title, duration, serves, category, id, handleFavorite }: CustomCardRecipeProps) => {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);


  useEffect(() => {
    const recipeFav = JSON.parse(localStorage.getItem("favorites") || "[]")
    if (recipeFav.find((recipe: any) => recipe.id === id)) {
      setIsFavorited(true);
    }
  }, [])


  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setIsFavorited((prevIsFavorited) => !prevIsFavorited);
    handleFavorite();
  };

  return (
    <motion.div
    whileInView={{ opacity: [0,1] }}
    transition={{ duration: 0.5 , delay: 0.8}}
      className="CardRecipe"
      onClick={() => {
        router.push("/recipes/" + id);
      }}
    >
      <div className="CardRecipe__top">
        <div className="overlay__bg"></div>
        {isFavorited ? (
          <AiFillHeart className="CardRecipe__heart" onClick={handleClick} />
        ) : (
          <AiOutlineHeart className="CardRecipe__heart" onClick={handleClick} />
        )}
        <div className="CardRecipe__img">
          <Image src={tumbnail} alt={title} layout="fill" objectFit="cover" />
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
    </motion.div>
  );
};

export default CardRecipe;
