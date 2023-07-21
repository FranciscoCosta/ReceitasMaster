import Image from 'next/image'
import styles from './page.module.css'

import { Hero, Search, Statistics } from '@/components'

export default function Home() {
  return (
    <main className='Home'>
     <Hero />
     <Search />
     <Statistics />

    </main>
  )
}
