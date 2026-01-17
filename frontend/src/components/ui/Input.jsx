import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <input
      className="bg-zinc-800 px-3 py-2 block my-2 w-full mb-2 rounded-sm"
      placeholder="Enter your fullname"
      ref={ref}
      {...props}
    />
  );
});

export default Input;
