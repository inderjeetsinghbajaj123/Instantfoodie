import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import Token from '../utils/Token.js';

export const userRegister = async (req, res) => {
    let { fullname, email, password } = req.body;
    try {
        const user = await User.findOne({ email: email })
        if (!fullname || !email || !password) {
            return res.json('Please fill all the fields');
        }
        else if (user) {
            return res.send('User already exists ..');
        }
        else if (password.length < 6) {
            return res.send('Minimum 6 character password is required')
        }
        else {
            const hash = await bcrypt.hash(password, 10);
            const createUser = await User.create({
                fullName: fullname,
                email: email,
                password: hash
            });
            res.send('User created successfully')
        }
    } catch (e) {
       res.send(e.message)
    }
};

export const userLogin = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email })

        if (!email || !password) {
            return res.send('Please fill all the fields');
        }
        else if (!user) {
            return res.send('No user Found ')
        }

        let check = await bcrypt.compare(password, user.password)
        if (check) {
            const token = await Token(user.email, user._id)
            res.cookie("Token", token)
            res.send('loggedIn successfull')
        }
        else {
            return res.send('Incorrect credentials')
        }
    } catch (error) {
        res.send(error.message)
    }
}

export const userLogout = async (req, res) => {
    try {
        res.clearCookie("Token");
        res.send('logout successfull')

    } catch (error) {
        res.send(error.message)
    }

}