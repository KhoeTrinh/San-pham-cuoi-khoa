import User from '../models/userModels.js';
import bcrypt from 'bcryptjs';

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

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                status: 200,
                json: {
                    message: 'Email already in use',
                },
            };
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashed,
        });
        await newUser.save();
        return {
            status: 200,
            json: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
            id: newUser._id,
        };
    } catch (err) {
        console.error(err);
        return { status: 500, json: { message: 'Server Error' } };
    }
};
const signinS = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(
            password,
            user?.password || ''
        );

        if (!user || !isMatch) {
            return {
                status: 401,
                json: { message: 'Invalid credentials' },
            };
        }

        return {
            status: 200,
            json: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
            id: user._id,
        };
    } catch (err) {
        console.error(err);
        return { status: 500, json: { message: 'Server Error' } };
    }
};
const signoutS = async () => {
    try {
        return {
            status: 200,
            json: { message: 'Sign out successfully' },
        };
    } catch (err) {
        console.error(err);
        return { status: 500, json: { message: 'Server Error' } };
    }
};

export { signupS, signinS, signoutS };
