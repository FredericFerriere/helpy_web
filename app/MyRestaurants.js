'use client'

import React, { useState, useEffect } from 'react';
import Axios from "axios";

const RESTAURANTS = [
    { name: "Le petit Thiou", rating: 3 , city: "Annecy"},
    { name: "Les terrasses du lac", rating: 4, city: "Annecy" },
    { name: "Dip", rating: 5, city: "Annecy" },
    { name: "Tokyo 14", rating: 5, city: "Paris" }
];

const CITIES = {
    "Paris": { latitude: 48.8620625, longitude: 2.3427284 },
    "Annecy": { latitude: 45.90751266479492, longitude: 6.124344348907471 }
};

function RestaurantSearch({ city, radius, onCityChange, onRadiusChange }) {
    return (
        <form>
            <label htmlFor="city"> Ville: </label>
            <select name="city" id="city" value={city} onChange={(e) => onCityChange(e.target.value)}>
                <option value="Paris">Paris</option>
                <option value="Annecy">Annecy</option>
            </select>
            <input type="text" placeholder="rayon" value={radius} onChange={(e) => onRadiusChange(e.target.value)} />
        </form>
    );
}

function RestaurantRow({ restaurant } ) {
    return (
        <tr>
            <td> {restaurant.name} </td>
            <td> {restaurant.rating} </td>
            <td> {restaurant.city} </td>
        </tr>
    );
}

function RestaurantList({ city, restaurants }) {
    const rows = [];

    restaurants.forEach((restaurant) => {
        rows.push(
            <RestaurantRow
                restaurant={restaurant}
                key={restaurant.name}
            />
        )
    }
    );

    return (
        <table> 
            <thead>
                <tr>
                    <th> Nom </th>
                    <th> Note </th>
                    <th> Ville </th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}


function fetchRestaurants({ latitude, longitude, radius }) {
    useEffect(() => {
        Axios.get('http://127.0.0.1:8000/users/u1/restaurants/suggestions?latitude=45.9&longitude=6.11&radius=1500')
            .then(res= response.data)
            .catch(error => {
                console.error(error);
            });
    }, res = []);
    return res;
}


function FilterableList() {
    const [city, setCity] = useState('Paris');
    const [radius, setRadius] = useState(1000);
    const city_lat = CITIES[city].latitude;
    const city_lon = CITIES[city].longitude;

    const restaurants = fetchRestaurants(city_lat, city_lon, radius);

    return (
        <div>
            <RestaurantSearch
                city={city}
                radius={radius}
                onCityChange={setCity}
                onRadiusChange={setRadius}
            />
            <RestaurantList
                city={city}
                restaurants={restaurants}
            />
        </div>
    );
}


export default function MyRestaurants() {
    return (
        <FilterableList />
    );
}