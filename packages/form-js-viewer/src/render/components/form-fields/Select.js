import React, { useState, useEffect, useCallback } from "react";

import { useContext } from 'preact/hooks';

import { FormContext } from '../../context';

import Description from '../Description';
import Errors from '../Errors';
import Label from '../Label';

import {
  getDataAsJson,
  getDatasource,
  formFieldClassesCustom,
  prefixId
} from '../Util';

const type = 'select';

export default function Select(props) {
  const {
    disabled,
    errors = [],
    field,
    value
  } = props;

  const {
    description,
    id,
    label,
	hiddenFx,
    validate = {},
	dataSource,
    values
  } = field;

  const { required } = validate;

  const [myValues, myValuesSet] = useState([]);
  

  let dataFormStr = getDataAsJson();
  console.log(dataFormStr);

  const fetchMyAPI = useCallback(async () => {
      if (dataSource && dataSource.length>0) {
		  let computedDs = dataSource;
		  if (dataSource.includes('${data')) {
			try{
			  let transform = '"'+dataSource.replace('${','"+').replace('}','+"')+'"';
			  computedDs = Function("let data = "+dataFormStr+"; return " + transform+";").call();
			}catch(err) {
			  console.log(err);
			}
		  }
		  try {
			  let response = await fetch(computedDs);
			  response = await response.json();
			  myValuesSet(response);
		  } catch(err) {
			myValuesSet(values);
		  }
	  } else {
		  myValuesSet(values);
	  }
  }, [dataSource]) // if dataSource changes, useEffect will run again

  useEffect(() => {
    fetchMyAPI()
  }, [fetchMyAPI])

  const onChange = ({ target }) => {
    props.onChange({
      field,
      value: target.value === '' ? null : target.value
    });
  };

  const { formId } = useContext(FormContext);

  return <div class={ formFieldClassesCustom(type, hiddenFx, errors) }>
    <Label
      id={ prefixId(id, formId) }
      label={ label }
      required={ required } />
    <select
      class="fjs-select"
      disabled={ disabled }
      id={ prefixId(id, formId) }
      onChange={ onChange }
      value={ value || '' }>
      <option value=""></option>
      {
        myValues.map((v, index) => {
          return (
            <option
              key={ `${ id }-${ index }` }
              value={ v.value }>
              { v.label }
            </option>
          );
        })
      }
    </select>
    <Description description={ description } />
    <Errors errors={ errors } />
  </div>;
}

Select.create = function(options = {}) {

  return {
    values: [
      {
        label: 'Value',
        value: 'value'
      }
    ],
    ...options
  };
};

Select.type = type;
Select.label = 'Select';
Select.keyed = true;
Select.emptyValue = null;
Select.hiddenFx = 'false';