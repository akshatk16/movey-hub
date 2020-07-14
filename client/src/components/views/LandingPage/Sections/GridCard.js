import React from 'react';
import { Col } from 'antd';


function GridCard(props) {
    if(props.crew) {
        return(
            <Col lg={6} md={8} xs={24}>
                <div style={{position:'relative'}}>
                        <img style={{
                            height:"50%",
                            width:"100%",
                        }}
                            src={props.image}
                            alt="Picture Unavailable: "
                             />
                        <p>{props.name}</p>
                </div>
            </Col>
        )
        
    } else if(props.actor) {
        return(
            <Col lg={6} md={8} xs={24}>
                <div style={{position:'relative'}}>
                        <img style={{
                            height:"50%",
                            width:"100%",
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
                            height:"50%",
                            width:"100%",
                        }} alt={`Poster unavailable for '${props.title}'`} src={props.image}></img>
                    </a>
                </div>
            </Col>
        )
    }
}

export default GridCard