const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('../utils/appError')

// REGISTRAR USUARIO
exports.signup = async(req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            return next(createError('El usuario ya existe!', 400));            
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12); 
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });
        // Asignar JWT a user
        const token = jwt.sign({_id: newUser._id}, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(201).json({
            status: 'Exitoso!',
            message: 'Usuario registrado exitosamente!',
            token,
        });

    } catch (error) {
        next(error);       
    }
}

// USUARIO REGISTRADO
exports.login = async(req, res, next) => {}