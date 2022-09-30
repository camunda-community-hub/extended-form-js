import {
  get,
  set
} from 'min-dash';

import {
  CheckboxEntry,
  isCheckboxEntryEdited,
  isNumberFieldEntryEdited,
  isTextFieldEntryEdited,
  NumberFieldEntry,
  TextFieldEntry
} from '@bpmn-io/properties-panel';

import { useService } from '../../../hooks';

import { INPUTS, OPTIONS_INPUTS } from '../Util';


export default function IntegrationGroup(field, editField) {
  const { type } = field;

  if (!OPTIONS_INPUTS.includes(type) && type !== 'button' && type !== 'fileUpload') {
    return null;
  }
  if (type === 'fileUpload' && !field.targetApi) {
	editField(field, 'targetApi', '/file/upload');
	editField(field, 'targetApiVerb', 'POST');
  }
  
  const setDataSource = (value) => {
    return editField(field, 'dataSource', value);
  };
  const setTargetApi = (value) => {
    return editField(field, 'targetApi', value);
  };
  const setTargetApiVerb = (value) => {
    return editField(field, 'targetApiVerb', value);
  };

  const getValue = (key) => {
    return () => {
      return get(field, [key], '');
    };
  };

  let entries = [
  ];

  if (type === 'button' || type==='fileUpload') {
    entries.push(
      {
        id: 'targetApi',
        component: TargetApi,
        getValue,
        field,
        isEdited: isTextFieldEntryEdited,
        setTargetApi
      },
	  {
        id: 'targetApiVerb',
        component: TargetApiVerb,
        getValue,
        field,
        isEdited: isTextFieldEntryEdited,
        setTargetApiVerb
	  }
    );
  } else {
    entries.push(
      {
        id: 'dataSource',
        component: DataSource,
        getValue,
        field,
        isEdited: isTextFieldEntryEdited,
        setDataSource
      }
    );
  }

  return {
    id: 'integration',
    label: 'Integration',
    entries
  };
}

function DataSource(props) {
  const {
    field,
    getValue,
    id,
    setDataSource
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('dataSource'),
    id,
    label: 'DataSource API',
    setValue: setDataSource
  });
}

function TargetApi(props) {
  const {
    field,
    getValue,
    id,
    setTargetApi
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('targetApi'),
    id,
    label: 'Target API',
    setValue: setTargetApi
  });
}

function TargetApiVerb(props) {
  const {
    field,
    getValue,
    id,
    setTargetApiVerb
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('targetApiVerb'),
    id,
    label: 'Target HTTP Verb',
    setValue: setTargetApiVerb
  });
}
