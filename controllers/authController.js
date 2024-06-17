const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const creatError = require('../utils/appError')

// REGISTRAR USUARIO
exports.signup = async(req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
      
        if (user) {
            return next(new creatError('El usuario ya existe!', 400));            
        }
      
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });
        // Generar el token JWT 
        const token = jwt.sign({userId: newUser._id}, 'secret123', { expiresIn: '1h' });

        res.status(201).json({
            status: 'Exitoso!',
            message: 'Usuario registrado exitosamente',
            token
        });
    } catch (error) {
        next(error);    
    }

}

// USUARIO REGISTRADO
exports.login = async(req, res, next) => {}