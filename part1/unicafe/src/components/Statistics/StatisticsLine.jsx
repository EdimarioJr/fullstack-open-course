export const StatisticsLine = ({ label, value }) => {
  return (
    <tr className="stats-row">
      <td>{label}:</td>
      <td>
        <strong>{value}</strong>
      </td>
    </tr>
  );
};
