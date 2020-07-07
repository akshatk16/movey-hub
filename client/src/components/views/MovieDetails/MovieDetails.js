import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import Poster from '../LandingPage/Sections/Poster';
import { Descriptions, Badge, Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';



function MovieDetails(props) {

    const [Movie, setMovie] = useState([])
    const movieId = props.match.params.movieId
    useEffect(() => {
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovie(response)
        })
    })
    return(
        <div>
            { Movie &&
                <Poster
                    image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }

            <div style={{ width:"85%", margin:"1rem auto" }}>
                <div style={{ display:"flex", justifyContent:"flex-end" }}>
                    <Button danger icon={<HeartOutlined />}>Add To Favourites</Button>
                </div>

                <Descriptions title="Movie Info" bordered>
                    <Descriptions.Item label="Title" span={2}>{Movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="Release Date">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="Average Rating">{Movie.vote_average}</Descriptions.Item>
                    <Descriptions.Item label="Total Ratings">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="Revenue">{
                        Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
                            .format(Movie.revenue)
                    }</Descriptions.Item>
                    <Descriptions.Item label="Runtime">{Movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label="Popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>
            
            </div> 

        </div>
    )
}

export default MovieDetails