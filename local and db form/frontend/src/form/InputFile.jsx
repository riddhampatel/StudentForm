export function InputFile({
  name,
  label,
  fgroupClass,
  error,
  multiple,
  className,
  ...props
}) {
  return (
    <div className={`mb-3 ${fgroupClass || ""}`}>
      {label && (
        <label htmlFor={props.id || name} className="form-label">
          {label}
        </label>
      )}
      <input
        type="file"
        name={multiple ? `${name}[]` : name}
        id={props.id || name}
        className={`form-control ${error ? "is-invalid" : ""} ${className || ""}`.trim()}
        multiple={multiple}
        {...props}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default InputFile;
