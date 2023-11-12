import { Part } from "./Part";

export const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} exercise={part.name} total={part.exercises} />
      ))}
    </>
  );
};
