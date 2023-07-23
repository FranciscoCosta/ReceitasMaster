"use client";

import { motion } from "framer-motion";
import newRequest from "@/utils/newRequest";

import React, { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";

import { CardRecipe, CustomFilter, Pagination } from "../index";

import bg from "../../public/assets/white_green_spacer.svg";
import { CustomCardRecipeProps } from "@/types";
import "./Search.scss";

interface AnimatedCardProps {
  y: number;
  opacity: number;
}
function Search() {
  const [recipes, setRecipes] = useState([] as any);
  const [filteredData, setFilteredData] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState("");
  const [animatedCard, setAnimatedCard] = useState<AnimatedCardProps>({
    y: 0,
    opacity: 1,
  });
  const cardsPerPage = 9;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = filteredData.slice(firstCardIndex, lastCardIndex);

  const getRecipes = async () => {
    setIsLoading(true);
    const response = await newRequest.get("/recipes");
    setRecipes(response.data || []);
    setFilteredData(response.data);

    // setRecipes(response.data || [])
    setIsLoading(false);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleClick = (title: string) => {
    setActiveFilter(title);
    setCurrentPage(1);
    setAnimatedCard(([{ y: 100, opacity: 0 }] as unknown) as any);

    setTimeout(() => {
      setAnimatedCard(([{ y: 0, opacity: 1 }] as unknown) as any);

      if (title === "Peixe") {
        setFilteredData(
          recipes.filter((recipe: any) => recipe.categories.includes("Peixe"))
        );
      }
      if (title === "Carne") {
        setFilteredData(
          recipes.filter((recipe: any) => recipe.categories.includes("Carne"))
        );
      }
      if (title === "Vegano") {
        setFilteredData(
          recipes.filter((recipe: any) => recipe.categories.includes("Vegano"))
        );
      }
      if (title === "Sobremesa") {
        setFilteredData(
          recipes.filter((recipe: any) =>
            recipe.categories.includes("Sobremesa")
          )
        );
      }
      if (title === "Sanduíche") {
        setFilteredData(
          recipes.filter((recipe: any) =>
            recipe.categories.includes("Sanduíche")
          )
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
      Object.values(recipe).some(
        (value: any) =>
          typeof value === "string" &&
          value.toLowerCase().includes(lowerCasedText)
      )
    );

    setFilteredData(matchingRecipes);
  };

  const categories = [
    {
      name: "Peixe",
      image: "/assets/fish.png",
      handleClick: () => handleClick("Peixe"),
    },
    {
      name: "Carne",
      image: "/assets/red-meat.png",
      handleClick: () => handleClick("Carne"),
    },
    {
      name: "Vegano",
      image: "/assets/vegans.png",
      handleClick: () => handleClick("Vegano"),
    },
    {
      name: "Sobremesa",
      image: "/assets/Dessert.png",
      handleClick: () => handleClick("Sobremesa"),
    },

    {
      name: "Sanduíche",
      image: "/assets/sandwich.png",
      handleClick: () => handleClick("Sanduíche"),
    },
    {
      name: "Bebida",
      image: "/assets/Drink.png",
      handleClick: () => handleClick("Bebida"),
    },
  ];

  const handleFavorite = (id: number) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const recipeIndex = favorites.findIndex((fav: any) => fav.id === id);

    if (recipeIndex !== -1) {
      favorites.splice(recipeIndex, 1);
    } else {
      const recipeFav = recipes.find((recipe: any) => recipe.id === id);

      if (recipeFav) {
        favorites.push(recipeFav);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div className="Search">
      <div className="Search__container">
        <div className="Search__filters">
          <div className="Search__filters-categories">
            <motion.h3
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
            >
              Categorias
            </motion.h3>
            <div className="Search__filters-categories-list">
              {categories.map((category, index) => (
                <CustomFilter
                  title={category.name}
                  img={category.image}
                  delay={index}
                  isActive
                  handleClick={() => handleClick(category.name)}
                />
              ))}
            </div>
          </div>
          <div className="Search__filters-search">
            <motion.h3
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Busca
            </motion.h3>
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="Search__filters-search-input"
            >
              <input
                type="text"
                placeholder="Procure receitas aqui"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <LuSearch className="search-icon" />
            </motion.div>
          </div>
        </div>
        <div className="Search__recipes">
          <motion.h3
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 1 }}
            className="Search__recipes-title"
          >
            Receitas simples e gostosas
          </motion.h3>
          <motion.p
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 1 }}
            className="Search__recipes-text"
          >
            Transforme sua cozinha em um universo de sabores usando as nossas
            receitas.
          </motion.p>

          {!isLoading && (
            <motion.div
              animate={(animatedCard as unknown) as any}
              transition={{ duration: 0.5, delayChildren: 0.5 }}
              className="Search__recipes-list"
            >
              {currentCards.length > 0 ? (
                currentCards.map(
                  (recipe: CustomCardRecipeProps, index: number) => (
                    <CardRecipe
                      tumbnail={recipe.tumbnail}
                      title={recipe.title}
                      duration={recipe.duration}
                      serves={recipe.serves}
                      category={recipe.categories?.[0]}
                      id={recipe.id}
                      handleFavorite={() => handleFavorite(recipe.id)}
                    />
                  )
                )
              ) : (
                <div className="Search__recipes-list-empty">
                  <p>Não encontramos nenhuma receita com esse filtro.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
        <Pagination
          cardsPerPage={cardsPerPage}
          totalCards={filteredData.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      <div
        className="spacer "
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      />
    </div>
  );
}

export default Search;
