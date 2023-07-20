"use client"
import React from 'react'
import { CustomFilterProps } from '../../types'
import Image from 'next/image'
const CustomFilter = ({ title, handleClick, isActive, img }: CustomFilterProps) => {
    return (
        <button
            type='button'
            className={`custom-btn-filter ${isActive ? 'btn-filter-active' : ''}`}
            onClick={handleClick}
        >
            <div className="Category__container">
                <div className="Category__title">
                    {title}
                </div>
                <div className="Category__icon">
                    <Image src={img} alt={title} fill />
                </div>
            </div>
        </button>
    )
}

export default CustomFilter