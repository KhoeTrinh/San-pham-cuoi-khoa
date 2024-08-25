import { signupS, signinS, signoutS } from '../services/usersService.js';
import generateToken from '../utils/createToken.js';

const signup = async (req, res) => {
    const { username, email, password, confirmPass } = req.body;
    const resData = await signupS(username, email, password, confirmPass);
    generateToken(resData.id, res);
    res.status(resData.status).json(resData.json);
};
const signin = async (req, res) => {
    const { email, password } = req.body;
    const resData = await signinS(email, password);
    generateToken(resData.id, res);
    res.status(resData.status).json(resData.json);
};
const signout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 });
    const resData = await signoutS();
    res.status(resData.status).json(resData.json);
};

export { signup, signin, signout };
