import "./button.scss";
const Button = ({ children, handleClick, disabled }) => {
  return (
    <button className="button" disabled={disabled} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
