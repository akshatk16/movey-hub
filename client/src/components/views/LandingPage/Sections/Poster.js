import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;


function Poster(props) {
    return(
        <div>
            <div style = {{
                background:
                    `linear-gradient(to bottom, 
                        rgba(0,0,0,0) 39%, 
                        rgba(0,0,0,0) 41%, 
                        rgba(0,0,0,0.65) 100%),
                        #1c1c1c`,
                backgroundImage: `url('${props.image}')`,
                height: '80vh',
                width: '100%',
                position: 'relative',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            }}>
                <div>
                    <div style= {{
                        position: "absolute",
                        maxWidth: "500px",
                        bottom: '2rem',
                        marginLeft: '2rem',
                        marginRight:"2rem",
                        padding: "0.2rem 0.7rem 0rem 0.7rem",
                        background: 'rgba(50, 50, 70, 0.8)',
                        borderRadius:"10px",
                    }}>
                        <Title style= {{
                            color: "white"
                        }}
                        level = {2} >
                            {props.title}
                        </Title>
                        <p style = {{
                            color:"white",
                            fontSize:"1rem"
                        }}>
                            {props.text}

                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Poster