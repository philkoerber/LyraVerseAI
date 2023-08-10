import React from "react";

function Title({ title, handleTitleChange }) {
  return (
    <div className="flex justify-center items-center text-4xl font-extrabold">
      <input
        defaultValue={title}
        onBlur={(e) => {
          handleTitleChange(title, e.target.value);
        }}
        type="text"
        id={`input-${title}`}
        autoComplete="off"
        className="w-full bg-transparent text-center"
      />
    </div>
  );
}

export default Title;
