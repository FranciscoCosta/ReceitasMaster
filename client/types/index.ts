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
