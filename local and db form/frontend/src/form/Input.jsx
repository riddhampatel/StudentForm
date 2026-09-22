import { forwardRef } from "react";

export const Input = forwardRef(function Input(
  { name, label, igroupSize, fgroupClass, error, hint, className, ...props },
  ref
) {
  const sizeClass = igroupSize ? `form-control-${igroupSize}` : "";

  return (
    <div className={`mb-3 ${fgroupClass || ""}`}>
      {label && (
        <label htmlFor={props.id || name} className="form-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        name={name}
        id={props.id || name}
        className={`form-control ${sizeClass} ${error ? "is-invalid" : ""} ${className || ""}`.trim()}
        {...props}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {hint && <small className="form-text text-muted">{hint}</small>}
    </div>
  );
});

export default Input;
