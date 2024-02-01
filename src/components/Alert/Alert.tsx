import React from "react";

type Props = {
  kind: string;
  title?: string;
  message: string;
  onClose?: () => void;
};

type AlertTheme = {
  [details: string]: string;
};

//TODO: pass styling to css file
const Alert: React.FC<Props> = ({ kind, title, message, onClose }) => {
  if (!kind) return null;

  const alertTheme: AlertTheme = {
    info: "text-blue-700 border-blue-300 bg-blue-100 dark:bg-blue-200 dark:text-blue-800",
    danger: "text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800",
    success: "text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800",
    warning: "text-yellow-700 bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-800",
    dark: "text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
  };

  const closeTheme: AlertTheme = {
    info: "text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300",
    danger: "text-red-500 focus:ring-red-400 hover:bg-red-200 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300",
    success:
      "text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300",
    warning:
      "text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300",
    dark: "text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:bg-gray-200 dark:text-gray-600 dark:hover:bg-gray-300"
  };

  return (
    <div
      className={`fixed
          left-1/2
          self-center
          border-2
          flex
          p-4
          mb-4
          text-sm
          rounded-lg
          transform
          -translate-x-1/2
          top-10
          z-30
          ${alertTheme[kind]}`}
    >
      <svg
        className="inline flex-shrink-0 mr-3 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>

      <div className="mr-32">
        {title && <span className="font-medium pr-2">{title}!</span>}
        {message}
      </div>

      <button
        onClick={() => {
          onClose && onClose();
        }}
        type="button"
        className={`ml-auto
          -mx-1.5
          -my-1.5
          rounded-lg
          focus:ring-2
          p-1.5
          inline-flex
          h-8 w-8
          ${closeTheme[kind]}`}
      >
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
