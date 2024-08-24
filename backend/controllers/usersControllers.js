import { signupS, signinS, signoutS } from '../services/usersService.js';

const signup = async (req, res) => {
    const { username, email, password, confirmPass } = req.body;
    const resData = await signupS(username, email, password, confirmPass)
    res.status(resData.status).json(resData.json)
};
const signin = async () => {};
const signout = async () => {};

export { signup, signin, signout };
