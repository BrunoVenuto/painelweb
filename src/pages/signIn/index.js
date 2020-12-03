import React, { useState } from 'react';
import useAPI from '../../services/api';
import {Link} from 'react-router-dom';
import  './styles.css';
import { doLogin } from '../../services/AuthHandler';
import {ErrorMessage} from '../../components/MainComponents';
import Cookies from 'js-cookie';

const SignIn = () => {

    const API = useAPI();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPaswword] = useState(false);
    const [error, setError] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if(email ==='' || password ==='') {
            setError('Preencha todos os campos !');
            return;
        }
        //REQUISITANDO A APIDEVBARBER
        const json = await API.login(email, password);
        if(!json.token) {
            setError('Usuário não encontrado !');
            return;
        }
        Cookies.set('name', json.data.name);
        Cookies.set('avatar', json.data.avatar);

        if(json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, rememberPassword);
            window.location.href ="/dashboard";//dashboard
        }
        console.log(json);
        console.log(Cookies);
    }



    return (
        <div className="login">
            {error &&
                <ErrorMessage>{error}</ErrorMessage>
            }
            <h1 className="login__titulo">Acessar Sistema</h1>
            <form onSubmit={handleSubmit}>
                <div className="login__form">
                    <input 
                    id="email" 
                    type="email" 
                    name="email"
                    placeholder="Digite seu e-mail" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                </div>
                <div className="login__form">
                    <input 
                    id="password" 
                    type="password" 
                    name="password"
                    placeholder="Digite sua senha" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    /> 
                </div>
            </form>
            <button className="login__button" onClick={handleSubmit}>Entrar</button>
            <div className="login__cad">
                <Link to="/signUp" className="login__cadtext">Ainda não possui conta? Cadastre-se</Link>
            </div>
        </div>
       
    );
}

export default SignIn;