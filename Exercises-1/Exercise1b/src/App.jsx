
//Exercise 1b 
//Course Information Step 3
//func (props) (store value course ki through (parameter))
//func Content (parameter) (store value part 1, part 2, part3)
import React from 'react';

//Header is a component called in app
// it is given a parameter course
//saved the values of course
//course goes to app components and checks for value of course
//since there are multiple entities of course which one to select
//so in app component we it to run header with a value of course.name
const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

//It passes 2 parameters name and exercises 
//it sets a paragraph for the name and exercises for content component
const Part = ({ name, exercises }) => {
  console.log(name,exercises)
  return (
    <p>
      {name}: {exercises} exercises
    </p>  
  );
};

//It has been passed the course parameter present in the app component
//then we ask it to map the course component with respect to part and index
//we then run the part function from the course to give us the name and exercises
const Content = ({ course }) => {
  console.log (course)
  
  return (
    <div>
      {course.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  const total = course.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Total exercises: {total}</p>;
};

  const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }
  
    return (
      <div>
        <Header course={course.name}/>
        <Content course={course.parts}/>
        <Total course={course.parts}/>
        
      </div>
    )
  }

export default App;
