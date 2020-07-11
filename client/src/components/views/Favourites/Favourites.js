import React, { useEffect, useState } from 'react';
import { Popover, Typography, Button} from 'antd';
import styles from './Favourites.module.css'
import axios from 'axios';
import { IMAGE_URL } from "../../Config";


const { Title } = Typography;
function Favourites(props) {
    const variable = { userFrom: localStorage.getItem('userId')}
    const [FavouriteMovies, setFavouriteMovies] = useState([])
    
    const fetchFavourites = () => {
        axios.post('api/favourite/getFavourites', variable)
            .then(response => {
                if(response.data.success) {
                    setFavouriteMovies(response.data.favourites)
                } else {
                    alert("Could Not Fetch Favourited Movies")
                }
            })
    }
    
    useEffect(() => {
        fetchFavourites();
    }, [])

    const handleClick = (movieId) => {
        const remVar = { userFrom: localStorage.getItem('userId'), movieId: movieId }
        axios.post('/api/favourite/removeFromFavourites', remVar)
                .then(response => {
                    if(response.data.success) {
                        fetchFavourites();
                    } else {
                        alert("Failed To Remove From Your Favourites")
                    }
                })
    }

    

    const renderTable = FavouriteMovies.map((movie, index) => {
        const poster = (
            <div>
                {movie.movieImage ?
                    <img src={`${IMAGE_URL}w500${movie.movieImage}`} />
                    : "Poster Not Available"
                }
            </div>
        )

        return(
            <>
                {movie.movieTitle ? 
                <tr className={`${styles.favRow}`}>
                    <td className={`${styles.smallest} ${styles.favData}`}>{index + 1}</td>

                    <Popover title={movie.movieTitle} content={poster}>
                        <td className={`${styles.favData} ${styles.title}`}>
                            <a href={`../movie/${movie.movieId}`} className={styles.link} alt="Poster">{movie.movieTitle}</a>
                        </td>
                    </Popover>
                    <td 
                        className={`${styles.favData} ${styles.num}`}>{movie.movieRating % 1 ? 
                        `${movie.movieRating}` : `${movie.movieRating}.0`} / 10
                    </td>
                    <td className={styles.favData}>{movie.movieRuntime} minutes</td>
                    <td className={`${styles.medium} ${styles.favData} ${styles.button}`}>
                        <Button danger onClick={ ()=>handleClick(movie.movieId) }>Remove</Button>
                    </td>
                </tr>
                :
                <tr className={`${styles.favRow}`}>
                    <td className={`${styles.smallest} ${styles.favData}`}>{index + 1}</td>
                    <td colspan={3} className={`${styles.smallest} ${styles.favData}`}>Error: Movie does not exist</td>
                    
                    <td className={`${styles.medium} ${styles.favData} ${styles.button}`}>
                        <Button danger onClick={ ()=>handleClick(movie.movieId) }>Remove</Button>
                    </td>
                </tr>
                }
            </>
        )
    })

    return(
        <div className={styles.favBody} style={{ width:"80%", margin:"1rem auto",}}>
        
        <h1 className={styles.favH1}>Your Favourites</h1>
        <hr />
        {FavouriteMovies.length ?
            <table className={styles.favTable}>
                <thead>
                    <tr className={styles.favRow}>
                    <th className={`${styles.smallest} ${styles.favHead}`}>S.No.</th>
                    <th className={styles.favHead}>Movie Title</th>
                    <th className={`${styles.small} ${styles.favHead}`}>Rating</th>
                    <th className={`${styles.small} ${styles.favHead}`}>Runtime</th>
                    <th className={`${styles.medium} ${styles.favHead}`}>Remove From Favourites</th>
                    </tr>
                </thead>
                <tbody>
                {renderTable}
                </tbody>

            </table>
        : 
            <h3 className={styles.favH3}>You Do Not Have Any Favourites<br />
            Select "Add To Favourites" on a movie page to view it here</h3>
        }
        </div>
    )
}

export default Favourites