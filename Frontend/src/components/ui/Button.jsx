const Button = ({ children, className, width = "w-full", ...rest }) => {
  return (
    <button className={`${className} ${width} rounded-md text-white `} {...rest}>
      {children}
    </button>
  );
};

export default Button;
