import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
//new total state that tells how many clicks we did
  const [total, setTotal] = useState(0)


  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    
    console.log('left before',left)
    
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    
    console.log('left after',left)
    
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);
  };

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>

      <p>total {total}</p>
    </div>
  )
}

export default App
