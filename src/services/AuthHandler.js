
import Cookies from 'js-cookie';

export const isLogged = () => {
    let token = Cookies.get('token');
    return (token) ? true : false;
}

//tinha o segundo parametro remember Password = false
export const doLogin = (token, rememberPassword = false) => {
    if(rememberPassword) {
        Cookies.set('token', token, { expires:999 });//tinha a propriedade { expires:999 }
    } else {
        Cookies.set('token', token);
    }
}