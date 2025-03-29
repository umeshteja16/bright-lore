import React from "react";
import { CiMail } from "react-icons/ci";
interface EmailInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-3 flex items-center input-box border-1 rounded-lg px-3 focus-within:border-2">
      <CiMail className="text-base sm:text-lg md:text-xl lg:text-2xl" />
      <input
        type="text"
        placeholder="Email Address"
        value={value}
        onChange={onChange}
        className="text-base sm:text-lg md:text-xl w-full p-2 focus:outline-none"
      />
    </div>
  );
};

export default EmailInput;
