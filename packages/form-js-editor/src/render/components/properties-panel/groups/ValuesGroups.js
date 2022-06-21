import { ValuesSourceSelectorEntry, StaticValuesSourceEntry, InputKeyValuesSourceEntry, getValuesSource, VALUES_SOURCES } from '../entries';

import { Group, ListGroup } from '@bpmn-io/properties-panel';

import {
  VALUES_INPUTS
} from '../Util';

export default function ValuesGroups(field, editField) {
  const {
    type,
    id: fieldId
  } = field;

  if (!VALUES_INPUTS.includes(type)) {
    return [];
  }

  const id = fieldId + '-values';
  const context = { editField, field, id };

  const groups = [
    {
      id: `${id}-source-selector`,
      label: 'Values source',
      component: Group,
      entries: ValuesSourceSelectorEntry(context)
    }
  ];

  const valuesSource = getValuesSource(field);

  if (valuesSource === VALUES_SOURCES.INPUT) {
    groups.push({
      id,
      label: 'Dynamic values',
      component: Group,
      entries: InputKeyValuesSourceEntry(context)
    });
  }
  else if (valuesSource === VALUES_SOURCES.STATIC) {
    groups.push({
      id,
      label: 'Static values',
      component: ListGroup,
      entries: undefined,
      ...StaticValuesSourceEntry(context)
    });
  }

  return groups;
}