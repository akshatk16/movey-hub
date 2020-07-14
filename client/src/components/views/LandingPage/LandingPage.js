import React, { useEffect, useState, useRef } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import { Typography, Row, Button } from 'antd';
import Poster from './Sections/Poster';
import GridCard from './Sections/GridCard';
// import SearchInput from './Sections/SearchInput';
import { Input } from 'antd';

const { Search } = Input;

let notSearched = true;
let searchText = '';
const { Title } = Typography;
function LandingPage() {

    const buttonRef = useRef(null);
    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState([])
    

    const fetchPage = (path) => {
        fetch(path)
        .then(response => response.json())
        .then(response => {
            setMovies([...Movies, ...response.results])
            setCurrentPage(response.page)
        })
    }

    const fetchSearch = (path) => {
        fetch(path)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if(response.total_results > 0) {
                setMovies(response.results)
            }
        })
    }

    const handleSearch = (e) => {
        searchText = e.replace(/ /g, '%20');
        const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}`
        console.log(endpoint)
        fetchSearch(endpoint)
        notSearched = false
        console.log(notSearched)
    }

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchPage(endpoint)
    }, [])

    const handleClick = () => {
        const ac = new AbortController();
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`
        fetchPage(endpoint)
        return () => ac.abort(); // Abort both fetches on unmount
    }

    return (
        <div>
            {notSearched &&
                <div style ={{
                    display:"inline-flex",
                    width: '100%',
                    margin: '2rem auto',
                    justifyContent: 'center',
                    position: 'absolute',
                    zIndex:'100',
                    color:'black',
                }}>
                    <Search
                        placeholder="Search For A Movie Here..."
                        onSearch={value => handleSearch(value)}
                        style={{
                            width: '60%',
                            backgroundColor:"rgba(0, 0, 0,0.7)",
                            color:"black"
                        }}
                    />
                    
                </div>
            }
            <div style={{ width: '100%', margin: '0'}}>


                {/* jumbotron image */}
                { (notSearched && Movies[0]) &&
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
                    <Title level ={2}>{notSearched ? 'Popular Movies' : `Search Results for '${searchText}'`}</Title>
                    {console.log(notSearched)}
                    <hr />
                    <Row gutter ={[16, 16]}>
                        {Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCard
                                    image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                    movieId={movie.id}
                                    title={movie.original_title}
                        />
                            </React.Fragment>
                        ))}
                    </Row>
                    <br />
                        {notSearched && 
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
                        }
                </div>
            </div>
        </div>
    )
}

export default LandingPage
