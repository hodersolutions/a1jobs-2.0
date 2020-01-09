class JWT {    
    static get_jwt = () => {
        return { 
            'access_token': localStorage.getItem('access_token'),
            'mobile': localStorage.getItem('mobile')
        }
    };
    static set_jwt = (access_token, mobile) => {
        localStorage.setItem('access_token', access_token);
		localStorage.setItem('mobile', mobile);
    };
    static remove_jwt = () => {
        localStorage.removeItem('access_token');
		localStorage.removeItem('mobile');
    };
}

export default JWT;