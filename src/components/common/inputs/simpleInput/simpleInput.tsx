"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SimpleInputProps } from "@/lib/types/formProps";
import { Controller } from "react-hook-form";

const SimpleInput = ({
  control,
  name,
  type = "text",
  extraClassname = "",
  id,
  placeholder,
  max = 30,
  min = 1,
  disabled = false,
  readonly = false,
  required = false,
  pattern,
  autoFocus = false,
  autoComplete = "off",
  onChange,
  onPaste,
  onKeyDown,
  onKeyUp,
  onBlur,
  label,
  errorMessage = "",
  onFocus,
}: SimpleInputProps) => {
  return (
    <Controller
      control={control}
      defaultValue={""}
      name={name}
      render={({ field }) => (
        <div className={`${errorMessage ? "mb-8" : "mb-4"} space-y-2`}>
          {label && (
            <Label htmlFor={id}>
              {label}
              {required && <span className="text-red-500 text-xs ml-1">*</span>}
            </Label>
          )}
          <Input
            type={type}
            name={name}
            id={id}
            className={`${extraClassname}`}
            placeholder={placeholder}
            value={field?.value}
            max={max}
            min={min}
            disabled={disabled}
            required={required}
            readOnly={readonly}
            pattern={pattern}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            onChange={(e) => {
              field?.onChange(e);
              onChange && onChange(e);
            }}
            onPaste={onPaste}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          {errorMessage && (
            <p className="absolute text-red-500 text-xs ml-1">{errorMessage}</p>
          )}
        </div>
      )}
    />
  );
};

export default SimpleInput;
