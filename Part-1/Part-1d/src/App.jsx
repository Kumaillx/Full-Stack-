import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  //arrays
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])
//in allClicks useState is initialized as an epmty array that stores everyclick

//initially the allClicks array is empty when we click left or right button
// We simply add Letter L or R into the empty array 
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

//(allClicks.concat('L') 
//Combines two or more arrays. 
//This method returns a new array without modifying any existing arrays.

//Example:
// const array1 = [1, 2, 3];
// const array2 = [4, 5, 6];
// const result = array1.concat(array2);
// console.log(result); // Output: [1, 2, 3, 4, 5, 6]


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

// We could have also used the push method instead but here we use the concat methods
// Due to its property of merging arrays and values at the same time.
// The React component such as APP should be mutated directly


  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}

      <p>{allClicks.join(' ')}</p>
    </div>
  )
}
//{allClicks.join(' ')}
//Adds all the elements of an array into a string,
export default App

// The main issue why we use concat instead of push is mutation
// because it modifies the current array directly which is discouraged in React
// You must make a copy or an instance and save inside those to take care of issues manually