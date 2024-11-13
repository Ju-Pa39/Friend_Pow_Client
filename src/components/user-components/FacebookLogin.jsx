import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { loginFacebook } from "../../apis/AuthApi";
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/src/stores/AuthStore';


function FacebookLoginButton() {
    const navigate = useNavigate();
    const actionLoginFacebook = useAuthStore((state) => state.actionLoginFacebook);

    const handleFacebookLogin = async (response) => {
        const { accessToken, userID } = response;

        if (accessToken && userID) {
            try {
                const backendResponse = await loginFacebook(accessToken, userID);
                if (backendResponse.data && backendResponse.data.user) {

                }
                const user = backendResponse.data.user;
                const token = backendResponse.data.token;
                console.log(user, "user respon")
                console.log(token, "user respon")

                if (user.role === 'USER' || user.role === 'VOLUNTEER') {
                    actionLoginFacebook(token, user);
                    navigate('/');

                }
                else if (user.role === 'ADMIN') {
                    actionLoginFacebook(token, user);
                    navigate('/admin');
                }
            } catch (error) {
                console.error('Login Failed:', error);
            }
        } else {
            console.error('Facebook login failed');
        }
    };

    return (
        <div>
            <FacebookLogin
                appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name,email"
                callback={handleFacebookLogin}
                icon="fa-facebook"
                textButton="Login with Facebook"
                buttonStyle={{
                    backgroundColor: '#4267B2',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    color: 'white'
                }}
            />
        </div>
    );
}

export default FacebookLoginButton;