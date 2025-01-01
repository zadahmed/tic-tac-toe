import React from 'react';

const Square = ({ value, onClick }) => (
  <button
    className="w-20 h-20 bg-white border border-gray-300 text-3xl font-bold flex justify-center items-center transition-transform transform hover:scale-110 focus:outline-none"
    onClick={onClick}
  >
    {value}
  </button>
);

export default Square;