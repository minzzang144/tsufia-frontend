export interface InputProps {
  name: string;
  control: any;
  defaultValue: string;
  type: string;
  label: string;
  variant: any;
  errors?: any;
  helperText?: any;
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
  passwordcheck: string;
}
