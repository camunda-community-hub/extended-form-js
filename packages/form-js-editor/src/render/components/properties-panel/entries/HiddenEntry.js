import { get } from 'min-dash';

import { INPUTS } from '../Util';

import { useService } from '../../../hooks';

import { TextFieldEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';


export default function HiddenEntry(props) {
  const {
    editField,
    field
  } = props;

  const {
    type
  } = field;

  const entries = [];

  if (INPUTS.includes(type) || type === 'button') {
    entries.push({
      id: 'hiddenFx',
      component: HiddenFx,
      editField: editField,
      field: field,
      isEdited: isTextFieldEntryEdited
    });
  }

  return entries;
}

function HiddenFx(props) {
  const {
    editField,
    field,
    id
  } = props;

  const debounce = useService('debounce');

  const path = [ 'hiddenFx' ];

  const getValue = () => {
    return get(field, path, '');
  };

  const setValue = (value) => {
    return editField(field, path, value);
  };

  return TextFieldEntry({
    debounce,
    element: field,
    getValue,
    id,
    label: 'Should be hidden',
    setValue
  });
}