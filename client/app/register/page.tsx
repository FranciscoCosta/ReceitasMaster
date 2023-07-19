"use client"

import './Register.scss'
import newRequest from '../../utils/newRequest'
import bg from '../../public/assets/green_white_spacer.svg'

import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Register() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const handleSubmit = async (e: any) => {
        if (!email || !password || !confirmPassword || !firstName || !lastName) {
            setError("Todos os campos tem de ser preenchidos .")
            return;
        }
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(mailformat)) {
            setError("Campo de email mal errado .")
        }
        if (firstName.length < 3) {
            setError("O nome tem de ter mais de 3 caracteres .")
            return;
        }
        if (lastName.length < 3) {
            setError("O sobrenome tem de ter mais de 3 caracteres .")
            return;
        }

        if (password.length < 6) {
            setError("A senha tem de ter mais de 6 caracteres .")
            return;
        }
        if (password !== confirmPassword) {
            setError("As senhas não coincidem .")
            return;
        }

        try {
            const response = await newRequest.post('/auth/signup', {
                email,
                password,
                firstName,
                lastName
            })
            localStorage.setItem("user", JSON.stringify(email));
            localStorage.setItem("accessToken", JSON.stringify(response.data.access_token));
            router.push("/")
            router.refresh();


        } catch (error: any) {
            setError(error.response.data.message);
        }

    }
    return (
        <div className="Register">
            <div className="Register__container">
                <div className="Register__container-left">
                    <h1>Receita<span>Master</span></h1>
                    <p> O sabor da inspiração culinária ao seu alcance!</p>
                </div>
                <div className="Register__container-right">
                    <h1>Cadastrar</h1>
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
                                name="firstName"
                                type="text"
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <label htmlFor="">Nome:</label>
                        </div>
                        <div className='input__group'>
                            <input
                                autoComplete="off"
                                placeholder=' '
                                name="lastName"
                                type="text"
                                required
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <label htmlFor="">Sobrenome:</label>
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
                        <div className='input__group'>
                            <input
                                autoComplete="off"
                                placeholder=' '
                                name="confirmPassword"
                                type="password"
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                            <label htmlFor="">Confirmar Senha:</label>
                        </div>

                    </form>
                    <button className='Register-btn' type='submit' onClick={handleSubmit}> Entrar </button>
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

export default Register