'use client'
import './globals.css'

import React, { useState, useEffect } from 'react';
import Axios from "axios";

const RESTAURANTS = [
    { name: "Le petit Thiou", rating: 3 , city: "Annecy"},
    { name: "Les terrasses du lac", rating: 4, city: "Annecy" },
    { name: "Dip", rating: 5, city: "Annecy" },
    { name: "Tokyo 14", rating: 5, city: "Paris" }
];

const CITIES = {
    "Paris": { latitude: 48.862062, longitude: 2.342728 },
    "Annecy": { latitude: 45.907512, longitude: 6.124344}
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
            <td> {restaurant.average_rating} </td>
        </tr>
    );
}

function RestaurantList({ restaurants }) {

    const rows = restaurants.map(restaurant => <RestaurantRow key={restaurant.id} restaurant={restaurant} />);

    return (
        <table className="restaurant-rating-table"> 
            <thead>
                <tr>
                    <th> Nom </th>
                    <th> Note </th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}


function FilterableList() {
    const [city, setCity] = useState('Paris');
    const [radius, setRadius] = useState(5000);

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        Axios.get('http://127.0.0.1:8000/users/u1/restaurants/geographic_filter', {
            params: {
                latitude: CITIES[city].latitude,
                longitude: CITIES[city].longitude,
                radius: radius
            }
        })
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [city, radius]);

    return (
        <div>
            <RestaurantSearch
                city={city}
                radius={radius}
                onCityChange={setCity}
                onRadiusChange={setRadius}
            />
            <RestaurantList
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