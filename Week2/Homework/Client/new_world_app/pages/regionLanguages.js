import { useState } from 'react'
import axios from "axios";
import styles from '../styles/Home.module.css'
import Link from 'next/link'
export default function regionLanguages() {
  const [region, setRegion] = useState("");
  const [result, setResult] = useState([]);
  const [input, setInput] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setRegion(e.target.value);
    setInput(false);
    setError(false);
    setResult([]);
  }
  const handleSubmit = async (e) => {
    if (region.length > 0) {
      setInput(true)
    } else {
      setInput(false);
      setError(false);
    }
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:4000/api/cities/regionLanguages`, {
        region
      }, {
        withCredentials: true
      });
      if (data.length > 0) {
        setError(false)
        if (data.length > 0) {
          setResult(data);
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

  const listLang = (list) => {
    return list.map(lang => <li>{lang.Language}</li>)
  }
  return (
    <div className={styles.container}>
      <button className={styles.btnSub}><Link href="/">Home</Link></button>
      <div className={styles.capital}>
        
        <form className={styles.formContainer}>
          <h1>Find the Languages</h1>
          <label for="region">Enter the region: </label>
          <input type="text" id="region" name="region" placeholder='region' value={region} onChange={ handleChange} required/>
          <br />
          <button className={styles.btnSub} onClick={handleSubmit}>Submit</button>
        </form>

        <div>
          {input && !error &&
            <div>
              <p>
                The list of Languages spoken in {region} are: 
                <ul>
                  {listLang(result)}
                </ul>
                
              </p>
            </div>
          }
          {error && <p>
            Cannot find Languages of {region}
          </p>}
          
          
        </div>

      </div>
      
    </div>
  )
}

