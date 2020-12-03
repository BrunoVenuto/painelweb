import React, { useState } from 'react';
import Menu from '../../components/menu';
import Avatar from '../../components/avatar'
import axios from 'axios'
import './styles.css'
import Cookies from 'js-cookie';

function Dashboard() {

    const [list, setList] = useState([]);
    const [name, setName] = useState(Cookies.get('name'));

    const handlelogout = () => {
        return(
            Cookies.remove('token'),
            window.location.href='/'
        );
    }
//REQUISITANDO A MINHA API
    const loadlist = () => {
        axios.get('http://127.0.0.1:8000/api/user/appointments', {
            params: {
                token: Cookies.get('token')
            }
        })
            .then(function(response){
                console.log(response.data.list);
                setList(response.data.list);
            });
    }

    
    return(
        <div>
            <Menu />
            <Avatar url="http://127.0.0.1:8000/media/avatars/default.png" />
            <h1 className="title">Dashboard</h1>
            <h3 className="msg">Olá {name} !</h3>
                <ul className="agnda">
                    {list.map((item, index)=>(
                        <>
                        <li key={index}>{item.barber.name}</li>
                        <li key={index}>{item.datetime}</li>
                        <li key={index}>{item.service.name}</li>
                        <li key={index}>{item.service.price}</li>
                        </>
                    ))}
                </ul>
            <button onClick={handlelogout}>Sair</button>
            <button onClick={loadlist}>agendamentos</button>
        </div>
    );
}

export default Dashboard;