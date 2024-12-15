export interface SimpleInputProps {
  control: any;
  name: string;
  type?: string;
  extraClassname?: string;
  id?: string;
  placeholder?: string;
  max?: number;
  min?: number;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  pattern?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label?: string;
  errorMessage?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
