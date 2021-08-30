import {useState} from 'react';

export const useForm = initialValue => {
  const [values, setValues] = useState(initialValue);
  return [
    values,
    (formType, formParams) => {
      if (formType === 'reset') return setValues(initialValue);
      return setValues({...values, [formType]: formParams});
    },
  ];
};
