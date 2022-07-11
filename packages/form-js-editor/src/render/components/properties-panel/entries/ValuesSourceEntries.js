import { get, isUndefined, without } from 'min-dash';

import { SelectEntry, isSelectEntryEdited, TextFieldEntry } from '@bpmn-io/properties-panel';
import ValueEntry from './ValueEntry';

import { arrayAdd } from '../Util';
import { useService } from '../../../hooks';

export function ValuesSourceSelectorEntry(props) {
  const {
    editField,
    field
  } = props;

  return [ 
    {
      id: 'values-source',
      component: ValuesSourceSelect,
      isEdited: isSelectEntryEdited,
      editField,
      field
    } 
  ];
}

export function InputKeyValuesSourceEntry(props) {
  const {
    editField,
    field
  } = props;

  return [{
    id: 'input-values-key',
    component: InputValuesKey,
    label: 'Input values key',
    description: 'Define which input property to populate the values from',
    isEdited: isSelectEntryEdited,
    editField,
    field,
  }];
}

export function StaticValuesSourceEntry(props) {
  const {
    editField,
    field,
    id: idPrefix
  } = props;

  const {
    values
  } = field;

  const addEntry = (e) => {

    e.preventDefault();

    const index = values.length + 1;

    const entry = {
      label: `Value ${index}`,
      value: `value${index}`
    };

    editField(field, VALUES_SOURCES_PATHS[VALUES_SOURCES.STATIC], arrayAdd(values, values.length, entry));
  };

  const removeEntry = (entry) => {
    editField(field, VALUES_SOURCES_PATHS[VALUES_SOURCES.STATIC], without(values, entry));
  };

  const validateFactory = (key) => {
    return (value) => {
      if (value === key) {
        return;
      }

      if (isUndefined(value) || !value.length) {
        return 'Must not be empty.';
      }

      const isValueAssigned = values.find(entry => entry.value === value);

      if (isValueAssigned) {
        return 'Must be unique.';
      }
    };
  };

  const items = values.map((entry, index) => {
    const id = idPrefix + '-staticValue-' + index;

    return {
      id,
      label: entry.label,
      entries: ValueEntry({
        editField,
        field,
        idPrefix: id,
        index,
        validateFactory
      }),
      autoFocusEntry: true,
      remove: () => removeEntry(entry)
    };
  });

  return {
    items,
    add: addEntry
  };
}

function ValuesSourceSelect(props) {

  const {
    editField,
    field,
    id
  } = props;

  const getValue = getValuesSource;

  const setValue = (value) => {

    let newField = field;

    Object.values(VALUES_SOURCES).forEach(source => {

      // Clear all values source definitions and default the newly selected one
      const newValue = value === source ? VALUES_SOURCES_DEFAULTS[source] : undefined;
      newField = editField(field, VALUES_SOURCES_PATHS[source], newValue);
    });

    return newField;
  };

  const getValuesSourceOptions = () => {

    return Object.values(VALUES_SOURCES).map((valueSource) => ({
      label: VALUES_SOURCES_LABELS[valueSource],
      value: valueSource
    }));
  };

  return SelectEntry({
    element: field,
    getOptions: getValuesSourceOptions,
    getValue,
    id,
    label: 'Values source',
    setValue
  });
}

function InputValuesKey(props) {
  const {
    editField,
    field,
    id,
    label,
    description
  } = props;

  const debounce = useService('debounce');

  const path = VALUES_SOURCES_PATHS[VALUES_SOURCES.INPUT];

  const getValue = () => get(field, path, '');

  const setValue = (value) => editField(field, path, value || '');

  return TextFieldEntry({
    debounce,
    description,
    element: field,
    getValue,
    id,
    label,
    setValue
  });
}


//* CONFIG

export const VALUES_SOURCES = {
  STATIC: 'static',
  INPUT: 'input'
};

const VALUES_SOURCE_DEFAULT = VALUES_SOURCES.STATIC;

const VALUES_SOURCES_LABELS = {
  [VALUES_SOURCES.STATIC]: 'Static',
  [VALUES_SOURCES.INPUT]: 'Input data',
};

const VALUES_SOURCES_PATHS = {
  [VALUES_SOURCES.STATIC]: ['values'],
  [VALUES_SOURCES.INPUT]: ['valuesKey'],
};

const VALUES_SOURCES_DEFAULTS = {
  [VALUES_SOURCES.STATIC]: [],
  [VALUES_SOURCES.INPUT]: '',
};


// helpers ///////////////////

export function getValuesSource(field) {

  for (const source of Object.values(VALUES_SOURCES)) {
    if (get(field, VALUES_SOURCES_PATHS[source]) !== undefined) {
      return source;
    }
  }

  return VALUES_SOURCE_DEFAULT;
}
