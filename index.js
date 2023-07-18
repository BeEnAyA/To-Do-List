const express=require('express')
const app=express()
const port=process.env.PORT|4000
const path=require('path')
const passport=require('passport')
require('dotenv').config()
require('ejs')
const session=require('express-session')
require('./services/passportConfig')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/",(req,res)=>{
   res.render('index')
})
  
app.use(session({
   secret: 'google-auth',
   resave: false,
   saveUninitialized: false,
 }))
app.use(passport.initialize());
app.use(passport.session());
    
  
// Auth 
app.get('/auth', passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
}));
  
// Auth Callback
app.get( '/auth/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
}));
  
// Success 
app.get('/auth/callback/success' , (req , res) => {
    if(!req.user)
        res.redirect('/auth/callback/failure');
    res.send("Welcome " + req.user.email);
    console.log(req.user)
});
  
// failure
app.get('/auth/callback/failure' , (req , res) => {
    res.send("Error");
})

app.listen(port,()=>{
   console.log("Server started at: http://localhost:4000") 
})