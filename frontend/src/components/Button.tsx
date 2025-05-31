import React from 'react';

interface ButtonProps {
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({label, onClick}: ButtonProps) {
    return <button onClick={onClick} type="button" className="w-full mt-4  py-2.5 px-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-stone-700 focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-300">{label}</button>
}