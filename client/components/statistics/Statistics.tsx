"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './Statistics.scss';
import { FaUsers } from 'react-icons/fa';
import { IoBookSharp } from 'react-icons/io5';
import { MdReviews } from 'react-icons/md';

import { StatisticsProps } from '../../types';
import bg from '../../public/assets/green_white_spacer.svg';
import { delay, motion } from 'framer-motion';

const total_users = 50;
const total_recipes = 100;
const total_reviews = 150;

const useIsInViewport = () => {
  const [isInViewport, setIsInViewport] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    const observer = new IntersectionObserver((entries) => {
      setIsInViewport(entries[0].isIntersecting);
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return [isInViewport, elementRef];
};

const Statistics = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalRecipe, setTotalRecipe] = useState(0);
  const [totalReview, setTotalReview] = useState(0);

  const [isInViewport, statisticsRef] = useIsInViewport();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInViewport) {
      interval = setInterval(() => {
        if (totalUser < total_users) {
          setTotalUser(totalUser + 1);
        }
        if (totalRecipe < total_recipes) {
          setTotalRecipe(totalRecipe + 1);
        }
        if (totalReview < total_reviews) {
          setTotalReview(totalReview + 1);
        }
      }, 20);
    }

    return () => {
      clearInterval(interval);
      if (!isInViewport) {
        setTotalUser(0);
        setTotalRecipe(0);
        setTotalReview(0);
      }
    };
  }, [isInViewport, totalUser, totalRecipe, totalReview]);

  return (
    <div ref={statisticsRef as any} className="Statistics">
      <div className="Statistics__container">
        <div className="Statistics__info">
          <motion.div
            whileInView={{ scale: [0, 1] }}
            transition={{ duration: 0.7 }}
            className="Statistics__logo-container">
            <Image src="/assets/logo.png" alt="Statistics" fill objectFit="contain" />
          </motion.div>
          <motion.h1
            whileInView={{ y: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >A nossa comunidade</motion.h1>
          <motion.p
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 1, delay: 0.5 }}

          >
            Vamos criar memórias saborosas e espalhar o prazer da cozinha, unidos como uma verdadeira família culinária!
          </motion.p>
        </div>
        <div className="Statistics__numbers">
          <div className="Statistics__container">
            <div className="Statistics_info">
              <h1>+{totalUser}</h1>
              <FaUsers />
            </div>
            <p>Utilizadores</p>
          </div>
          <div className="Statistics__container">
            <div className="Statistics_info">
              <h1>+{totalRecipe}</h1>
              <IoBookSharp />
            </div>
            <p>Receitas</p>
          </div>
          <div className="Statistics__container">
            <div className="Statistics_info">
              <h1>+{totalReview}</h1>
              <MdReviews />
            </div>
            <p>Avaliações</p>
          </div>
        </div>
      </div>
      <div
        className="spacer"
        style={{
          backgroundImage: `url(${bg.src})`
        }}
      />
    </div>
  );
};

export default Statistics;
