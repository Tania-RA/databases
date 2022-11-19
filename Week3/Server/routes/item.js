require('dotenv').config();

const express = require("express");
const router = express.Router();
const connection = require("../connect");
const jwt = require("jsonwebtoken");

router.post('/addItem/:catId', async (req, res) => {
  const catId = req.params.catId;
  const item_name = req.body.itemName;
  const tag = req.body.tag;
  const rem = req.body.rem;
  console.log(catId, item_name, tag, rem);
  
  connection.query(`INSERT INTO item (item_name, tagged, reminder, category_id) VALUES (?, ?, ?, ?)`, [item_name, tag, rem, catId ], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data)
  })
});

router.get('/items/:catId', async (req, res) => {
  const catId = req.params.catId;
  connection.query("SELECT * FROM item WHERE category_id = ?", [catId], async (err, data) => { 
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
})

module.exports= router;