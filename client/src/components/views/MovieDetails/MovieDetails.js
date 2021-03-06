import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import Poster from '../LandingPage/Sections/Poster';
import GridCard from '../LandingPage/Sections/GridCard';
import FavouriteButton from './Sections/FavouriteButton'

import { Descriptions, Button, Row } from 'antd';

const { Title } = Typography;

function MovieDetails(props) {

    const [Movie, setMovie] = useState([])
    const [Cast, setCast] = useState([])
    const [Crew, setCrew] = useState([])
    const [ToggleCast, setToggleCast] = useState(false)
    const movieId = props.match.params.movieId

    useEffect(() => {
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(response => response.json())
        .then(response => {
            setMovie(response)
            fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                .then(response => response.json())
                .then(response => {
                    setCast(response.cast)
                    setCrew(response.crew)
                })
        })
    }, [])


    const handleClick = () => {
        setToggleCast(!ToggleCast)
    }

    return(
        <div style={{ width: '100%', margin: '0'}}>

            {/* jumbotron image */}
            { Movie &&
                <Poster
                    image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }
            
            <div style={{ width:"85%", margin:"1rem auto" }}>
                <div style={{ display:"flex", justifyContent:"flex-end" }}>
                    <FavouriteButton
                        userFrom={localStorage.getItem('userId')}
                        movieId={movieId}
                        movieTitle={Movie.original_title}
                        movieImage={Movie.backdrop_path}
                        movieRating={Movie.vote_average}
                        movieRuntime={Movie.runtime}
                    />
                </div>


                {/* Movie Info */}
                <Descriptions title="More Details" bordered>
                    <Descriptions.Item label="Title" span={2}>{Movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="Release Date">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="Average Rating">{Movie.vote_average * 10}%</Descriptions.Item>
                    <Descriptions.Item label="Total Ratings">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="Revenue">{Movie.revenue ? 
                        Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0})
                        .format(Movie.revenue) : "Unknown"
                    }</Descriptions.Item>
                    <Descriptions.Item label="Runtime">{Movie.runtime} mins</Descriptions.Item>
                    <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label="Popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>
            
                
                {/* Cast and Crew */}
                <div style={{ display:"flex", justifyContent:"center", margin: "1rem auto"}}>
                    <Button type="default" size="large" style={{borderColor:"grey"}} onClick={handleClick}>Cast and Crew</Button>
                </div>

                {ToggleCast && 
                <div>
                    {/* Crew */}
                <Title level ={2}>Director</Title>
                <hr />
                <Row gutter ={[16, 16]}>
                {Crew && Crew.map((crew, index) => (
                        <React.Fragment key={index}>
                            {crew.job === "Director" ?
                                <GridCard
                                    crew
                                    image ={`${IMAGE_URL}w500${crew.profile_path}`}
                                    job = {crew.job}
                                    name = {crew.name}
                                /> : null}
                        </React.Fragment>
                    ))}
                </Row>

                {/* Cast */}
                <Title level ={2}>Cast</Title>
                <hr />
                <Row gutter ={[16, 16]}>
                {Cast && Cast.map((cast, index) => (
                        <React.Fragment key={index}>
                            {cast.profile_path && <GridCard
                                actor
                                image ={`${IMAGE_URL}w500${cast.profile_path}`}
                                name = {cast.name}
                            />}
                        </React.Fragment>
                    ))}
                </Row>
                </div>
                }

            </div> 
        </div>
    )
}

export default MovieDetails