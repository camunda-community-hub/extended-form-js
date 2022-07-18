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


export default function TableGroup(field, editField) {
  const { type } = field;

  if (type !== 'table') {
    return null;
  }
  
  const setHeaders = (value) => {
    return editField(field, 'headers', value);
  };
  const setHeadersNames = (value) => {
    return editField(field, 'headersNames', value);
  };
  const setEditableColumns = (value) => {
    return editField(field, 'editableColumns', value);
  };

  const getValue = (key) => {
    return () => {
      return get(field, [key], '');
    };
  };

  let entries = [{
        id: 'headers',
        component: Headers,
        getValue,
        field,
        isEdited: isTextFieldEntryEdited,
        setHeaders
      },
	  {
        id: 'headersNames',
        component: HeadersNames,
        getValue,
        field,
        isEdited: isTextFieldEntryEdited,
        setHeadersNames
	  },
	  {
        id: 'editableColumns',
        component: EditableColumns,
        getValue,
        field,
        isEdited: isTextFieldEntryEdited,
        setEditableColumns
	  }
  ];

  return {
    id: 'tableDef',
    label: 'Table definition',
    entries
  };
}

function Headers(props) {
  const {
    field,
    getValue,
    id,
    setHeaders
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('headers'),
    id,
    label: 'Headers (coma separated)',
    setValue: setHeaders
  });
}

function HeadersNames(props) {
  const {
    field,
    getValue,
    id,
    setHeadersNames
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('headersNames'),
    id,
    label: 'Header names (coma separated)',
    setValue: setHeadersNames
  });
}

function EditableColumns(props) {
  const {
    field,
    getValue,
    id,
    setEditableColumns
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('editableColumns'),
    id,
    label: 'Editable cols (header[type], header2[type])',
    setValue: setEditableColumns
  });
}
