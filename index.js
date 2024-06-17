const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const app = express();


// 1) MIDDLEWARES

app.use(cors());
app.use(express.json());

// 2) ROUTE
app.use('/api/auth', authRouter);



// 3) MONGO CONNECTION 
mongoose.connect('mongodb://127.0.0.1:27017/authentication')
    .then(() => console.log('Conectado a MongoDB!'))
    .catch((error) => console.error('Fallo a conectar con MongoDB: ', error));

// 4) GLOBAL ERROR HANDLER  

app.use((err, req, res, next) => {
    err.statuCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});


// 5) SERVER  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
});