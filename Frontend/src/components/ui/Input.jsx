import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Input = forwardRef(({ icon: Icon, ...rest }, ref) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {Icon ? <Icon className="size-5 text-blue-500" /> : null}
      </div>
      <input
        ref={ref}
        className={`${
          Icon ? "pl-10" : "pl-3"
        } border-[1px] border-gray-300 shadow-lg focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-lg px-3 py-3 text-md w-full bg-transparent placeholder:text-gray-800`}
        {...rest}
      />
    </div>
  );
});
export default Input;
