import React, { useEffect, useState }from 'react'
import Restaurants from '../components/Restaurants/Restaurants'
import Categories from '../components/Categories/Categories'
import Slider from '../components/Slider/Slider'
import axios from "axios"
import { useSelector } from 'react-redux'

function Home() {
  const cities = useSelector((state) => state.cityReducer)
  const restaurants = useSelector((state) => state.restaurantReducer)
  return (
    <>
        <Slider />
        <Categories cities={cities}/>
        <Restaurants restaurants={restaurants}/>
    </>
  )
}

export default Home