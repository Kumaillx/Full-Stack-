const Hello = (props) => {
  console.log(Hello)
    return (
      <div>
      <p> Hello {props.name}, You are {props.age} years old </p>
      </div>
    )
}

const App = () => {

  const name = 'Yousuf'
  const age = 23

  return(

    <div>
      <h1> Greetings</h1>
        <Hello name='Kumail' age ={10+12} />
        <Hello name={name} age = {age} />
        
    </div>
  )
}

export default App