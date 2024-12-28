const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now,a+b)  
  return (

    <div>
      <p> Hey this is my demo Vite File {now.toString()}</p>
      <p>Name is Kumail</p>

      <p>
        {a} plus {b} is {a+b}
      </p>

    </div>
  )


}

export default App