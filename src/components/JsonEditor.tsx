import React, { useState, useCallback, useEffect } from "react";

interface JSONValidatorProps {
  onChange?: (value: string, isValid: boolean) => void;
  initialValue?: string;
}

export const JsonEditor: React.FC<JSONValidatorProps> = ({
  onChange,
  initialValue = "",
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  const validateJSON = useCallback((input: string): boolean => {
    if (!input.trim()) {
      setError("JSON cannot be empty");
      return false;
    }

    try {
      JSON.parse(input);
      setError(null);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        const match = e.message.match(/at position (\d+)/);
        if (match) {
          const position = parseInt(match[1], 10);
          setCursorPosition(position);
          setError(`Invalid JSON: ${e.message}`);
        } else {
          setError(`Invalid JSON: ${e.message}`);
        }
      }
      return false;
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const isValid = validateJSON(value);
      onChange?.(value, isValid);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value, validateJSON]);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setValue(event.target.value);
  };

  const formatJSON = (): void => {
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      setValue(formatted);
      validateJSON(formatted);
    } catch (e) {
      // If formatting fails, keep the current value
    }
  };

  return (
    <div className="w-full md:w-1/2 h-[80vh] dark:bg-gray-900">
      <textarea
        rows={8}
        value={value}
        onChange={handleChange}
        placeholder="Enter JSON here..."
        spellCheck={false}
        className={`
          w-full p-3 h-[85%]
          font-mono text-sm 
          border rounded-md 
          focus:outline-none focus:ring-2 
          transition-colors duration-200
          dark:bg-gray-800 dark:text-gray-300
          ${
            error
              ? "border-red-500 bg-red-50 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
          }
        `}
        onKeyDown={(e): void => {
          if (e.key === "Tab") {
            e.preventDefault();
            const target = e.target as HTMLTextAreaElement;
            const start = target.selectionStart;
            const end = target.selectionEnd;
            setValue(value.substring(0, start) + "  " + value.substring(end));

            setTimeout(() => {
              target.setSelectionRange(start + 2, start + 2);
            }, 0);
          }
        }}
      />

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-700 rounded-md dark:bg-gray-900">
          <p className="text-sm text-red-600">
            {error}
            {cursorPosition !== null && (
              <span className="ml-1">(at position {cursorPosition})</span>
            )}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={formatJSON}
        className="
          mt-2 text-sm text-gray-600 
          hover:text-gray-900 hover:underline 
          cursor-pointer transition-colors duration-200
          dark:text-gray-300 dark:hover:text-gray-100
        "
      >
        Click to format JSON
      </button>
    </div>
  );
};
