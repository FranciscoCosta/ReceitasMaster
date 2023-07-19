import React from 'react'
import './Navbar.scss'

import Image from 'next/image'
import Link from 'next/link'

const currentUser = {
    firstName: 'John',
    lastName: 'Doe',
    image: ''
}

const Navbar = () => {
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
                    <div className='Navbar__cadastrar'>
                        <Link href={"/"} className='Navbar__link'>Cadastrar</Link >
                    </div>
                    <div className='Navbar__user-name'>

                        {currentUser.firstName && (
                            <h1>
                                {currentUser.firstName}
                                {currentUser.lastName}
                            </h1>
                        )
                        }
                        <div className="Navabar__user-img">
                            <Image src='/assets/profile.png' key={"user"} alt="user" fill className='user__image' />
                        </div>
                    </div>
                    {
                        (currentUser === undefined) ?
                            (<button>
                                Entrar
                            </button>) :
                            <button>
                                Sair
                            </button>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;