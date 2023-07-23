"use client";

import React, { useState, useEffect } from 'react'
import { cardReviewProps } from '@/types';
import { Rating } from 'react-simple-star-rating';
import Image from 'next/image';


import { AiFillDelete } from 'react-icons/ai';

import './CardReview.scss';
import newRequest from '../../utils/newRequest';
import getMe from '../../utils/getMe';



const CardReview = ({
    comment,
    rating,
    userId,
    createdAt,
    reviewId,
    getRecipe,
}: cardReviewProps) => {


    const [isloading, setIsloading] = useState(true);
    const [reviewUser, setReviewUser] = useState(null as any);
    const [currentUser, setCurrentUser] = useState<any>({});
    useEffect(() => {
        getReviewUser();
    }, []);

    const handleDelete = async () => {
        const authToken = localStorage.getItem("accessToken") || '';
        var authTokenClean = authToken.substring(1, authToken.length - 1);
        const response = await newRequest.delete(`/reviews/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${authTokenClean}`,
            }
        });
        getRecipe();
    }
    const getReviewUser = async () => {
        try {
            const currentUser = await getMe();
            setCurrentUser(currentUser);
            const response = await newRequest.get(`/users/${userId}`);
            setReviewUser(response.data);
            setIsloading(false);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='CardReview'>
            {!isloading && (
                <div className='CardReview__container'>
                    <div className='CardReview__header'>
                        <div className='CardReview__header__info'>
                            <div className='CardReview__header__info__user'>
                                <div className='CardReview__user-img'>
                                    {reviewUser?.image ? (
                                        <Image
                                            src={reviewUser?.image as string}
                                            alt='user-pic'
                                            fill
                                            objectFit='cover'
                                        />
                                    ) : (
                                        <Image
                                            src='/assets/profile.png'
                                            alt='user-pic'
                                            fill
                                            objectFit='cover'
                                        />
                                    )}
                                </div>
                                <div className='CardReview__header__info__user__name'>
                                    <h3>{reviewUser?.firstName} {reviewUser?.lastName}</h3>
                                    <h4>{createdAt}</h4>
                                </div>
                            </div>
                            {currentUser.id === userId && <div className='owner__review'>
                                <AiFillDelete size={20} color='crimson' onClick={() => handleDelete()} />
                            </div>}
                        </div>
                        <div className='CardReview__header__rating'>
                            <Rating initialValue={rating} size={25} readonly />
                        </div>
                    </div>
                    <div className='CardReview__body'>
                        <div className='CardReview__body__comment'>
                            <p>{comment}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CardReview;