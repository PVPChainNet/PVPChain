import React, {useEffect, useState} from 'react';
import {useFormikContext} from 'formik';
import classNames from 'classnames';

type FormInputErrorCountPropsT = {
  group: string[];
  className?: string;
};

function FormInputErrorCount({group = [], className = ''}: FormInputErrorCountPropsT) {
  const [groupsError, setGroupsError] = useState<string[]>([]);
  const {values, errors, touched, submitCount, getFieldMeta, getFieldProps} = useFormikContext();

  useEffect(() => {
    group.forEach(field => {
      const fieldMeta = getFieldMeta(field);
      const fieldProps = getFieldProps(field);

      if (fieldMeta.touched && fieldMeta.error) {
        if (!groupsError.includes(fieldProps.name)) {
          setGroupsError([...groupsError, fieldProps.name]);
        }
      } else {
        if (groupsError.includes(fieldProps.name)) {
          setGroupsError(groupsError.filter(f => f !== fieldProps.name));
        }
      }
    });
  }, [values, touched, submitCount, errors, group, groupsError, getFieldMeta, getFieldProps]);

  if (groupsError.length === 0) return <></>;

  return <div className={classNames('h-5 w-5 p-2 text-sm', className)}>{groupsError.length}</div>;
}

export default FormInputErrorCount;
