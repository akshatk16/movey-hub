import React, { useEffect, useState, useRef } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import { Typography, Row, Button } from 'antd';
import Poster from './Sections/Poster';
import GridCard from './Sections/GridCard';

const { Title } = Typography;
function LandingPage() {

    const buttonRef = useRef(null);
    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState([])

    const fetchPage = (path) => {
        fetch(path)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([...Movies, ...response.results])
            setCurrentPage(response.page)
        })
    }

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchPage(endpoint)
    }, [])

    const handleClick = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`
        console.log(endpoint)
        fetchPage(endpoint)
    }

    return (
        <div style={{ width: '100%', margin: '0'}}>

            {/* jumbotron image */}
            { Movies[0] &&
                <Poster
                    image={`${IMAGE_URL}w1280${Movies[0].backdrop_path}`}
                    title={Movies[0].original_title}
                    text={Movies[0].overview}
                />
            }

            {/* Main Body */}
            <div style ={{
                width: '85%',
                margin: '1rem auto'
            }}>
                <Title level ={2}>Movies by Latest</Title>
                <hr />
                <Row gutter ={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                movieId={movie.id}
                    />
                        </React.Fragment>
                    ))}
                </Row>
                <br />
                    <div style = {{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Button
                            ref={buttonRef}
                            className="loadMore"
                            onClick={handleClick}
                        >
                            Load More
                        </Button>
                    </div>
            </div>
        </div>
    )
}

export default LandingPage
