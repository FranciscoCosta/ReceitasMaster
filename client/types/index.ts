import { MouseEventHandler } from "react";

export interface CustomFilterProps {
    title: string;
    isActive: boolean;
    img: string;
    handleClick: MouseEventHandler<HTMLButtonElement>;
    delay: number;
}
