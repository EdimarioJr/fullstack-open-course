import { StatisticsLine } from "./StatisticsLine";

export const Statistics = ({
  good,
  neutral,
  bad,
  average,
  all,
  positivePercentage,
}) => {
  return (
    <table>
      <tbody>
        <StatisticsLine label="Good" value={good} />
        <StatisticsLine label="Neutral" value={neutral} />
        <StatisticsLine label="Bad" value={bad} />
        <StatisticsLine label="All" value={all} />
        <StatisticsLine label="Average" value={average} />
        <StatisticsLine label="Positive" value={positivePercentage} />
      </tbody>
    </table>
  );
};
