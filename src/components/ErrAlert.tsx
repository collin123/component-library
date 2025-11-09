import React, { useState } from "react";

interface ComponentCardProps {
  title: string;
  description: string;
  tags?: string[];
}

const ErrAlert: React.FC<ComponentCardProps> = ({
  title,
  description,
  tags,
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-red-300 dark:bg-gray-800 rounded-lg shadow-md p-6 w-96 flex flex-col items-center transition-shadow duration-300">
        <div className="p-1 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
          {tags && (
            <div className="flex flex-wrap gap-2 justify-center">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setVisible(false)}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrAlert;
