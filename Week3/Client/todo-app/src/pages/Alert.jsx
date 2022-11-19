import React,{useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Alert = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [alert, setAlert] = useState([]);

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
    
    (async () => (await getAlerts()))();
  }, []);
  return (
    <div>
      <h1>Less than 10 days left!</h1>
      {isAlert && (
        <div>
          {alert.map((a, index) => {
            return (
              <div>
                <h3>{a.item_name}</h3>
                <p>{a.days}</p>
              </div>
            )
          })}
          
        </div>
      )}
    </div>
  )
}

export default Alert