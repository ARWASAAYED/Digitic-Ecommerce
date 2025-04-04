import React from "react";

const CustomInput = ({
  type,
  name,
  placeholder,
  id,
  val,
  onCh,
  className = "form-control",
}) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={className}
        id={id}
        value={val}
        onChange={onCh}
      />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  );
};

export default CustomInput;