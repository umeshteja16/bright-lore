import React from "react";
import { CiUser } from "react-icons/ci";
interface EmailInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-3 flex items-center input-box border-1 rounded-lg px-3 focus-within:border-2">
      <CiUser className="text-base sm:text-lg md:text-xl lg:text-2xl" />
      <input
        type="text"
        placeholder="Full Name"
        value={value}
        onChange={onChange}
        className="text-base sm:text-lg md:text-xl w-full p-2 focus:outline-none"
      />
    </div>
  );
};

export default NameInput;
