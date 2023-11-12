import { useState } from "react";

import "./App.css";
import { Statistics } from "./components/Statistics";
import { Button } from "./components/Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
  };

  const totalVotes = good + bad + neutral;

  const average = ((good - bad) / 3).toFixed(2);

  const positivePercentage =
    totalVotes > 0 ? ((good / totalVotes) * 100).toFixed(2) : 0;

  return (
    <main className="flex-column gap-lg">
      <section className="flex-column align-start gap-md">
        <h1>Give feedback</h1>
        <div className="flex-row gap-sm">
          <button className="good-button" onClick={handleClickGood}>
            Good
          </button>
          <Button className="neutral-button" onClick={handleClickNeutral}>
            Neutral
          </Button>
          <Button className="bad-button" onClick={handleClickBad}>
            Bad
          </Button>
        </div>
      </section>
      <section className="flex-column gap-md align-start">
        <h2>Statistics</h2>
        {totalVotes > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            all={totalVotes}
            average={average}
            positivePercentage={`${positivePercentage}%`}
          />
        ) : (
          <h2>No feedback given.</h2>
        )}
      </section>
    </main>
  );
};

export default App;
