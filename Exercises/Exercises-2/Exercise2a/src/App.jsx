//Exercise 2a 
import Course from './components/Course'
import React from 'react';

const App = () => {
  const course = [
  {
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
// Second Course 
{
  name: 'Node.js',
  id: 2,
  parts: [
    {
      name: 'Routing',
      exercises: 3,
      id: 1
    },
    {
      name: 'Middlewares',
      exercises: 7,
      id: 2
    }
  ]
}
]
// Here we use Id of each course to tell the computer which one to choose.
  return (
  <div>
  {course.map(course=> (
    <Course key={course.id} course={course}/>
    ))}

  </div>
);
  
  // return <Course key={course.id} course={course} />
  
};

export default App;
