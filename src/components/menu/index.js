import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="dashboard">
            <ul>
                <Link to="">Agendamentos</Link>
                <Link to="">Serviços</Link>
                <Link to="">Perfil</Link>
            </ul>
        </div>
    );
}

export default Menu;