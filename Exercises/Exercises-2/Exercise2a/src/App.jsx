//Exercise 2a 
import Course from './components/Course'
import React from 'react';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ name, exercises }) => {
  console.log(name,exercises)
  return (
    <p>
      {name}: {exercises} exercises
    </p>  
  );
};

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
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
        <Course key={course.id} course={course} />
    </div>
    

  )
  
}

export default App;
