import React from 'react'
import {Icon} from 'antd';
import { HeartOutlined } from '@ant-design/icons';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p>Made with <HeartOutlined /> by Akshat Kumar Agarwal</p>
        </div>
    )
}

export default Footer
