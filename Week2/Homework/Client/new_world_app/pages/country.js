import { useState } from 'react'
import axios from "axios";
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function country() {
  const [country, setCountry] = useState("");
  const [capital, setCapital] = useState("");
  const [input, setInput] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setCountry(e.target.value);
    setInput(false);
    setError(false);
  }
  const handleSubmit = async (e) => {
    if (country.length > 0) {
      setInput(true)
    } else {
      setInput(false);
      setError(false);
    }
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:4000/api/cities`, {
        country
      }, {
        withCredentials: true
      });
      if (data.length > 0) {
        setError(false)
        if (data[0].Capital.length > 0) {
          setCapital(data[0].Capital)
        }
        
      } else {
        setError(true);
      }
      //dispatch the payload data to action type LOGIN
    } catch (error) {
      //alert(error.response.data);
      console.log(error);
      
    }
  }
  return (
    <div className={styles.container}>
      <button className={styles.btnSub}><Link href="/">Home</Link></button>
      <div className={styles.capital}>
        
        <h1>STILL WORKING ON THIS ONE!</h1>

      </div>
      
    </div>
  )
}

