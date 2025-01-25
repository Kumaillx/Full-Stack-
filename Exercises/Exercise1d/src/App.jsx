import { useState } from 'react'

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    
    return (
    <div>
      <h2>{props.heading}</h2>
      No Feedback Given
    </div>
    
    );
  } 
  
  else {
    return (
      <div>
        <h2>{props.heading}</h2>
        <div>
        good {props.good}
        </div>
        
        <div>
          neutral {props.neutral}
        </div>
        <div>
          bad {props.bad}
        </div>
          <div>
            All {props.all}
          </div>
          <div>
            Average {props.Average}
          </div>
          <div>
            Positivity {props.Positivity}%
          </div>
      </div>      
    );
  };
  }
  

const App = () => {
// save clicks of each button to its own state
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  const all = good + neutral + bad
  const Average = all > 0 ? (good - bad) / all : 0
  const Positivity = all > 0 ? (good / all) * 100 : 0

  const heading = 'Statistics'

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
       
      <Statistics heading={heading} 
          good = {good}
          neutral = {neutral}
          bad = {bad}
          all = {all}
          Average = {Average}
          Positivity = {Positivity}

      />
        
    </div>
  )
}

export default App