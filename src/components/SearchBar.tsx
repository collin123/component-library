// import { useState } from "react";
// import data from "../../public/db.json";
// import languages from "../utils/info.ts";
//
// type ComponentItem = {
//   name?: string;
//   category?: string;
//   language?: string | null;
//   "file-extension"?: string;
//   description?: string;
//   code?: string;
// };
//
// export default function SearchBar() {
//   return (
//     <>
//       <div>
//         <input type="text" placeholder="Componenet name" />
//       </div>
//     </>
//   );
// }

export default function SearchBar() {
  return (
    <>
      <div className="mb-6">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Search Components
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
    </>
  );
}
