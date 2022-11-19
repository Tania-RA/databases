import React,{useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const id= localStorage.getItem("uid");
  const handleChange = (e) => {
    setCategory(e.target.value);
  }

  const addTodo = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/category/addCategory", { categoryName: category, userId: id }, { withCredentials: true }).then((res) => {
        console.log(res);
      });
      
    } catch (err) {
      setError(err.response.data);
    }
  }

  const getData = async () => {
    const id = localStorage.getItem("uid");
    
    await axios.get(`http://localhost:4000/api/category/categories/${id}`).then((res) => {
      //console.log(res.data);
      setCategories(res.data);
    })
  }

  useEffect(() => {
    (async () => (await getData()))();
  }, []);
  
  return (
    <div>
      <h1>Your ToDo's</h1>
      <input type="text" name='category' placeholder='ToDo Category' onChange={handleChange}/>
      <button onClick={addTodo}>Add Category</button>
      {categories.map((cat, index) => {
        return (
          <Link to={`/${cat.category_id}`} key={index}>
            <div >
              <h1>{cat.category_name}</h1>
              <button>Delete</button>
            </div>
          </Link>
          
        )
      })}
    </div>
  )
}

export default Dashboard