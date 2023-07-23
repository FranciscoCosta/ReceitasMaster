"use client"


import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';


const MyRecipes = () => {

  const currentUser = localStorage.getItem('currentUser') || [];
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();


  useEffect(() => {
    if (currentUser.length === 0) {
      router.push('/login')
    }
  }, [])

  return (
    <div className='MyRecipes'>
      <div className="MyRecipes__container">
        {

        }
      </div>
    </div>
  )
}

export default MyRecipes