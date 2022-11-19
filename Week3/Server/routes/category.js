require('dotenv').config();

const express = require("express");
const router = express.Router();
const connection = require("../connect");
const jwt= require("jsonwebtoken");

router.post("/addCategory", async (req, res) => {
  
  const token = req.cookies.user_access;
  const categoryName = req.body.categoryName;
  const uid = req.body.userId;
  if (!token) return res.status(401).json("Not authorized");
  
  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid!");
    console.log(userInfo);
    connection.query("INSERT into category SET ?", { category_name: categoryName, user_id: uid }, (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Category has been created!")
    })
  })

  
  

});

router.get('/categories/:id', async (req, res) => { 
  const uid = req.params.id;
  connection.query("SELECT * FROM category WHERE user_id = ?", [uid], async (err, data) => { 
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
});



module.exports=router;