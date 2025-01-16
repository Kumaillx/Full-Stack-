import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

// The syntax '...clicks' is the spread operator. 
// It is used here to create a shallow copy of the clicks object.
//We can update state directly but its not a good practise
//one should make a copy first to update the values
const handleLeftClick = () =>
  setClicks({ ...clicks, left: clicks.left + 1 })

const handleRightClick = () =>
  setClicks({ ...clicks, right: clicks.right + 1 })

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}

export default App
