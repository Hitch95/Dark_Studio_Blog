interface RegisterValues {
  username: string;
  email: string;
  password: string;
}

interface LoginValues {
  email: string;
  password: string;
}

interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}

export const RegisterValidation = (
  values: RegisterValues
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.username) {
    errors.username = 'Username Required';
  } else if (values.username.length < 2 || values.username.length > 20) {
    errors.username =
      'Username must be more than 2 characters and less than 20';
  }

  if (!values.email) {
    errors.email = 'Email Required';
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = 'Email must be in good format and consistent';
  }

  if (!values.password) {
    errors.password = 'Password Required';
  } else if (
    !/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/.test(
      values.password
    )
  ) {
    errors.password =
      'The password must be at least 8 characters long, contain at least one number, one lowercase letter, one uppercase letter and one special character.';
  }

  console.log(errors);
  return errors;
};

export const LoginValidation = (values: LoginValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.email) {
    errors.email = 'Email Required';
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = 'Email must be in good format and consistent';
  }

  if (!values.password) {
    errors.password = 'Password Required';
  } else if (
    !/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/.test(
      values.password
    )
  ) {
    errors.password =
      'The password must be at least 8 characters long, contain at least one number, one lowercase letter, one uppercase letter and one special character.';
  }

  console.log(errors);
  return errors;
};
