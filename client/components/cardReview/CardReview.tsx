"use client";

import React, { useState, useEffect } from 'react'
import { cardReviewProps } from '@/types';
import { Rating } from 'react-simple-star-rating';
import Image from 'next/image';


import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import './CardReview.scss';

 
const fakeReviewUser = {
    id: 2,
    firstName: "Maria",
    lastName: "Silva",
    image:
        "https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg?w=1380&t=st=1690120465~exp=1690121065~hmac=f921e87181b32d7ca87b245b4cd0b3f5ac035e536ea8d670b8448dc33f8ae4f6",
};

const CardReview = ({
    comment,
    rating,
    userId,
    createdAt
}: cardReviewProps) => {

    // const currentUser = localStorage.getItem('currentUser') || [];
    const currentUser = {};
    currentUser.id = 2;
    const [isloading, setIsloading] = useState(true);
    const [reviewUser, setReviewUser] = useState(null as any);

    useEffect(() => {
        setReviewUser(fakeReviewUser);
        setIsloading(false);
    }, []);

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
                                    <h4>{createdAt.toLocaleDateString()}</h4>
                                </div>
                            </div>
                            { currentUser.id ===  userId && <div className='owner__review'>
                                <AiFillEdit size={20} color="green"/>
                                <AiFillDelete size={20} color='crimson'/>
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