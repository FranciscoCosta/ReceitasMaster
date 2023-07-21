"use client"

import './Search.scss'
import { motion } from 'framer-motion'
import newRequest from '@/utils/newRequest'

import React, { useState, useEffect } from 'react'
import { LuSearch } from 'react-icons/lu';

import { CardRecipe, CustomFilter, Pagination } from '../index';

import bg from '../../public/assets/white_green_spacer.svg'
import { CustomCardRecipeProps } from '@/types'

const fakeRecipes = [
    {
        id: 1,
        tumbnail: "https://img.freepik.com/premium-photo/hamburger-with-lettuce-tomato-cheese-it_741212-1661.jpg?w=360",
        title: "Hamburger",
        duration: 30,
        serves: 1,
        categories: ["Sobremesa"]
    },
    {
        id: 2,
        tumbnail: "https://www.estadao.com.br/resizer/cWrh_vgbzUS-OCi7InP-JNvf6yw=/720x503/filters:format(jpg):quality(80):focal(-5x-5:5x5)/cloudfront-us-east-1.images.arcpublishing.com/estadao/FIVYQFU6J5ND3PYRA6XQHR4NW4.jpg",
        title: "Bolo de chocolate",
        duration: 30,
        serves: 4,
        categories: ["Sanduíche"]
    },
    {
        id: 3,
        tumbnail: "https://cdn.panelinha.com.br/receita/1565893815418-carbonara.jpg",
        title: "Pasta Carbonara",
        duration: 25,
        serves: 2,
        categories: ["Prato Principal", "Massas"]
    },
    {
        id: 4,
        tumbnail: "data:image/jpeg;base64,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",
        title: "Salmon Avocado Sushi",
        duration: 40,
        serves: 2,
        categories: ["Prato Principal", "Sushi"]
    },
    {
        id: 5,
        tumbnail: "https://www.example.com/images/vegetable-stir-fry.jpg",
        title: "Vegetable Stir Fry",
        duration: 20,
        serves: 3,
        categories: ["Prato Principal", "Vegetariano"]
    },
    {
        id: 6,
        tumbnail: "https://www.example.com/images/chicken-curry.jpg",
        title: "Chicken Curry",
        duration: 45,
        serves: 4,
        categories: ["Prato Principal", "Carne"]
    },
    {
        id: 7,
        tumbnail: "https://www.example.com/images/greek-salad.jpg",
        title: "Greek Salad",
        duration: 15,
        serves: 2,
        categories: ["Salada", "Vegetariano"]
    },
    {
        id: 8,
        tumbnail: "https://www.example.com/images/beef-burger.jpg",
        title: "Beef Burger",
        duration: 25,
        serves: 1,
        categories: ["Sanduíche", "Carne"]
    },
    {
        id: 9,
        tumbnail: "https://www.example.com/images/pizza-margherita.jpg",
        title: "Pizza Margherita",
        duration: 35,
        serves: 2,
        categories: ["Prato Principal", "Pizza"]
    },
    {
        id: 10,
        tumbnail: "https://www.example.com/images/fruit-smoothie.jpg",
        title: "Fruit Smoothie",
        duration: 10,
        serves: 2,
        categories: ["Bebida", "Sobremesa"]
    },
    {
        id: 11,
        tumbnail: "https://www.example.com/images/chocolate-chip-cookies.jpg",
        title: "Chocolate Chip Cookies",
        duration: 20,
        serves: 12,
        categories: ["Sobremesa", "Biscoitos"]
    },
    {
        id: 12,
        tumbnail: "https://www.example.com/images/roast-chicken.jpg",
        title: "Roast Chicken",
        duration: 90,
        serves: 6,
        categories: ["Prato Principal", "Carne"]
    },
    {
        id: 13,
        tumbnail: "https://www.example.com/images/guacamole.jpg",
        title: "Guacamole",
        duration: 15,
        serves: 4,
        categories: ["Acompanhamento", "Vegetariano"]
    },
    {
        id: 14,
        tumbnail: "https://www.example.com/images/pancakes.jpg",
        title: "Pancakes",
        duration: 30,
        serves: 3,
        categories: ["Café da Manhã", "Sobremesa"]
    },
    {
        id: 15,
        tumbnail: "https://www.example.com/images/steak-with-asparagus.jpg",
        title: "Steak with Asparagus",
        duration: 35,
        serves: 2,
        categories: ["Prato Principal", "Carne"]
    },
    {
        id: 16,
        tumbnail: "https://www.example.com/images/lemon-garlic-shrimp.jpg",
        title: "Lemon Garlic Shrimp",
        duration: 20,
        serves: 2,
        categories: ["Prato Principal", "Frutos do Mar"]
    },
    {
        id: 17,
        tumbnail: "https://www.example.com/images/vegetable-soup.jpg",
        title: "Vegetable Soup",
        duration: 40,
        serves: 4,
        categories: ["Sopa", "Vegetariano"]
    },
    {
        id: 18,
        tumbnail: "https://www.example.com/images/taco-salad.jpg",
        title: "Taco Salad",
        duration: 20,
        serves: 3,
        categories: ["Salada", "Tex-Mex"]
    },
    {
        id: 19,
        tumbnail: "https://www.example.com/images/fruit-salad.jpg",
        title: "Fruit Salad",
        duration: 15,
        serves: 4,
        categories: ["Salada", "Sobremesa"]
    },
    {
        id: 20,
        tumbnail: "https://www.example.com/images/cheese-and-crackers.jpg",
        title: "Cheese and Crackers",
        duration: 10,
        serves: 2,
        categories: ["Aperitivo", "Lanches"]
    },

    {
        id: 21,
        tumbnail: "https://www.example.com/images/avocado-toast.jpg",
        title: "Avocado Toast",
        duration: 10,
        serves: 1,
        categories: ["Café da Manhã", "Vegetariano"]
    },
    {
        id: 22,
        tumbnail: "https://www.example.com/images/chicken-caesar-salad.jpg",
        title: "Chicken Caesar Salad",
        duration: 25,
        serves: 2,
        categories: ["Salada", "Carne"]
    }
]
interface AnimatedCardProps {
    y: number;
    opacity: number;
}
function Search() {



    const [recipes, setRecipes] = useState([] as any)
    const [filteredData, setFilteredData] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeFilter, setActiveFilter] = useState("");
    const [animatedCard, setAnimatedCard] = useState<AnimatedCardProps>({ y: 0, opacity: 1 });
    const cardsPerPage = 9;
    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards = filteredData.slice(firstCardIndex, lastCardIndex);

    const getRecipes = async () => {
        setIsLoading(true)
        // const response = await newRequest.get("/recipes");
        console.log(fakeRecipes)
        setRecipes(fakeRecipes)
        setFilteredData(fakeRecipes)

        // setRecipes(response.data || [])
        setIsLoading(false)

    }

    useEffect(() => {
        getRecipes()
    }, [])


    const handleClick = (title: string) => {
        setActiveFilter(title);
        setCurrentPage(1);
        setAnimatedCard([{ y: 100, opacity: 0 }] as unknown as any);

        setTimeout(() => {
            setAnimatedCard([{ y: 0, opacity: 1 }] as unknown as any);

            if (title === "Peixe") {
                setFilteredData(recipes.filter((recipe: any) => recipe.categories.includes("Peixe")));
            }
            if (title === "Carne") {
                setFilteredData(recipes.filter((recipe: any) => recipe.categories.includes("Carne")));
            }
            if (title === "Vegano") {
                setFilteredData(
                    recipes.filter((recipe: any) => recipe.categories.includes("Vegano"))
                );
            }
            if (title === "Sobremesa") {
                setFilteredData(
                    recipes.filter((recipe: any) => recipe.categories.includes("Sobremesa"))
                );
            }
            if (title === "Sanduíche") {
                setFilteredData(
                    recipes.filter((recipe: any) => recipe.categories.includes("Sanduíche"))
                );
            }
            if (title === "Bebida") {
                setFilteredData(
                    recipes.filter((recipe: any) => recipe.categories.includes("Bebida"))
                );
            }
            if (title === "") {
                setFilteredData(recipes);
            }
        }, 500);
    };

    const handleSearch = (text: string) => {
        const lowerCasedText = text.toLowerCase();

        const matchingRecipes = recipes.filter((recipe: any) =>
            Object.values(recipe).some((value: any) =>
                typeof value === 'string' && value.toLowerCase().includes(lowerCasedText)
            )
        );

        setFilteredData(matchingRecipes);
    };

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
                                <CustomFilter title={category.name} img={category.image} delay={index} isActive handleClick={() => handleClick(category.name)} />
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
                            <input type="text" placeholder="Procure receitas aqui" onChange={(e) => handleSearch(e.target.value)} />
                            <LuSearch className='search-icon' />
                        </motion.div>
                    </div>
                </div>
                <div className="Search__recipes">
                    <motion.h3
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className='Search__recipes-title'
                    >Receitas simples e gostosas</motion.h3>
                    <motion.p
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className='Search__recipes-text'
                    >Transforme sua cozinha em um universo de sabores usando as nossas receitas.</motion.p>

                    {!isLoading && <motion.div

                        animate={animatedCard as unknown as any}
                        transition={{ duration: 0.5, delayChildren: 0.5 }}
                        className="Search__recipes-list">
                        {currentCards.length > 0 ? (
                            currentCards.map((recipe: CustomCardRecipeProps, index: number) => (
                                <CardRecipe tumbnail={recipe.tumbnail} title={recipe.title} duration={recipe.duration} serves={recipe.serves} category={recipe.categories[0]} />
                            )))
                            :
                            <div className="Search__recipes-list-empty">
                                <p>Não encontramos nenhuma receita com esse filtro.</p>
                            </div>

                        }
                    </motion.div >}
                </div>
                <Pagination
                    cardsPerPage={cardsPerPage}
                    totalCards={filteredData.length}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            <div className='spacer ' style={{
                backgroundImage: `url(${bg.src})`
            }} />
        </div>
    )
}

export default Search;