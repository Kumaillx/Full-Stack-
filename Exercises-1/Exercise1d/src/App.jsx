import { useState } from 'react'


const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => (
  <div>
    <table>
      <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
       </tr>
      </tbody>
    </table>
      
  
  </div>
  );

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h2>{props.heading}</h2>
        No Feedback Given
      </div>
    );
  } else {
    return (
      <div>
        <h2>{props.heading}</h2>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="All" value={props.all} />
        <StatisticLine text="Average" value={props.Average} />
        <StatisticLine text="Positivity" value={props.Positivity + '%'} />
      </div>
    );
  }
};


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const Average = all > 0 ? (good - bad) / all : 0;
  const Positivity = all > 0 ? (good / all) * 100 : 0;

  const heading = 'Statistics';

  return (
    <div>
      <div><h1>Give Feedback</h1></div>

      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      <Statistics
        heading={heading}
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        Average={Average}
        Positivity={Positivity}
      />
    </div>
  );
}


export default App