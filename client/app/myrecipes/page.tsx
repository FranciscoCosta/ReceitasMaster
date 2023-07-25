"use client"


import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import getMe from '../../utils/getMe';
import newRequest from '../../utils/newRequest';
import './MyRecipes.scss';
import bg from '../../public/assets/green_white_spacer.svg'
import Image from 'next/image';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const MyRecipes = () => {

  const currentUserEmail = typeof window !== "undefined" ? localStorage.getItem("user") || '' : '';
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState<boolean>(false);
  const [isEditRecipeModalOpen, setIsEditRecipeModalOpen] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [addIngridients, setaddIngridients] = useState([]);
  const [addInstructions, setaddInstructions] = useState([]);
  const [Ingridient, setIngridient] = useState('');
  const [Instruction, setInstruction] = useState('');
  const [file, setFile] = useState(null);
  const [imgUrl, setimgUrl] = useState('');
  const [title, settitle] = useState('');
  const [category, setcategory] = useState('');
  const [description, setdescription] = useState('');
  const [duration, setduration] = useState('');
  const [serves, setserves] = useState('');
  const [recipeEditId, setRecipeEditId] = useState(0);

  useEffect(() => {
    if (currentUserEmail === '') {
      router.push('/login')
    }
    getMyRecipes();
  }, [])

  const getMyRecipes = async () => {
    try {
      const authToken = localStorage.getItem("accessToken") || '';
      var authTokenClean = authToken.substring(1, authToken.length - 1);
      const response = await newRequest.get(`/recipes/my-recipes`, {
        headers: {
          Authorization: `Bearer ${authTokenClean}`,
        },
      });
      setRecipes(response.data)
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const authToken = localStorage.getItem("accessToken") || '';
      var authTokenClean = authToken.substring(1, authToken.length - 1);
      await newRequest.delete(`/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${authTokenClean}`,
        },
      });
      getMyRecipes();
    } catch (error: any) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    const authToken = localStorage.getItem("accessToken") || '';
    var authTokenClean = authToken.substring(1, authToken.length - 1);
    const user = await getMe();
    const userId = user.id;
    try {
      const response = await newRequest.post(`/recipes`, {
        duration: Number(duration),
        serves: Number(serves),
        title,
        description,
        ingredients: addIngridients,
        instructions: addInstructions,
        categories: [category],
        tumbnail: imgUrl,
        userId: Number(userId),
      }, {
        headers: {
          Authorization: `Bearer ${authTokenClean}`,
        },
      });
      setIsAddRecipeModalOpen(false);
      router.push('/');
    } catch (error: any) {
      console.log(error);
    }
  }

  const handleEditModal = async (id: number) => {
    setRecipeEditId(id);
    setIsEditRecipeModalOpen(true);
  }

  const handleEdit = async () => {
    const authToken = localStorage.getItem("accessToken") || '';
    var authTokenClean = authToken.substring(1, authToken.length - 1);
    const user = await getMe();
    const updatedRecipe = {};
    if (title) updatedRecipe.title = title;
    if (description) updatedRecipe.description = description;
    if (duration) updatedRecipe.duration = Number(duration);
    if (serves) updatedRecipe.serves = Number(serves);
    if (category) updatedRecipe.categories = [category];
    if (imgUrl) updatedRecipe.tumbnail = imgUrl;
    if (addIngridients.length > 0) updatedRecipe.ingredients = addIngridients;
    if (addInstructions.length > 0) updatedRecipe.instructions = addInstructions;

    try {
      const response = await newRequest.patch(`/recipes/${recipeEditId}`, updatedRecipe, {
        headers: {
          Authorization: `Bearer ${authTokenClean}`,
        },
      });

      setIsEditRecipeModalOpen(false);
      router.push('/');
    } catch (error: any) {
      console.log(error);
    }
  }

  const handleAddIngridient = () => {
    setaddIngridients([...addIngridients, Ingridient]);
  }

  const handleAddInstruction = () => {
    setaddInstructions([...addInstructions, Instruction]);
  }

  const handleUpload = async () => {
    console.log(file);
    setUploading(true);

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'my-uploads');

    const data = await fetch('https://api.cloudinary.com/v1_1/dmlumezz6/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    const imgUrlCloud = data.secure_url;
    setimgUrl(imgUrlCloud);
    setUploading(false);


  }
  return (
    <div className='MyRecipes'>
      <div className="MyRecipes__container">
        <div className="MyRecipes__header">
          <h1>Minhas receitas</h1>
          <div className='MyRecips__add'>
            <button onClick={() => setIsAddRecipeModalOpen(true)}>
              Adicionar nova receita
            </button>
          </div>
        </div>

        <div className="Myrecipes__body">
          <table className="MyRecipes__body__container">

            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Tempo de preparo</th>
              <th>Serve</th>
              <th>Opções</th>
            </tr>
            <tbody>
              {isLoading ? <p>Carregando...</p> :
                recipes.map((recipe: any) => {
                  return (

                    <tr>
                      <td>
                        <Image
                          src={recipe.tumbnail}
                          alt={recipe.title}
                          width={200}
                          height={100}
                          objectFit='cover'
                        />
                      </td>
                      <td>{recipe.title}</td>
                      <td>{recipe.duration}</td>
                      <td>{recipe.serves}</td>
                      <td className="MyRecipes__actions">
                        <AiFillEdit color='green' size={25} onClick={() => handleEditModal(recipe.id)} />
                        <AiFillDelete color='crimson' size={25} onClick={() => handleDelete(recipe.id)} />
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
      <dialog open={isAddRecipeModalOpen} className='MyRecipes__modal'>
        <div className="MyRecipes__modal__container">
          <h1>Adicionar nova receita</h1>
          <form>
            <div className="sections">
              <div className="info">
                <label htmlFor="">Título</label>
                <input
                  type="text"
                  name="title"
                  placeholder="ex: Massa carbonara"
                  onChange={(e) => settitle(e.target.value)}
                  required
                />
                <label htmlFor="">Categoria</label>
                <select name="category" id="category" onChange={(e) => setcategory(e.target.value)} required>
                  <option value="Peixe">Peixe</option>
                  <option value="Carne">Carne</option>
                  <option value="Vegano">Vegano</option>
                  <option value="Sobremesa">Sobremesa</option>
                  <option value="Sanduíche">Sanduíche</option>
                  <option value="Bebida">Bebida</option>
                </select>
                <div className="images">
                  <div className="imagesInputs">
                    <label htmlFor="">Carregar imagem</label>
                    <input
                      required
                      type="file"
                      name='file'
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <button type="button" onClick={handleUpload}>
                    {uploading ? "carregando..." : "Carregar"}
                  </button>
                </div>
                <label htmlFor="">Descrição</label>
                <textarea
                  name="description"
                  id=""
                  required
                  placeholder="Fala um pouco sobre a receita"
                  cols="0"
                  rows="10"
                  onChange={(e) => setdescription(e.target.value)}
                ></textarea>
                <button type="button" onClick={handleSubmit}>Criar</button>
              </div>
            </div>
            <div className="details">
              <label htmlFor="">Duração em minutos:</label>
              <input
                required
                type="number"
                name="duration"
                placeholder="ex: 30"
                required
                onChange={(e) => setduration(e.target.value)}
              />
              <div className="details">
                <label htmlFor="">Serve quantas pessoas:</label>
                <input
                  required
                  type="number"
                  name="serves"
                  placeholder="ex: 2"
                  required
                  onChange={(e) => setserves(e.target.value)}
                />
                <label htmlFor="">Adicionar ingredientes</label>
                <input type="text" placeholder="ex: Tomate" onChange={(e) => setIngridient(e.target.value)} />
                <button type="button" onClick={() => handleAddIngridient()}>Adicionar</button>

                <div className="addedIngredientes">
                  {addIngridients?.map((f) => (
                    <div className="item" key={f}>
                      <button
                        onClick={() =>
                          setaddIngridients(
                            addIngridients.filter((i) => i !== f)
                          )
                        }
                      >
                        {f}
                        <span>X</span>
                      </button>
                    </div>
                  ))}
                </div>
                <label htmlFor="">Adicionar instruções</label>
                <input type="text" placeholder="ex: Ligar o forno" onChange={(e) => setInstruction(e.target.value)} />
                <button type="button" onClick={() => handleAddInstruction()}>Adicionar</button>

                <div className="addedInstructions">
                  {addInstructions?.map((f) => (
                    <div className="item" key={f}>
                      <button
                        onClick={() =>
                          setaddInstructions(
                            addInstructions.filter((i) => i !== f)
                          )
                        }
                      >
                        {f}
                        <span>X</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
      <dialog open={isEditRecipeModalOpen} className='MyRecipes__modal'>
        <div className="MyRecipes__modal__container">
          <h1>Editar receita</h1>
          <form>
            <div className="sections">
              <div className="info">
                <label htmlFor="">Título</label>
                <input
                  type="text"
                  name="title"
                  placeholder="ex: Massa carbonara"
                  onChange={(e) => settitle(e.target.value)}

                />
                <label htmlFor="">Categoria</label>
                <select name="category" id="category" onChange={(e) => setcategory(e.target.value)} >
                  <option value="Peixe">Peixe</option>
                  <option value="Carne">Carne</option>
                  <option value="Vegano">Vegano</option>
                  <option value="Sobremesa">Sobremesa</option>
                  <option value="Sanduíche">Sanduíche</option>
                  <option value="Bebida">Bebida</option>
                </select>
                <div className="images">
                  <div className="imagesInputs">
                    <label htmlFor="">Carregar imagem</label>
                    <input

                      type="file"
                      name='file'
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <button type="button" onClick={handleUpload}>
                    {uploading ? "carregando..." : "Carregar"}
                  </button>
                </div>
                <label htmlFor="">Descrição</label>
                <textarea
                  name="description"
                  id=""

                  placeholder="Fala um pouco sobre a receita"
                  cols="0"
                  rows="10"
                  onChange={(e) => setdescription(e.target.value)}
                ></textarea>
                <button type="button" onClick={handleEdit}>Editar</button>
              </div>
            </div>
            <div className="details">
              <label htmlFor="">Duração em minutos:</label>
              <input

                type="number"
                name="duration"
                placeholder="ex: 30"

                onChange={(e) => setduration(e.target.value)}
              />
              <div className="details">
                <label htmlFor="">Serve quantas pessoas:</label>
                <input

                  type="number"
                  name="serves"
                  placeholder="ex: 2"
                  required
                  onChange={(e) => setserves(e.target.value)}
                />
                <label htmlFor="">Adicionar ingredientes</label>
                <input type="text" placeholder="ex: Tomate" onChange={(e) => setIngridient(e.target.value)} />
                <button type="button" onClick={() => handleAddIngridient()}>Adicionar</button>

                <div className="addedIngredientes">
                  {addIngridients?.map((f) => (
                    <div className="item" key={f}>
                      <button
                        onClick={() =>
                          setaddIngridients(
                            addIngridients.filter((i) => i !== f)
                          )
                        }
                      >
                        {f}
                        <span>X</span>
                      </button>
                    </div>
                  ))}
                </div>
                <label htmlFor="">Adicionar instruções</label>
                <input type="text" placeholder="ex: Ligar o forno" onChange={(e) => setInstruction(e.target.value)} />
                <button type="button" onClick={() => handleAddInstruction()}>Adicionar</button>

                <div className="addedInstructions">
                  {addInstructions?.map((f) => (
                    <div className="item" key={f}>
                      <button
                        onClick={() =>
                          setaddInstructions(
                            addInstructions.filter((i) => i !== f)
                          )
                        }
                      >
                        {f}
                        <span>X</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
      <div className='spacer' style={{
        backgroundImage: `url(${bg.src})`
      }} />
    </div>
  )
}

export default MyRecipes;