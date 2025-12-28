import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [health, setHealth] = useState<any>(null);

  useEffect(()=>{
    (async ()=>{
      const response = await fetch('/api/health')
      const data = await response.json()
      setHealth(data);
    })()
  }, [])

  return (
    <>
      <h1>Recall</h1>
      <div className="card">
        <p>Server health:</p>
        {health && <pre>{JSON.stringify(health)}</pre>}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
