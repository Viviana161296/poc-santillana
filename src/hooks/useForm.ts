import { useState, useCallback } from 'react';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

interface ValidationErrors {
  [key: string]: string;
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, ValidationRules> = {} as Record<keyof T, ValidationRules>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((name: keyof T, value: any) => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && !value) {
      return 'This field is required';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format';
    }

    return '';
  }, [validationRules]);

  const handleChange = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validate]);

  const validateAll = useCallback(() => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(values).forEach(key => {
      const error = validate(key as keyof T, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validate]);

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validateAll,
    reset: () => setValues(initialValues),
  };
}

export default useForm;