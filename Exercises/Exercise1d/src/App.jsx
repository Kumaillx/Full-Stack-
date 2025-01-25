import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const Average = all > 0 ? (good - bad) / all : 0
  const Positivity = all > 0 ? (good / all) * 100 : 0

  return (
    <div>
      <div><h1> Give Feedback</h1></div>
      
      <button onClick={()=>setGood(good + 1)}>
        Good 
      </button>
      
      <button onClick={()=>setNeutral(neutral + 1)}>
        Neutral 
      </button>
      
      <button onClick={()=>setBad(bad + 1)}>
        Bad 
      </button>
       
    
      <div><h2> Statistics</h2></div>
        
        <div>good {good}</div>
        
        <div>neutral {neutral}</div>
        
        <div>bad {bad}</div>
        
        <div>all {all}</div>
        <div>Average {Average}</div>
        <div>Positivity {Positivity}%</div>
    </div>
  )
}

export default App