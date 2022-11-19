import React,{useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alert, setAlert] = useState([]);
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

  const getAlerts = async () => { 
    await axios.get(`http://localhost:4000/api/category/alert`).then((res) => {
      console.log(res.data);
      if (res.data.length > 0) {

        setIsAlert(true);
        setAlert(res.data);
      }
    })
  }

  useEffect(() => {
    (async () => (await getData()))();
    (async () => (await getAlerts()))();
  }, []);

  

  const handleClick = async(e) => {
    const id = (e.target.value);
    
    await axios.post(`http://localhost:4000/api/category/delete/${id}`).then((res) => { 
      console.log(res.data);
    })

  }
  
  return (
    <div>
      <h1>Your ToDo's</h1>
      <input type="text" name='category' placeholder='ToDo Category' onChange={handleChange}/>
      <button onClick={addTodo}>Add Category</button>
      {categories.map((cat, index) => {
        return (
          <div key={index}>
            <Link to={`/${cat.category_id}`} >
              <h1>{cat.category_name}</h1>
            </Link>
            <button value={cat.category_id} onClick={handleClick}>Delete</button>
            {isAlert && (
              
              <div>
                {alert.map((a, index) => {
                  if (a.category_id === cat.category_id) {
                    return (
                      <Link to={`/alert/${cat.category_id}`}>Alert</Link>
                    )
                  }
                  return null;
                })}
                
              </div>
            )}
          </div>
          
        )
      })}
      
    </div>
  )
}

export default Dashboard