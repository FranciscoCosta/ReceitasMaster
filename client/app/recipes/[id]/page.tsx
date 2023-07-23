"use client";

import React, { useEffect, useState } from "react";
import { RecipeInterface } from "../../../types/index";
import Image from "next/image";
import "./RecipeDetails.scss";
import bg from "../../../public/assets/green_white_spacer.svg";

import { Rating } from "react-simple-star-rating";

import moment from 'moment';

import { MdTimer } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { PiForkKnifeLight } from "react-icons/pi";
import { CardReview } from "@/components";

import { useParams } from "next/navigation";

import newRequest from "../../../utils/newRequest";



const RecipeDetails = () => {

  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState([] as any);
  const [isloading, setIsloading] = useState(true);
  const [recipe, setRecipe] = useState(null as RecipeInterface | null);
  const [user, setUser] = useState(null as any);
  const [rating, setRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [reviews, setReviews] = useState([] as any);


  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleNewReview = async () => {
    const authToken = localStorage.getItem("accessToken") || '';
    var authTokenClean = authToken.substring(1, authToken.length - 1);
    const responseMe = await newRequest.get("/users/me", {
      headers: {
        Authorization: `Bearer ${authTokenClean}`,
      },
      });
    const userId = responseMe.data.id;
    const newReview = await newRequest.post(`/reviews/${id}`, {
      rating: rating,
      comment: newComment,
      userId: Number(userId),
      recipeId: Number(id),
      headers: {
        Authorization: `Bearer ${authTokenClean}`,
      }
    })
    getRecipe();
  }

  useEffect(() => {
    getRecipe();
  }, []);

  const currentUserEmail = typeof window !== "undefined" ? localStorage.getItem("user") || '' : '';
  const getRecipe = async () => {
    try {
      const response = await newRequest.get(`/recipes/${id}`);
      setRecipe(response.data);
      const responseReviews = await newRequest.get(`/reviews/${id}`);
      console.log(responseReviews.data);
      setReviews(responseReviews.data);
      const { userId } = response.data
      const responseUser = await newRequest.get(`/users/${userId}`)
      setUser(responseUser.data)
      setIsloading(false)
    } catch (error) {
      console.log(error)
    }
  }

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
                  <p>Publicado em {moment.utc(recipe?.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
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
                {reviews.map((review) => {
                  return (
                    <CardReview comment={review.comment} rating={review.rating} userId={review.userId} recipeId={review.recipeId} createdAt={moment.utc(review?.createdAt).format("YYYY-MM-DD HH:mm:ss")} />

                  );
                }
                )}
              </div>
            </div>
            <div className="RecipeDetails__reviews-add">
              <h2>Adicionar avaliação</h2>
              {currentUserEmail !== '' ? <div className="Reviews__add-container">
                <div className="Reviews__add-container__rating">
                  <Rating size={25} stars={5} onClick={handleRating} initialValue={rating} />
                </div>
                <div className="Reviews__add-container__comment">
                  <textarea placeholder="Deixe seu comentário" onChange={(e) => setNewComment(e.target.value)} />
                </div>
                <div className="Reviews__add-container__submit">
                  <button
                    onClick={handleNewReview}
                  >Enviar</button>
                </div>
              </div>
                :
                <p>Inicie sessão para deixar a sua avaliação.</p>

              }
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
