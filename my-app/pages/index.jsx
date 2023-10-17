import Head from 'next/head'
import { useState } from 'react'

//Export and render the home page
export default function Home() {

  const [count, setCounter] = useState(0); //Setup a state

  const [animalInput, setAnimalInput] = useState("");

  async function onSubmit(e) {
    
    try {
      e.preventDefault()
      
      if(count == 10) {
        return console.log('You have reached your limit')
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({animal: animalInput})
      });

      const data = await response.json();
      if(response.status !== 200) {
        throw data.error || new Error('Request failed with status ${response.status}');
      }

      setCounter(count + 1)
      setAnimalInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <>
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main >
          <img src='/favicon.ico' />
          <h3>Name my pet</h3>
          <p>You've used this app {count} times</p>
          <form onSubmit={onSubmit}>
            <input
            type= 'text'
            name= 'animal'
            value={animalInput}
            onChange={(e) => {
              setAnimalInput(e.target.value)
              console.log(animalInput)
            }
          }
            placeholder= 'Enter an animal' 
            />
            <input type="submit"
            value="Generate names" 
            />
          </form>
        </main>
      </div>
    </>
  )
}
