import User from '../models/userModels.js';

const signupS = async (username, email, password, confirmPass) => {
    try {
        if (!username || !email || !password || !confirmPass) {
            return {
                status: 404,
                json: { message: 'All fields are required' },
            };
        }

        if (password?.length < 6) {
            return {
                status: 404,
                json: {
                    message: 'Password must be at least 6 characters long',
                },
            };
        }

        if (password !== confirmPass) {
            return {
                status: 404,
                json: { message: 'Password not match' },
            };
        }

        const newUser = new User({
            username,
            email,
            password,
        });
        await newUser.save();
        return { status: 200, json: newUser };
    } catch (err) {
        console.error(err);
        return { status: 500, json: { message: 'Server Error' } };
    }
};
const signinS = async () => {};
const signoutS = async () => {};

export { signupS, signinS, signoutS };
