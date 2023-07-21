"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./Favorites.scss";

import bg from '../../public/assets/green_white_spacer.svg'
import { useRouter } from "next/navigation";
import { AiFillEye } from "react-icons/ai";
import { BsFillHeartbreakFill } from "react-icons/bs";
import { MdReviews } from "react-icons/md";
import { motion } from "framer-motion";

const Favorites = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = () => {
    setIsLoaded(false);
    const recipeFav = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(recipeFav);
    setIsLoaded(true);
  };

  const handleRemoveFavorite = (id: number) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const favs = favorites.filter((recipe: any) => recipe.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favs));
    setFavorites(favs)
  }

  const handleView = (id: number) => {
    router.push('/recipes/' + id)

  }

  const handleReview = (id: number) => {
    router.push(`/recipes/${id}#Add`)
  }

  return (
    <div className="Favorites">
      <div className="Favorites__container">
        <motion.h1
          whileInView={{ opacity: [0, 1] }}
          transition={{duration: 0.8 , delay: 0.5}}
        >Favoritos</motion.h1>
        <motion.div
          className="Favorites__list">
          {isLoaded && (
            favorites.length > 0 ? (
              favorites.map((recipe: any, index) => (
                <motion.div
                  whileInView={{ opacity: [0, 1]}}
                  transition={{ duration: 0.5 , delay: index/2}}
                  className="Favorites__item" key={recipe.id}>
                  <div className="Favorites__item__image">
                    <Image
                      src={recipe.tumbnail}
                      alt={recipe.title}
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className="Favorite__item-right">
                    <div className="Favorites__item__info">
                      <h2>{recipe.title}</h2>
                      <p>{recipe.categories[0]}</p>
                    </div>
                    <div className="Favorites__item-actions">
                      <AiFillEye
                        onClick={() => handleView(recipe.id)}
                        style={{ color: "green" }} />
                      <MdReviews
                        onClick={() => handleReview(recipe.id)}
                        style={{ color: "gray" }} />
                      <BsFillHeartbreakFill
                        onClick={() => handleRemoveFavorite(recipe.id)}
                        style={{ color: "crimson" }} />
                    </div>
                  </div>
                </motion.div>
              ))
            ) :
              <h2>
                Sem favoritos
              </h2>
          )}
        </motion.div>
      </div>
      <div className='spacer' style={{
        backgroundImage: `url(${bg.src})`
      }} />
    </div >
  );
};

export default Favorites;
