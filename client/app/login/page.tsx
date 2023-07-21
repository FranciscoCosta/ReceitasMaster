"use client"

import './Login.scss'
import newRequest from '../../utils/newRequest'
import bg from '../../public/assets/green_white_spacer.svg'

import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter(); 
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await newRequest.post("/auth/signin", {
                email,
                password
            });
            localStorage.setItem("user", JSON.stringify(email));
            localStorage.setItem("accessToken", JSON.stringify(response.data.access_token));
            router.push("/")

        } catch (error: any) {
            setError(error.response.data.message);
        }
    }
    return (
        <div className="Login">
            <div className="Login__container">
                <div className="Login__container-left">
                    <h1>Receita<span>Master</span></h1>
                    <p> O sabor da inspiração culinária ao seu alcance!</p>
                </div>
                <div className="Login__container-right">
                    <h1>Entrar</h1>
                    <form>
                        <div className='input__group'>
                            <input
                                autoComplete="off"
                                placeholder=' '
                                name="email"
                                type="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="">Email:</label>
                        </div>
                        <div className='input__group'>
                            <input
                                autoComplete="off"
                                placeholder=' '
                                name="password"
                                type="password"
                                required
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