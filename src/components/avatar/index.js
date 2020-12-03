import React from 'react'
import './styles.css'

function Avatar(props) {
    return(
        <div>
            <img className="foto" src={props.url} />
        </div>
    );
}


export default Avatar;

