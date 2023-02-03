import * as Yup from 'yup';
import {FormikHelpers} from 'formik';

export interface FormValuesI {
  name: string;
  message: string;
  email?: string;
  twitterHandle?: string;
  discordHandle?: string;
  telegramHandle?: string;
}

export interface FormConfigI {
  initialValues: FormValuesI;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: FormValuesI, {resetForm}: FormikHelpers<FormValuesI>) => void;
}
