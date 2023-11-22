import { Header } from "./Header";
import { Content } from "./Content";
import { Total } from "./Total";

export const Course = ({ course }) => {
  const total = course.parts.reduce((total, part) => part.exercises + total, 0);
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  );
};
