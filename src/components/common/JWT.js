class JWT {    
    static get_jwt = () => {
        return { 
            'token': localStorage.getItem('token'),
            'username': localStorage.getItem('username')
        }
    };
    static set_jwt = (token, username) => {
        localStorage.setItem('token', token);
		localStorage.setItem('username', username);
    };
    static remove_jwt = () => {
        localStorage.removeItem('token');
		localStorage.removeItem('username');
    };
}

export default JWT;