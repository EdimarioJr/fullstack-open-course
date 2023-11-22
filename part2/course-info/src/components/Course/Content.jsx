import { Part } from "./Part";

export const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} exercise={part.name} total={part.exercises} />
      ))}
    </>
  );
};
