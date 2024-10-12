/* eslint-disable react/display-name */
import { forwardRef } from "react";

const Textarea = forwardRef(({ ...rest }, ref) => {
  return (
    <textarea
      ref={ref}
      className="border-[1px] border-gray-300 shadow-md focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-lg px-3 py-3 text-md w-full bg-transparent placeholder:text-gray-800"
      rows={3}
      {...rest}
    />
  );
});

export default Textarea;
