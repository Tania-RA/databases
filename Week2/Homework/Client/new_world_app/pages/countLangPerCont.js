import { useState,useEffect } from 'react'
import axios from "axios";
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function countLangPerCont() {
  const [result, setResult] = useState([]);
  const [input, setInput] = useState(false);
  const [error, setError] = useState(false);

  useEffect( () => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:4000/api/cities/langInContinents`, {
        withCredentials: true
      });
      setResult(data)
    }
    fetchData()
    
    
  },[])
  console.log(result);
  return (
    <div className={styles.container}>
      <button className={styles.btnSub}><Link href="/">Home</Link></button>
      <div className={styles.capital}>
        <table>
          <thead>
            <tr>
              <th>Continent</th>
              <th>No. Of Languages Spoken</th>
            </tr>
            
          </thead>
          <tbody>
            {
              result.map(result =>
                <tr>
                  <td>{result.Continent}</td>
                  <td>{ result.CountOfLangSpoken}</td>
                </tr>
                )
            }
            
          </tbody>
        </table>
      </div>

      </div>
  )
}

