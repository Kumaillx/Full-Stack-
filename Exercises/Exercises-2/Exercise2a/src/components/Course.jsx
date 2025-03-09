const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total course={course.parts} />
      
    </div>
  );
};

const Header = ({ name }) => {
  return <h1>{name}</h1>
};

const Content = ({ parts }) => {
  return (
  <div>
    {parts.map(part => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
  );
};

const Part = ({ name, exercises}) => {
  return (
    <div>
      <p>{name} {exercises} </p>
    </div>
    
  );
};


const Total = ({ course }) => {
  const total = course.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Total of {total} exercises </p>;
};



export default Course;


