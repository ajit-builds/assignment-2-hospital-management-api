const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Hospitals = require('../models/Hospitals');
const User = require('../models/User');

const router = express.Router();

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

router.post('/register', async (request, response) => {
    try {
        const { name, username, email, password } = request.body;

        if (!name || !username || !email || !password) {
            return response.status(400).json({
                message: 'Name, username, email and password are required'
            });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return response.status(409).json({
                message: 'Username or email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return response.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
});

router.post('/login', (request, response, next) => {
    passport.authenticate('local', { session: false }, (error, user) => {
        if (error) {
            return next(error);
        }

        if (!user) {
            return response.status(401).json({
                message: 'Invalid username or password'
            });
        }

        return response.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });
    })(request, response, next);
});

router.get('/', (request, response) => {
    response.status(200).json({ message: 'Welcome to the hospital API' });
});

router.get('/hospitals', async (request, response) => {
    try {
        const hospitals = await Hospitals.find();
        return response.status(200).json(hospitals);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
});

router.get('/hospitals/:id', async (request, response) => {
    try {
        const hospital = await Hospitals.findById(request.params.id);

        if (!hospital) {
            return response.status(404).json({ message: 'Hospital not found' });
        }

        return response.status(200).json(hospital);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
});

router.post('/hospitals', async (request, response) => {
    try {
        const { name, city, totalBeds, availableBeds } = request.body;

        if (!name || !city || totalBeds === undefined || availableBeds === undefined) {
            return response.status(400).json({
                message: 'Name, city, totalBeds and availableBeds are required'
            });
        }

        const hospital = await Hospitals.create({
            name,
            city,
            totalBeds,
            availableBeds
        });

        return response.status(201).json({
            message: 'Hospital created successfully',
            hospital
        });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
});

router.put('/hospitals/:id', async (request, response) => {
    try {
        const hospital = await Hospitals.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true, runValidators: true }
        );

        if (!hospital) {
            return response.status(404).json({ message: 'Hospital not found' });
        }

        return response.status(200).json({
            message: 'Hospital updated successfully',
            hospital
        });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
});

router.delete('/hospitals/:id', async (request, response) => {
    try {
        const hospital = await Hospitals.findByIdAndDelete(request.params.id);

        if (!hospital) {
            return response.status(404).json({ message: 'Hospital not found' });
        }

        return response.status(200).json({
            message: 'Hospital deleted successfully'
        });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
});

module.exports = router;