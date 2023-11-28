export const NotificationMessage = ({ message, className = "error" }) => {
  if (message === null) {
    return null;
  }

  return <div className={className}>{message}</div>;
};
