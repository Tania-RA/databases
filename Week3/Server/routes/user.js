require('dotenv').config();

const express = require("express");
const router = express.Router();
const connection = require("../connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post('/addUser', async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  if (!email || !pass) {
    return res.status(500).json("Please enter email and password." );
  } else {
    connection.query("SELECT email FROM users WHERE email=?", [email], async (err, result) => {
      if (err) throw err;
      if (result[0]) return res.status(500).json("This Email already Exists!!" )
      else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt);
        
        connection.query("INSERT INTO users SET ?", { email: email, password: hash }, (error, data) => {
          if (error) throw error;
          return res.status(200).json("User registered successfully!" );
        })
      }
    })
  }
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(500).json( "Please enter email and password." );
  } else {
    connection.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
      if (err) throw err;
      
      if(result.length===0) return res.status(500).json( "User does not exist." );
      
      
      const isPassCorrect = await bcrypt.compare(password,result[0].password);
      
      if (!isPassCorrect) return res.status(400).json("Wrong Email or Password! Please check again!" );

      else {
        const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES
          
        })
        const cookieOptions = {
          expiresIn: new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
          httpOnly: true
        }
        res.cookie("user_access", token, cookieOptions);
        return res.status(200).json(result);
      }
    })
  }
})

router.post('/logout', async (req, res) => {
  res.clearCookie("user_access", {
    sameSite: "none",
    secure: true
  });
  return res.status(200).json("User logged out successfully" );
})

module.exports = router;