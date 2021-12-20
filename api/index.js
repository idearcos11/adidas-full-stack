const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); // Esta libreria permite hacer http requests desde servidores distintos al propio de la app. 
const inventarioRoute = require('./routes/inventario');
const produccionRoute = require('./routes/produccion');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");



dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(session({
        secret:process.env.SECRET,
        resave: false,
        saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Conectado a la base de datos'))
        .catch(err => console.log(err)
);


const userSchema = new mongoose.Schema(
        {
                username: String,
                password: String,
                role: String,
        }
);

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema)
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.post("/api/auth/registro", function(req, res){

        User.register({username: req.body.username, role: req.body.role}, req.body.password, function(err, user){
                if (err) {
                        res.status(500).json(err);
                } else {
                        res.status(200).json(user);
                }
        });
      
});

app.post("/api/auth/login", function(req, res){

        const user = new User({
          username: req.body.username,
          password: req.body.password
        });

        
            
        req.login(user, function(err){
        if (err) {
                res.status(500).json(err);
        } else {
                passport.authenticate("local")(req, res, function(){
                res.status(200).json(req.user);
        });
        }
        });
      
});


app.get('/logout', (req, res) => {
        req.logout();
})


app.use('/api/inventario', inventarioRoute)
app.use('/api/produccion', produccionRoute)




app.listen(process.env.PORT || 5000, () => console.log(`Backend corriendo en el puerto ${process.env.PORT}`));

module.exports = User;

