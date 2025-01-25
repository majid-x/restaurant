import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import Special from './Special'
import { Testimonials } from './Testimonials'
import Service from './Service'

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <Categories></Categories>
        <Special></Special>
        <Testimonials></Testimonials>
        <Service></Service>
    </div>
  )
}

export default Home