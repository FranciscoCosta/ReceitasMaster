"use client";

import React, { useEffect, useState } from "react";
import { RecipeInterface } from "../../../types/index";
import Image from "next/image";
import "./RecipeDetails.scss";
import bg from "../../../public/assets/green_white_spacer.svg";

import { Rating } from "react-simple-star-rating";

import { MdTimer } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { PiForkKnifeLight } from "react-icons/pi";

const fakeDetails: RecipeInterface = {
  id: 1,
  title: "Francesinha",
  description:
    "Francesinha é uma sanduíche originária da cidade do Porto, em Portugal. A francesinha na sua variação sanduíche francesinha especial é constituída mais habitualmente por linguiça, salsicha fresca, fiambre, carnes frias e bife de carne de vaca, coberta com queijo posteriormente derretido. É guarnecida com um molho à base de tomate, cerveja e piri-piri e pode ser servida com batata frita como acompanhamento. A adição de um ovo estrelado no topo da sanduíche é um facto cada vez mais recorrente, sendo que esta prática constitui uma alteração à receita original. Em algumas casas, a francesinha dita normal serve-se sem bife.",
  ingredients: [
    "6 fatias de pão de forma",
    " 2 unidades de filé bovino",
    " 8 fatias de queijo",
    " 2 fatias de presunto",
    "2 unidades de salsicha",
    " 2 unidades de linguiça fresca",
    "2 unidades de ovo frito (opcional)",
    "2 colheres de sopa de azeite de oliva ou óleo de girassol",
    "pimenta do reino",
    " sal",
  ],
  categories: ["Carne"],
  instructions: [
    "Enquanto cozinha o molho, corte as salsichas e linguiças em metades, no sentido horizontal, e depois ao meio, no sentido vertical. Tempere as linguiças e os filés com sal e pimenta e grelhe na chapa ou frite numa frigideira com óleo.",
    "Monte a Francesinha à moda do Porto: Torre ligeiramente as fatias de pão e coloque duas fatias em dois pratos. Disponha sobre elas uma fatia de presunto, o bife, outra fatia de pão, as salsichas e as linguiças.",
    "Tampe com a última fatia de pão e disponha as fatias de queijo, cobrindo a francesinha. Leve a assar no forno preaquecido 200°C até o queijo derreter.",
    "Finalmente sirva a Francesinha à moda do Porto ainda quente, regada com o molho. Se quiser acrescente ainda no topo um ovo frito e acompanhe com batata frita. Diga o que achou desta receita, e bom apetite!",
  ],
  duration: 45,
  serves: 2,
  tumbnail:
    "https://www.pingodoce.pt/wp-content/uploads/2017/09/francesinha.jpg",
  rating: 4,
  totalRating: 4,
  totalReviews: 1,
  userId: 1,
  createdAt: new Date(),
  Reviews: [
    {
      id: 1,
      rating: 4,
      comment: "Muito bom",
      userId: 2,
      createdAt: new Date(),
    },
  ],
};

const fakeUser = {
  id: 1,
  firstName: "João",
  lastName: "Silva",
  image:
    "https://img.freepik.com/free-psd/expressive-man-gesturing_23-2150198916.jpg?w=1380&t=st=1690120433~exp=1690121033~hmac=39db4a5232b300967c30adcf04fe77c57d175e7330cff6cab104045a17ce292d",
};

const fakeReviewUser = {
  id: 2,
  firstName: "Maria",
  lastName: "Silva",
  image:
    "https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg?w=1380&t=st=1690120465~exp=1690121065~hmac=f921e87181b32d7ca87b245b4cd0b3f5ac035e536ea8d670b8448dc33f8ae4f6",
};

const RecipeDetails = () => {
  const [isloading, setIsloading] = useState(true);
  const [recipe, setRecipe] = useState(null as RecipeInterface | null);
  const [user, setUser] = useState(null as any);

  useEffect(() => {
    setRecipe(fakeDetails);
    setUser(fakeUser);
    setIsloading(false);
  }, []);

  return (
    <div className="RecipeDetails">
      {!isloading && (
        <div className="RecipeDetails__container">
          <div className="RecipeDetails__header">
            <div className="RecipeDetails__header__title">
              <h1>{recipe?.title}</h1>
            </div>
            <div className="RecipeDetails__header__info">
              <div className="RecipeDetails__header__info__user">
                <div className="RecipeDetails__user-img">
                  {user?.image ? (
                    <Image
                      src={user?.image as string}
                      alt="user-pic"
                      fill
                      objectFit="cover"
                    />
                  ) : (
                    <Image
                      src="/assets/profile.png"
                      alt="user-pic"
                      fill
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className="RecipeDetails__user-info">
                  <h3>
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p>Publicado em {recipe?.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="separator" />
              <div className="RecipeDetails__header__info-stats">
                <MdTimer />
                <div className="info-stats-title">
                  <h3>Duração</h3>
                  <p>{recipe?.duration} min</p>
                </div>
              </div>
              <div className="separator" />
              <div className="RecipeDetails__header__info-stats">
                <BsPeopleFill />
                <div className="info-stats-title">
                  <h3>Serve: </h3>
                  <p>{recipe?.serves} pessoas</p>
                </div>
              </div>
              <div className="separator" />
              <div className="RecipeDetails__header__info-stats">
                <PiForkKnifeLight />
                <div className="info-stats-title">
                  <h3>Categoria:</h3>
                  <p>{recipe?.categories[0]}</p>
                </div>
              </div>
              <div className="separator" />
            </div>
          </div>
          <div className="RecipeDetails__display">
            <div className="RecipeDetails__display-container-img">
              <Image
                src={recipe?.tumbnail}
                alt={recipe?.title}
                fill
                objectFit="cover"
                className="recipe-img"
              />
            </div>
            <div className="RecipeDetails__display-container-ingridients">
              <h2>Ingredientes</h2>
              <div className="ingridients-container">
                {recipe?.ingredients.map((ingridient, index) => {
                  return (
                    <div className="ingridient-checkbox" key={index}>
                      <input type="checkbox" />
                      <label for={ingridient}>{ingridient}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="RecipeDetails__avaliation">
            {recipe?.rating !== 0 ? (
              <div className="stars-container">
                <Rating
                  size={25}
                  initialValue={recipe?.rating}
                  stars={5}
                  readonly
                />
                <p>
                  ({recipe?.totalReviews}) - {recipe?.rating}{" "}
                  estrelas
                </p>
              </div>
            ) : (
              <p>Este prato ainda não foi avaliado</p>
            )}
          </div>
          <div className="RecipeDetails__description">
            <h2>Descrição</h2>
            <p>{recipe?.description}</p>
          </div>
          <div className="RecipeDetails__instructions">
            <h2>Modo de preparo</h2>
            <div className="Instructions__container">
              {recipe?.instructions.map((instruction, index) => {
                return (
                  <div className="Instruction__item" key={index}>
                    <p>{index + 1} - {instruction}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="RecipeDetails__reviews">
            <div className="RecipeDetails__reviews-container">
              <h2>Avaliações</h2>
              <div className="Reviews__display">
                {recipe?.Reviews.map((review) => {
                  return (
                    <div className="Review__item">
                      <div className="Review__item__user">
                        <div className="Review__user-img">
                          {fakeReviewUser?.image ? (
                            <Image
                              src={fakeReviewUser?.image as string}
                              alt="user-pic"
                              fill
                              objectFit="cover"
                            />
                          ) : (
                            <Image
                              src="/assets/profile.png"
                              alt="user-pic"
                              fill
                              objectFit="cover"
                            />
                          )}
                        </div>
                        <div className="Review__user-info">
                          <h3>
                            {fakeReviewUser?.firstName}{" "}
                            {fakeReviewUser?.lastName}
                          </h3>
                          <p>
                            {review.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="Review__item__rating">
                        <Rating
                          size={25}
                          initialValue={review.rating}
                          stars={5}
                          readonly
                        />
                      </div>
                      <div className="Review__item__comment">
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  );
                }
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="spacer"
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      />
    </div>
  );
};

export default RecipeDetails;
