"use client"

import React, { useState, useEffect } from 'react'
import './Navbar.scss'
import { motion } from "framer-motion"
import { CgProfile } from 'react-icons/cg';
import { FaCashRegister } from 'react-icons/fa';
import { BsBookFill } from 'react-icons/bs';
import { MdFavorite } from 'react-icons/md';

import newRequest from '../../utils/newRequest';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'




const Navbar = () => {
    const [currentUser, setCurrentUser] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const currentUserEmail = typeof window !== "undefined" ? localStorage.getItem("user") || '' : '';

    useEffect(() => {
        if (currentUserEmail) {
            getUser();
        }
        setIsLoading(false);
    }, [currentUserEmail])




    const getUser = async () => {
        try {
            setIsLoading(true);
            const authToken = localStorage.getItem("accessToken") || '';
            var authTokenClean = authToken.substring(1, authToken.length - 1)
            const response = await newRequest.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${authTokenClean}`,
                },
            });
            setCurrentUser(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setIsLoading(false);

        } catch (error: any) {
            console.log(error);
        }
    };

    const [activeMenu, setActiveMenu] = useState(false)
    const router = useRouter();
    return (
        <nav className='Navbar'>
            <div className='Navbar__container'>
                <div className='Navbar__left'
                    onClick={() => {
                        router.push("/")
                        router.refresh()
                    }
                    }
                >
                    <div className='Navbar__logo'>
                        <Image src='/assets/logo.png' alt='logo' fill className='logo__image' />
                    </div>
                    <div className='Navbar__title'>
                        <h1><span>Master</span>Receita</h1>
                    </div>
                </div>
                {!isLoading && <div className='Navbar__right'>
                    <div className='Navbar__user-name'>

                        {firstName && (
                            <h1>
                                {firstName} {lastName}
                            </h1>
                        )}
                        <div className="Navabar__user-img"
                            onClick={() => setActiveMenu(!activeMenu)}
                        >
                            {currentUser.img !== '' ? (
                                <Image
                                    src={currentUser.img}
                                    key="user"
                                    alt="user"
                                    fill
                                    className='user__image'
                                />
                            ) : (
                                <Image
                                    src='/assets/profile.png'
                                    key="user"
                                    alt="user"
                                    fill
                                    className='user__image'
                                />
                            )}
                        </div>
                    </div>
                    {
                        (currentUserEmail == '') ?
                            (<button
                                onClick={() => {
                                    router.push("/login")
                                    router.refresh()
                                }}
                            >
                                Entrar
                            </button>) :
                            <button
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    localStorage.removeItem("accessToken");
                                    router.push("/login");
                                    router.refresh();
                                }
                                }
                            >
                                Sair
                            </button>
                    }
                    <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}

                        className={`Navbar__menu ${activeMenu ? 'active' : ''}`}>
                        {
                            (currentUserEmail == '') ? (
                                <div>
                                    <Link href={"/register"} className='Navbar__link'><FaCashRegister /></Link >
                                    <Link href={"/"} className='Navbar__link'><BsBookFill /></Link >
                                    <Link href={"/"} className='Navbar__link'><MdFavorite /></Link >
                                </div>
                            ) : (
                                <div >
                                    <Link href={"/"} className='Navbar__link'><CgProfile />Perfil</Link >

                                    <Link href={"/"} className='Navbar__link'><BsBookFill />Minhas Receitas</Link >

                                    <Link href={"/"} className='Navbar__link'><MdFavorite />Favoritos</Link >

                                </div>
                            )
                        }
                    </motion.div>
                </div>}
            </div>
        </nav >
    )
}

export default Navbar;