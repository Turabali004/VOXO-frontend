import React from 'react'

interface InputProps {
  type?: string;
  value?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean
}

const Input: React.FC<InputProps> = ({ type = 'text', value, onChange, placeholder, className, name,required }) => {
  return (
    <input
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      required={required}
    />
  )
}

export default Input