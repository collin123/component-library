import {React, useState} from "react";
import '../index.css';
import star from '../assets/star.png';

function Card():Element{
  const code:[string, React.Dispatch<React.SetStateAction<string>>]=useState(
    "function Card(){\n" +
    " return(\n" +
    "   <div>\n" +
    "     Text\n" +
    "   </div>\n" +
    " );\n" +
    "}"
  );

  // const copyCode = (e) => {
  //   e.preventDefault();
  //   navigator.clipboard.writeText(code[0]);
  //   alert('Copied to clipboard!');
  // }; TODO fix

  return(
    <div className="bg-gray-800 ">
      <header className="flex border-blue-500 border-2 rounded text-white">
        <div className="flex w-1/2">
          <h1>Test (Component name)</h1>
        </div>
        <div className="bg-blue-500 h-auto w-0.5"></div>
        <div className="flex w-1/2">
          <h1>react .jsx/.tsx (Language)</h1>
          <img src={star} alt="Star" className="w-6 h-6"/>
        </div>
      </header>
      <main className="flex border-2 border-blue-500 rounded text-yellow-300">
        <button
          onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(code[0]);
          alert('Copied to clipboard!');
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm h-8 text-center">
          copy
        </button>
        <pre>{code}</pre>
      </main>
    </div>
  )
}

export default Card;