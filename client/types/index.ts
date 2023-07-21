import { MouseEventHandler } from "react";

export interface CustomFilterProps {
  title: string;
  isActive: boolean;
  img: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  delay: number;
}

export interface CustomCardRecipeProps {
  id: number;
  title: string;
  tumbnail: string;
  description: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  duration: number;
  serves: number;
  category: string;
}

export interface StatisticsProps {
  total_users: number;
  total_recipes: number;
  total_reviews: number;
}
