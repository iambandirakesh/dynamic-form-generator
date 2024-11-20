import React from "react";
import { useForm } from "react-hook-form";
interface FormDataProps {
  formSchema: Record<string, any>;
}
export const Form: React.FC<FormDataProps> = ({ formSchema }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="w-full md:w-1/2 dark:text-white" data-testid="FormDisplay">
      <h1 className="text-xl font-bold text-center">{formSchema?.formTitle}</h1>
      <p className="mb-4 text-center">{formSchema?.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formSchema?.fields?.map((field: any, idx: number) => {
          return (
            <div key={field?.id} className="flex flex-col">
              <label htmlFor={field?.id} className="mb-1 font-medium">
                {field?.label}
                <span className="text-red-500">{field?.required && "*"}</span>
              </label>
              {field?.type === "text" ||
              field?.type === "email" ||
              field?.type === "password" ||
              field?.type === "number" ? (
                <div>
                  <input
                    id={field?.id}
                    type={field?.type || "text"}
                    placeholder={field?.placeholder}
                    {...register(field.id, {
                      required: field.required
                        ? `${field.label} is required`
                        : false,
                      pattern: field.validation?.pattern
                        ? {
                            value: new RegExp(field.validation.pattern),
                            message: field.validation.message,
                          }
                        : undefined,
                    })}
                    className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-gray-300"
                    data-testid="inputTextArea"
                  />
                  {errors[field.id] && (
                    <p className="text-red-500" data-testid="inputErrorMessage">
                      {errors[field.id]?.message as string}
                    </p>
                  )}
                </div>
              ) : field?.type === "select" ? (
                <div>
                  <select
                    id={field?.id}
                    {...register(field?.id, {
                      required: `${field?.label} is required`,
                    })}
                    className="dark:bg-gray-800 dark:text-gray-300"
                  >
                    <option value="">Select an option</option>
                    {field?.options?.map((val: any, idx: number) => {
                      return (
                        <option key={val?.value} value={val?.value}>
                          {val?.label}
                        </option>
                      );
                    })}
                  </select>
                  {errors[field.id] && (
                    <p className="text-red-500">
                      {errors[field.id]?.message as string}
                    </p>
                  )}
                </div>
              ) : field?.type === "radio" ? (
                <div className="flex flex-wrap">
                  {field?.options?.map((option: any, idx: number) => {
                    return (
                      <div
                        key={option?.value}
                        className="flex items-center mr-4"
                      >
                        <input
                          type="radio"
                          id={option?.value}
                          value={option?.value}
                          {...register(field?.id, {
                            required: `${field?.label} is required`,
                          })}
                        />
                        <label htmlFor={option?.value} className="ml-2">
                          {option?.label}
                        </label>
                      </div>
                    );
                  })}
                  {errors[field.id] && (
                    <p className="text-red-500">
                      {errors[field.id]?.message as string}
                    </p>
                  )}
                </div>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  {...register(field.id)}
                  className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-gray-300"
                />
              ) : field.type === "checkbox" ? (
                <div className="flex flex-wrap">
                  {field?.options?.map((option: any, idx: number) => {
                    return (
                      <div
                        key={option?.value}
                        className="flex items-center mr-4"
                      >
                        <input
                          type="checkbox"
                          id={option?.value}
                          value={option?.value}
                          {...register(field?.id)}
                        />
                        <label htmlFor={option?.value} className="ml-2">
                          {option?.label}
                        </label>
                      </div>
                    );
                  })}
                  {errors[field.id] && (
                    <p className="text-red-500">
                      {errors[field.id]?.message as string}
                    </p>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            Object.keys(formSchema).length === 0 ? "hidden" : ""
          }`}
          data-setid="submitButton"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
