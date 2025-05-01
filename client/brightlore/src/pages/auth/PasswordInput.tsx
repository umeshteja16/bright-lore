import React from "react";
import { CiLock } from "react-icons/ci";

interface PasswordInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center input-box border-1 rounded-lg px-3 focus-within:border-2">
      <CiLock className="text-base sm:text-lg md:text-xl lg:text-2xl" />
      <input
        type="password"
        placeholder="Password"
        value={value}
        onChange={onChange}
        className="text-base sm:text-lg md:text-xl w-full p-2 focus:outline-none"
      />
    </div>
  );
};

export default PasswordInput;
