import React, { useState } from 'react';
import useAPI from '../../services/api';
import {ErrorMessage} from '../../components/MainComponents';
import  './styles.css';
import {Link} from 'react-router-dom';
import { doLogin } from '../../services/AuthHandler';


const Cadastro = () => {

    const API = useAPI();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        if(password !== confirmPassword) {
            setError('Senhas não conferem');
            return;
        }
        const json = await API.register(name, email, password);
        localStorage.setItem('name', json.data.name);

        if(json.error) {
           setError(json.error); 
        } else {
            doLogin(json.token);
            window.location.href= '/dashboard';
        }
        console.log(json);
    };
    
    return (
        <div className="login">
            {error &&
                <ErrorMessage>{error}</ErrorMessage>
            }
            <h1 className="login__titulo">Acessar Sistema</h1>
            <form>
                <div className="login__form">
                    <input 
                    id="name" 
                    type="name" 
                    name="name"
                    placeholder="Digite seu nome" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                    />
                </div>
                <div className="login__form">
                    <input 
                    id="email" 
                    type="email" 
                    name="email"
                    placeholder="Digite sua email" 
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
                <div className="login__form">
                    <input 
                    id="password" 
                    type="password" 
                    name="password"
                    placeholder="Confirme sua senha" 
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    required
                    /> 
                </div>
            </form>
            <button className="login__button" onClick={handleLogin}>CADASTRAR</button>
            <div className="login__cad">
                <Link to="/" className="login__cadtext">Já possui uma conta? Faça login</Link>
            </div>
        </div>
    );
}

export default Cadastro;