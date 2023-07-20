"use client"
import React from 'react'
import { CustomFilterProps } from '../../types'
import { motion } from 'framer-motion'
import './CustomFilter.scss'
import Image from 'next/image'
const CustomFilter = ({ title, handleClick, isActive, img , delay}: CustomFilterProps) => {
    return (
        <motion.button
            whileInView={{ opacity: [0,1] }}
            transition={{ duration: 0.5, delay: 0.5 + delay/8 }}
            type='button'
            className={`custom-btn-filter ${isActive ? 'btn-filter-active' : ''}`}
            onClick={handleClick}
        >
            <div className="Category__container">
                <div className="Category__title">
                    <h4>{title}</h4>
                </div>
                <div className="Category__icon-container">
                    <Image src={img} alt={title} fill className='category-icon'/>
                </div>
            </div>
        </motion.button>
    )
}

export default CustomFilter