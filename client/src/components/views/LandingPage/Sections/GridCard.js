import React from 'react';
import { Col } from 'antd';


function GridCard(props) {
    if(props.crew) {
        return(
            <Col lg={6} md={8} xs={24}>
                <div style={{position:'relative'}}>
                        <img style={{
                            width:"100%",
                            height:"375px"
                        }} alt="Unavailable" src={props.image}></img>
                        <p>{props.name}</p>
                </div>
            </Col>
        )
        
    } else if(props.actor) {
        return(
            <Col lg={6} md={8} xs={24}>
                <div style={{position:'relative'}}>
                        <img style={{
                            width:"100%",
                            height:"375px",
                        }} alt="cast" src={props.image}></img>
                        <p>{props.name}</p>
                </div>
            </Col>
        )
        
    } else {
            
        return(
            <Col lg={6} md={8} xs={24}>
                <div style={{position:'relative'}}>
                    <a href={`movie/${props.movieId}`}>
                        <img style={{
                            width:"100%",
                            height:"375px",
                        }} alt="poster" src={props.image}></img>
                    </a>
                </div>
            </Col>
        )
    }
}

export default GridCard