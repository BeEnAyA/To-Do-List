const db=require('../model/dbConnection')
const User=db.users
const bcrypt=require('bcrypt')

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
  
passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser((user, done) =>{
    done(null, user);
});
  
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID, // Your Credentials here.
    clientSecret:process.env.GOOGLE_CLIENT_SECRET, // Your Credentials here.
    callbackURL:"http://localhost:4000/auth/callback",
    passReqToCallback:true
  },
  async (req, accessToken, refreshToken, profile, done)=> {
      return done(null,profile)
  }))

