import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

function FavouriteButton(props) {
    const user = useSelector(state => state.user)
    const [FavouriteNumber, setFavouriteNumber] = useState(0)
    const [Favourited, setFavourited] = useState(false)
    
    const variable = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieTitle,
        movieImage: props.movieImage,
        movieRuntime: props.movieRuntime,
        movieRating: props.movieRating,
    }

    useEffect(() => {

        
        axios.post('/api/favourite/favouriteNumber', variable)
            .then(response => {
                if (response.data.success) {
                    setFavouriteNumber(response.data.favouriteNumber)
                } else {
                    alert('Could not find total Favourites for this movie')
                }
            })
        
        axios.post('/api/favourite/favourited', variable)
            .then(response => {
                if (response.data.success) {
                    setFavourited(response.data.favourited)
                } else {
                    alert("Could not get Favourite Details")
                }
            })
    }, [])

    const handleClick = () => {
        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }
        if(Favourited) {
            axios.post('/api/favourite/removeFromFavourites', variable)
                .then(response => {
                    if(response.data.success) {
                        setFavouriteNumber(FavouriteNumber - 1)
                        setFavourited(!Favourited)
                    } else {
                        alert("Failed To Remove From Your Favourites")
                    }
                })
        } else {
            axios.post('/api/favourite/addToFavourites', variable)
                .then(response => {
                    if(response.data.success) {
                        setFavouriteNumber(FavouriteNumber + 1)
                        setFavourited(!Favourited)
                    } else {
                        alert("Failed To Add To Your Favourites")
                    }
                })
        }
    }

    return(
        <div> {Favourited ? 
        <Button
            
            danger
            type="primary"
            shape="round"
            icon={<HeartFilled />}
            onClick={handleClick}
        >
            Remove from Favourites {FavouriteNumber}
        </Button>
        :
        <Button
            
            danger
            type="round"
            icon={<HeartOutlined />}
            onClick={handleClick}
        >
            Add To Favourites {FavouriteNumber}
        </Button>
    }</div>
    )
}

export default FavouriteButton;