import "./index.css";

const FormInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  style,
  error,
}) => {
  const formStyle =
    style === "full" ? "formInput formInput-full" : "formInput formInput-half";

  return (
    <>
      <input
        className={formStyle}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {error && <span className="error-message">{error}</span>}
    </>
  );
};

export default FormInput;
