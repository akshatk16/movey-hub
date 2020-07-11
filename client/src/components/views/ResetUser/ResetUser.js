import React from 'react';
import { Typography } from 'antd';
const { Title } = Typography;
function ResetUser() {
    return(
        <div style={{width:"85%", margin:'2em'}}>
            <Title level ={4}>This feature is currently not available.<br />
            Kindly make a new account.<br />
            We apologise for the inconvenience.</Title>
        </div>
    )
}

export default ResetUser