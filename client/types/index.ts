import { MouseEventHandler } from "react";

export interface CustomFilterProps {
  title: string;
  isActive: boolean;
  img: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  delay: number;
}

export interface CustomCardRecipeProps {
  tumbnail: string;
  title: string;
  duration: number;
  serves: number;
  category: string;
  id: number;
  handleFavorite: () => void;
}

export interface StatisticsProps {
  total_users: number;
  total_recipes: number;
  total_reviews: number;
}

export interface RecipeInterface {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  categories: string[];
  instructions: string[];
  duration: number;
  serves: number;
  tumbnail: string;
  rating: number;
  totalRating: number;
  totalReviews: number;
  userId: number;
  createdAt: Date;
  Reviews: Review[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  userId: number;
  recipeId: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface cardReviewProps  {
  comment: string;
  rating: number;
  userId : number;
  recipeId : number;
  createdAt : Date;
}