export interface InputProps {
  name: string;
  control: any;
  defaultValue: string;
  type: string;
  label: string;
  variant: any;
  disabled?: boolean;
  errors?: any;
  helperText?: any;
  marginprop?: string[];
  widthprop?: string;
  flexprop?: string[];
}

export interface LoginFormInput {
  email: string;
  password: string;
}

export interface SignUpFormInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  checkPassword: string;
}
