import { useState } from 'react'

//An event handler should always be either a function or a function reference

const App = () => {
  const [ counter, setCounter ] = useState(0)


  const increaseByOne = () => setCounter(counter + 1)
  
  const setToZero = () => setCounter(0)

  return (
    <div>
      <div>{counter}</div>

      <button onClick={increaseByOne}>
        plus
      </button>

      <button onClick={setToZero}>
        zero
      </button>
    </div>
  )
}
//he value of the onClick attribute is a variable containing 
// a reference to a function
export default App