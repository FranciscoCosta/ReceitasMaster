"use client"

import './Login.scss'

import bg from '../../public/assets/green_white_spacer.svg'

import { useState, useEffect } from 'react';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const handleSubmit = async (e: any) => {
    }
    return (
        <div className="Login">
            <div className="Login__container">
                <div className="Login__container-left">
                    <h1>Receita<span>Master</span></h1>
                    <p> O sabor da inspiração culinária ao seu alcance!</p>
                </div>
                <div className="Login__container-right">
                    <h1>Login:</h1>
                    <form>
                        <div className='input__group'>
                            <input
                                autoComplete='nope'
                                placeholder=' '
                                name="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="">Email:</label>
                        </div>
                        <div className='input__group'>
                            <input
                                autoComplete='nope'
                                placeholder=' '
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="">Senha:</label>
                        </div>

                    </form>
                    <button className='Login-btn' type='submit' onClick={handleSubmit}> Entrar </button>
                    {
                        error && <p className='error'>{error}</p>
                    }
                </div>
            </div>
            <div className='spacer' style={{
                backgroundImage: `url(${bg.src})`
            }} />
        </div>
    )
}

export default Login