import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Token from '../utils/Token.js';

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

export const adminRegister = async (req, res) => {
    // Expecting fullName from the request body
    let { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: 'Admin already exists' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Minimum 6 characters required' });
        }

        const hash = await bcrypt.hash(password, 10);
        const createUser = await User.create({
            fullName,
            email,
            password: hash,
            role: "admin" // Default role is "admin"
        });

        const token = Token(createUser.email, createUser._id, createUser.role);
        res.cookie("Token", token, cookieOptions);

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: createUser._id,
                fullName: createUser.fullName,
                email: createUser.email,
                role: createUser.role
            }
        });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

export const adminLogin = async (req, res) => {
    let { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'No user Found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Only Admin Allowed' });
        }

        let check = await bcrypt.compare(password, user.password);
        if (check) {
            // Token utility is synchronous, no await needed
            const token = Token(user.email, user._id, user.role);

            res.cookie("Token", token, cookieOptions);

            return res.status(200).json({
                message: 'loggedIn successful',
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role
                }
            });
        }
        else {
            return res.status(401).json({ message: 'Incorrect credentials' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const adminLogout = async (req, res) => {
    try {
        // Clear cookie using the exact same options context it was created with
        res.clearCookie("Token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
        });
        return res.status(200).json({ message: 'logout successful' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only Admin Allowed' });
        }

        const users = await User.find({ role: "user" }).select('-password');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getRestaurants = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only Admin Allowed' });
        }

        const restaurants = await User.find({ role: "restaurant" }).select('-password');
        return res.status(200).json({ restaurants });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only Admin Allowed' });
        }

        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ success: true, user:user });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only Admin Allowed' });
        }

        const user = await User.findOneAndDelete({ _id: id })
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            user: user.fullName
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


