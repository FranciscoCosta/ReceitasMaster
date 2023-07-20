"use client"

import React, { useState, useEffect } from 'react'
import './Search.scss'
import { motion } from 'framer-motion'
import newRequest from '@/utils/newRequest'

import { LuSearch } from 'react-icons/lu';

import { CustomFilter } from '../index';
import bg from '../../public/assets/white_green_spacer.svg'
function Search() {

    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getRecipes = async () => {
        setIsLoading(true)
        const response = await newRequest.get("/recipes", {});
        setRecipes(response.data || [])
        setIsLoading(false)

    }

    useEffect(() => {
        getRecipes()
    }, [])


    const handleClick = (title: string) => {
        console.log(title)
    }

    const categories = [
        {
            name: "Peixe",
            image: "/assets/fish.png",
            handleClick: () => handleClick("Peixe")
        },
        {
            name: "Carne",
            image: "/assets/red-meat.png",
            handleClick: () => handleClick("Carne")
        },
        {
            name: "Vegano",
            image: "/assets/vegans.png",
            handleClick: () => handleClick("Vegano")
        },
        {
            name: "Sobremesa",
            image: "/assets/Dessert.png",
            handleClick: () => handleClick("Sobremesa")
        },

        {
            name: "Sanduíche",
            image: "/assets/sandwich.png",
            handleClick: () => handleClick("Sanduíche")
        },
        {
            name: "Bebida",
            image: "/assets/Drink.png",
            handleClick: () => handleClick("Bebida")
        }
    ];

    return (
        <div className='Search'>
            <div className='Search__container'>
                <div className="Search__filters">
                    <div className="Search__filters-categories">
                        <motion.h3
                            whileInView={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5 }}
                        >Categorias</motion.h3>
                        <div className="Search__filters-categories-list">
                            {categories.map((category, index) => (
                                <CustomFilter title={category.name} img={category.image} delay={index} isActive handleClick={handleClick as any} />
                            ))}
                        </div>
                    </div>
                    <div className="Search__filters-search">
                        <motion.h3
                            whileInView={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >Busca</motion.h3>
                        <motion.div
                            whileInView={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                            className="Search__filters-search-input">
                            <input type="text" placeholder="Procure receitas aqui" />
                            <LuSearch className='search-icon' />
                        </motion.div>
                    </div>
                </div>
                <div className="Search__recipes">
                    <motion.h3
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >Receitas</motion.h3>
                    {!isLoading && <div className="Search__recipes-list">
                        {
                            recipes.map((recipe, index) => (
                                <h1>A</h1>
                            ))

                        }
                    </div>}
                </div>
            </div>
            <div className='spacer ' style={{
                backgroundImage: `url(${bg.src})`
            }} />
        </div>
    )
}

export default Search