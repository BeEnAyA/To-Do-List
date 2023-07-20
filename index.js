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


app.use(express.static(path.join(__dirname+'/public')));

app.use(session({
   secret: 'google-auth',
   resave: false,
   saveUninitialized: true,
   cookie: { maxAge: 86400000 },
 }))
app.use(passport.initialize());
app.use(passport.session());
   
db.sequelize.sync({force:false})
  


app.listen(port,()=>{
   console.log("Server started at: http://localhost:4000") 
})
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
    res.redirect('/todo/all')
});
  
// failure
app.get('/auth/callback/failure' , (req , res) => {
     res.redirect('/');
})

checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next() }
    res.redirect("/")
  }


app.get("/",taskController.googleLogin)
app.post('/todo',checkAuthenticated,taskController.addTask)
app.get('/todo/missed',checkAuthenticated,taskController.showMissedTask)
app.get('/todo/completed',checkAuthenticated,taskController.showCompletedTask)
app.get('/todo/pending',checkAuthenticated,taskController.showPendingTask)
app.get('/todo/complete/:taskId',checkAuthenticated,taskController.completeTask)
app.get('/todo/delete/:taskId',checkAuthenticated,taskController.deleteTask)
app.get('/todo/all',checkAuthenticated,taskController.showAllTask)
app.get('/todo/logout',checkAuthenticated,taskController.googleLogout)