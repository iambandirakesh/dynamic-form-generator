import { useState, useEffect } from "react";
import { Form } from "./components/Form";
import { JsonEditor } from "./components/JsonEditor";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("color-theme") === "dark" ||
      (!localStorage.getItem("color-theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const [value, setValue] = useState<Record<string, any>>({});
  const onChange = (value: string, isValid: boolean) => {
    if (isValid) {
      setValue(JSON.parse(value));
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!localStorage.getItem("color-theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className=" p-4 w-full min-h-[100vh] h-[100%] bg-gray-100 dark:bg-gray-900">
      <div>
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
        >
          {darkMode ? (
            <svg
              className="w-5 h-5 text-gray-100"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </button>
        <div
          className="w-full text-center text-lg font-semibold dark:text-gray-300"
          data-testid="mainHeader"
        >
          Dynamic Form Generator
        </div>
      </div>
      <div className="p-4 w-full bg-gray-100 flex flex-col gap-20 md:flex-row dark:bg-gray-900">
        <JsonEditor onChange={onChange} />
        <Form formSchema={value} />
      </div>
    </div>
  );
}
