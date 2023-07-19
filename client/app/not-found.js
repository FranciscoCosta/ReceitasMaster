import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return <div>
      <div className='PageNotFound'>
        <div className='PageNotFound__img-container'>
            <Image src={'/assets/notfound.png'} fill className='NotFound-img' />
        </div>
        <h1 className='PageNotFound__title'>Página não encontrada</h1>
        <Link className='PageNotFound__link' href="/">Voltar a home</Link>
      </div>
  </div>
}