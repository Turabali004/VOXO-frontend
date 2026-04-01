import React, { type MouseEvent } from "react";
interface button {
  svgIcon: React.ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  content: string | number;
  className: string;
}
const Button = ({ svgIcon, onClick, content, className }: button) => {
  return (
    <>
      <button onClick={onClick} className={className}>
        <div className="p-2 rounded-full group-hover:bg-twitter-blue/10 transition-colors">
          {svgIcon}
        </div>
        <span className="text-sm">{content}</span>
      </button>
    </>
  );
};

export default Button;
