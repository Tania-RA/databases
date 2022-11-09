import { useState } from 'react'
import axios from "axios";
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function cityWithLang() {
  const [lang, setLang] = useState("");
  const [count, setCount] = useState(null);
  const [input, setInput] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setLang(e.target.value);
    setInput(false);
    setError(false);
  }
  const handleSubmit = async (e) => {
    if (lang.length > 0) {
      setInput(true)
    } else {
      setInput(false);
      setError(false);
    }
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:4000/api/cities/countOfCities`, {
        lang
      }, {
        withCredentials: true
      });
      if (data.length > 0) {
        
        setCount(data[0].Count)
        console.log(count);
        setError(false)
        
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
        
        <form className={styles.formContainer}>
          <h1>Find the Count</h1>
          <label for="lang">Enter the lang: </label>
          <input type="text" id="lang" name="lang" placeholder='lang' value={lang} onChange={ handleChange} required/>
          <br />
          <button className={styles.btnSub} onClick={handleSubmit}>Submit</button>
        </form>

        <div>
          {input && !error && <p>
            {count} Cities speak {lang}.
          </p>
          }
          {error && <p>
            Cannot find count of {lang}!
          </p>}
          
          
        </div>

      </div>
      
    </div>
  )
}

