// import { fetchComponents, ComponentItem } from "../utils/fetchData.ts";
// import { useState, useEffect } from "react";
// import Select from "react-select";
//
// export default function SearchBar() {
//   const [components, setComponents] = useState<ComponentItem[]>([]);
//
//   useEffect(() => {
//     fetchComponents().then(setComponents).catch(console.error);
//   }, []);
//
//   return (
//     <>
//       <div className="mb-6">
//         <label
//           htmlFor="search"
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           Search Components
//         </label>
//         <input
//           type="input"
//           id="search"
//           placeholder="Search components name"
//           list="components"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//         />
//         <datalist id="components">
//           {components
//             .filter((c) => c.name) // only items with name
//             .map((c, i) => (
//               <option key={i} value={c.name!} />
//             ))}
//         </datalist>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { fetchComponents } from "../utils/fetchData.ts";
import type { ComponentItem } from "../utils/fetchData.ts";
import Select from "react-select";

export default function SearchBar() {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    fetchComponents().then(setComponents).catch(console.error);
  }, []);

  // Convert to React Select format
  const options = components
    .filter((c) => c.name)
    .map((c) => ({
      value: c.name!,
      label: c.name!, // visible text in dropdown
    }));

  return (
    <div className="mb-6 w-[50%]">
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Search Components
      </label>

      <Select
        inputId="search"
        options={options}
        // Keep the control size stable and ensure long typed text scrolls internally
        onChange={(option) => setSelected(option?.value ?? "")}
        onInputChange={() => {
          // scroll the internal input to the end so the caret stays visible
          const el = document.getElementById(
            "search",
          ) as HTMLInputElement | null;
          if (el) {
            // small timeout to allow the input value to update
            setTimeout(() => {
              try {
                el.scrollLeft = el.scrollWidth;
              } catch (e) {
                // ignore
              }
            }, 0);
          }
        }}
        placeholder="Search components name"
        classNamePrefix="react-select"
        styles={{
          control: (base, state) => ({
            ...base,
            padding: "2px",
            borderRadius: "0.5rem", // rounded-lg
            borderColor: state.isFocused ? "#3b82f6" : "#d1d5db", // blue-500 or gray-300
            boxShadow: state.isFocused
              ? "0 0 0 2px rgba(59,130,246,0.5)"
              : "none", // focus ring
            "&:hover": {
              borderColor: "#3b82f6",
            },
            // Ensure the control doesn't shrink/expand based on content
            width: "100%",
            minWidth: 0,
            boxSizing: "border-box",
            overflow: "hidden",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#2563eb" // blue-600
              : state.isFocused
                ? "#e5e7eb" // gray-200
                : "white",
            color: state.isSelected ? "white" : "#1f2937", // gray-800
            padding: "8px 12px",
            cursor: "pointer",
          }),
          // Prevent the internal input from expanding the control when typing long text
          input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
            minWidth: 0,
            maxWidth: "100%",
            // allow horizontal scrolling inside the input so typing long text
            // doesn't expand the control — we'll programmatically keep the
            // scroll at the end so the caret is visible
            overflowX: "auto",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }),
          valueContainer: (base) => ({
            ...base,
            overflow: "hidden",
            padding: "2px 8px",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#1f2937", // gray-800
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db", // gray-300
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // shadow-lg
            overflow: "hidden",
            zIndex: 50,
          }),
          placeholder: (base) => ({
            ...base,
            color: "#6b7280", // gray-500
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }),
        }}
      />

      <p className="mt-2 text-sm text-gray-600">
        Selected: {selected || "none"}
      </p>
    </div>
  );
}
