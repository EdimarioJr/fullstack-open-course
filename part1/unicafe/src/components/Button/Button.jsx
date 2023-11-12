export const Button = ({ children, onClick, ...rest }) => {
  return (
    <button className="good-button" onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
