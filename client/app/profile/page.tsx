"use client";

import bg from "../../public/assets/green_white_spacer.svg";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import getMe from "../../utils/getMe";
import Image from "next/image";

import "./Profile.scss"

const Profile = () => {
  const currentUserEmail =
    typeof window !== "undefined" ? localStorage.getItem("user") || "" : "";
  const router = useRouter();
  const [user, setuser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newLastName, setNewLastName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newImageFile, setNewImageFile] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    if (currentUserEmail === "") {
      router.push("/login");
    }
    getMyProfile();
  }, []);

  const getMyProfile = async () => {
    const res = await getMe();
    console.log(res);
    setuser(res);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    console.log("submit");
  }

  return (
    <div className="Profile">
      {!isLoading && <div className="Profile__container">
        <div className="Profile__container__left">
            <h2>{user.firstName} {user.lastName}</h2>
          <div className="Profile__container__left__image">
            {
              user.image !== null && user.image !== undefined ? (
                <Image
                  src={user.image}
                  alt="user image"
                  fill
                  className="img-profile-f"
                />
              ) : (
                <Image
                  src='/assets/profile.png'
                  alt="user image"
                  fill
                  objectFit="cover"
                />
              )
            }

          </div>
        </div>
        <div className="Profile__container__right">
          <form action="">
            <label htmlFor="">Primeiro nome</label>
            <input
              type="text"
              name="firstName"
              placeholder="ex: Francisco"
              onChange={(e) => setNewFirstName(e.target.value)}
              required
            />
            <label htmlFor="">Sobrenome</label>
            <input
              type="text"
              name="lastName"
              placeholder="ex: Costa"
              onChange={(e) => setNewLastName(e.target.value)}
              required
            />
            <label htmlFor="">Nova Senha</label>
            <input
              type="password"
              name="lastName"
              placeholder="Minimo 6 caracteres "
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label htmlFor="">Confirmar senha</label>
            <input
              type="password"
              name="lastName"
              placeholder="Minimo 6 caracteres "
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="imagesInputs">
              <label htmlFor="">Carregar imagem</label>
              <input
                required
                type="file"
                name='file'
                onChange={(e) => setNewImageFile(e.target.files[0])}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="button" onClick={() => handleSubmit}>Salvar</button>
          </form>
        </div>
      </div>}
      <div
        className="spacer"
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      />
    </div>
  );
};

export default Profile;
