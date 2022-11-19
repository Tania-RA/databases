import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@material-ui/core';
import axios from 'axios';

const Items = () => {
  const params = useParams();
  const catId=params.catId;

  const [itemName,setItemName] = useState("");
  const [tag, setTag] = useState("");
  const [rem, setRem] = useState("");
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setTag(e.target.value);
  }
  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/api/item/addItem/${catId}`, { itemName,tag,rem }).then((res) => {
        console.log(res);
      });
      
    } catch (err) {
      console.log(err.response.data);
    }
    
  }

  const getData = async () => {
    const id = localStorage.getItem("uid");
    
    await axios.get(`http://localhost:4000/api/item/items/${catId}`).then((res) => {
      //console.log(res.data);
      setItems(res.data);
    })
  }

  useEffect(() => {
    (async () => (await getData()))();
  });

  const handleClick = async(e) => {
    const id = (e.target.value);
    
    await axios.post(`http://localhost:4000/api/category/delete/${id}`).then((res) => { 
      console.log(res.data);
    })

  }
  
  return (
    <div>
      <h1>Add Item</h1>
      <form>
        <input type="text" name='itemName' placeholder='Todo Item' onChange={(e) => setItemName(e.target.value)} />
        <br />
        <FormControl>
          <Select value={tag} onChange={handleChange}>
            <MenuItem value={"imp"}>Important</MenuItem>
            <MenuItem value={"less_imp"}>Less Important</MenuItem>
            <MenuItem value={"can_be_done_later"}>Can Be Done Later</MenuItem>
          </Select>
          <FormHelperText>Select a Tag</FormHelperText>
        </FormControl>
        <br />
        <input type="date" min="2022-11-01" onChange={(e)=>setRem(e.target.value)}/>
        <FormHelperText>Date</FormHelperText>
        <button type="submit" onClick={addTodo}>Add Todo</button>
      </form>
      <br />
      <hr />
      <h1>Items in List</h1>
      <hr />
      {items.map((item, index) => {
        return (
          <div key={index}>
            <h2>{item.item_name}</h2>
            <p>{item.tagged}</p>
            <p>{item.reminder}</p>
            <button value={item.item_id} onClick={handleClick}>Delete Todo</button>
          </div>
        )
      })}
    </div>
  )
}

export default Items