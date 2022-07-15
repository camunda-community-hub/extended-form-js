import React, { useState, useEffect, useCallback } from "react";

import { useContext } from 'preact/hooks';

import { FormContext } from '../../context';

import Description from '../Description';
import Errors from '../Errors';
import Label from '../Label';

import {
  formFieldClassesCustom,
  prefixId
} from '../Util';

const type = 'checklist';


export default function Checklist(props) {
  const {
    disabled,
    errors = [],
    field,
    value = [],
  } = props;

  const {
    description,
    id,
    label,
    values,
	dataSource,
	hiddenFx
  } = field;
  
  const [myValues, myValuesSet] = useState([]);

  const fetchMyAPI = useCallback(async () => {
      if (dataSource && dataSource.length>0) {
		  let response = await fetch(dataSource);
		  response = await response.json();
		  myValuesSet(response);
	  } else {
		  myValuesSet(values);
	  }
  }, [dataSource]) // if dataSource changes, useEffect will run again

  useEffect(() => {
    fetchMyAPI()
  }, [fetchMyAPI])

  const toggleCheckbox = (v) => {

    let newValue = [ ...value ];

    if (!newValue.includes(v)) {
      newValue.push(v);
    } else {
      newValue = newValue.filter(x => x != v);
    }

    props.onChange({
      field,
      value: newValue,
    });
  };

  const { formId } = useContext(FormContext);

  return <div class={ formFieldClassesCustom(type, hiddenFx, errors) }>
    <Label
      label={ label } />
    {
      myValues.map((v, index) => {
        return (
          <Label
            id={ prefixId(`${id}-${index}`, formId) }
            key={ `${id}-${index}` }
            label={ v.label }
            required={ false }>
            <input
              checked={ value.includes(v.value) }
              class="fjs-input"
              disabled={ disabled }
              id={ prefixId(`${id}-${index}`, formId) }
              type="checkbox"
              onClick={ () => toggleCheckbox(v.value) } />
          </Label>
        );
      })
    }
    <Description description={ description } />
    <Errors errors={ errors } />
  </div>;
}

Checklist.create = function(options = {}) {
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

Checklist.type = type;
Checklist.label = 'Checklist';
Checklist.keyed = true;
Checklist.emptyValue = [];
Checklist.hiddenFx = 'false';