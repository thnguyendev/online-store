import { AbstractControl, ValidationErrors } from "@angular/forms";

const messages: any = {
  required: () => 'Required field',
  email: () => 'Invalid email address',
  onlyWhitespaces: () => 'Only whitespaces not allowed',
  firstWhitespace: () => 'Start with whitespace not allowed',
};

export function getErrors(formControl: AbstractControl) {
  let errors: string[] = [];
  if (formControl.errors != null) {
    Object.entries(formControl.errors).forEach((error) => {
      let getter = messages[error[0]] as (...params: any[]) => string;
      errors.push(getter != null ? getter(error[1]) : '');
    });
  }
  return errors.join(', ');
}

export function validateWhitespaces(control: AbstractControl) : ValidationErrors | null {
  let value = control.value as string;
  if (value?.length > 0) {
    if (value?.trim()?.length === 0)
      return { onlyWhitespaces: true };
    else if (value[0] === ' ')
      return { firstWhitespace: true };
  }
  return null;
}

export function deepCopy(source: any): any {
  if (typeof source !== 'object')
    return source;
  if (Array.isArray(source)) {
    let output: any[] = [];
    source.forEach(e => {
      output.push(deepCopy(e));
    });
    return output;
  }
  else {
    let output = Object.create(source);
    Object.getOwnPropertyNames(source).forEach(e => {
      let item = source[e];
      output[e] = deepCopy(item);
    });
    return output;
  }
}