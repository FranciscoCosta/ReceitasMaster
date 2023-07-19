"use client"

import React, { useState } from 'react'
import './Navbar.scss'

import { CgProfile } from 'react-icons/cg';
import { FaCashRegister } from 'react-icons/fa';
import { BsBookFill } from 'react-icons/bs';
import { MdFavorite } from 'react-icons/md';


import Image from 'next/image'
import Link from 'next/link'

// const currentUser = {
//     firstName: 'John',
//     lastName: 'Doe',
//     image: '',
//     email: 'xico',
// }

const currentUser = {
    firstName: '',
    lastName: '',
    image: '',
    email: '',
}
// const currentUser = [] as any;

const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(false)
    return (
        <nav className='Navbar'>
            <div className='Navbar__container'>
                <div className='Navbar__left'>
                    <div className='Navbar__logo'>
                        <Image src='/assets/logo.png' alt='logo' fill className='logo__image' />
                    </div>
                    <div className='Navbar__title'>
                        <h1><span>Master</span>Receita</h1>
                    </div>
                </div>
                <div className='Navbar__right'>
                    {/* <div className='Navbar__cadastrar'>
                        <Link href={"/"} className='Navbar__link'>Cadastrar</Link >
                    </div> */}
                    <div className='Navbar__user-name'>

                        {currentUser.firstName && (
                            <h1>
                                {currentUser.firstName}
                                {currentUser.lastName}
                            </h1>
                        )
                        }
                        <div className="Navabar__user-img"
                            onClick={() => setActiveMenu(!activeMenu)}
                        >
                            <Image src='/assets/profile.png' key={"user"} alt="user" fill className='user__image' />
                        </div>
                    </div>
                    {
                        (currentUser.email == '') ?
                            (<button>
                                Entrar
                            </button>) :
                            <button>
                                Sair
                            </button>
                    }
                    <div className={`Navbar__menu ${activeMenu ? 'active' : ''}`}>
                        {
                            (currentUser.email == '') ? (
                                <div>
                                    <Link href={"/"} className='Navbar__link'><FaCashRegister />Cadastrar</Link >
                                    <Link href={"/"} className='Navbar__link'><BsBookFill />Ver Receitas</Link >
                                    <Link href={"/"} className='Navbar__link'><MdFavorite />Favoritos</Link >
                                </div>
                            ) : (
                                <div >
                                    <Link href={"/"} className='Navbar__link'><CgProfile />Perfil</Link >

                                    <Link href={"/"} className='Navbar__link'><BsBookFill />Minhas Receitas</Link >

                                    <Link href={"/"} className='Navbar__link'><MdFavorite />Favoritos</Link >

                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;