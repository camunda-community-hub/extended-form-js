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
    return editField(field, 'headers', value.split(","));
  };
  const setHeadersTypes = (value) => {
    return editField(field, 'headersTypes', value.split(","));
  };
  const setEditableColumns = (value) => {
    return editField(field, 'editableColumns', value.split(","));
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
        id: 'headersTypes',
        component: HeadersTypes,
        getValue,
        field,
        isEdited: isTextFieldEntryEdited,
        setHeadersTypes
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

function HeadersTypes(props) {
  const {
    field,
    getValue,
    id,
    setHeadersTypes
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('headersTypes'),
    id,
    label: 'Header types (coma separated)',
    setValue: setHeadersTypes
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
    label: 'Editable columns (booleans coma sep)',
    setValue: setEditableColumns
  });
}
