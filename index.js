const express=require('express')
const app=express()
const port=process.env.PORT|4000
const path=require('path')
const db=require('./model/dbConnection')
const passport=require('passport')
require('dotenv').config()
require('ejs')
const session=require('express-session')
require('./services/passportConfig')
const taskController=require('./controller/taskController')
const moment=require('moment')


app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.locals.moment=moment

app.get("/",taskController.showAllTask)
app.post('/todo',taskController.addTask)
app.get('/todo/missed',taskController.showMissedTask)
app.get('/todo/completed',taskController.showCompletedTask)
app.get('/todo/pending',taskController.showPendingTask)
app.get('/todo/complete/:taskId',taskController.completeTask)
app.get('/todo/delete/:taskId',taskController.deleteTask)
  
app.use(session({
   secret: 'google-auth',
   resave: false,
   saveUninitialized: false,
 }))
app.use(passport.initialize());
app.use(passport.session());
   
db.sequelize.sync({force:false})
  
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
    res.render('some')
    console.log(req.user)
});
  
// failure
app.get('/auth/callback/failure' , (req , res) => {
    res.send("Error");
})



app.listen(port,()=>{
   console.log("Server started at: http://localhost:4000") 
})