import { useEffect, useState } from 'preact/hooks';
import useService from './useService';

/**
 * @enum { String }
 */
export const LOAD_STATES = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error'
};

/**
 * @typedef {Object} ValuesGetter
 * @property {Object[]} values - The values data
 * @property {(LOAD_STATES)} state - The values data's loading state, to use for conditional rendering
 */

/**
 * A hook to load values for single and multiselect components.
 *
 * @param {Object} field - The form field to handle values for
 * @return {ValuesGetter} valuesGetter - A values getter object providing loading state and values
 */
export default function(field) {
  const {
    valuesKey,
    values: staticValues
  } = field;

  const [ valuesGetter, setValuesGetter ] = useState({ values: [], state: LOAD_STATES.LOADING });
  const initialData = useService('form')._getState().initialData;

  useEffect(() => {

    let values = [];

    if (valuesKey !== undefined) {

      const safeInitialData = initialData || {};
      const keyedValues = safeInitialData[ valuesKey ];

      if (keyedValues && Array.isArray(keyedValues)) {
        values = keyedValues;
      }
    }
    else if (staticValues !== undefined) {
      values = Array.isArray(staticValues) ? staticValues : [];
    }
    else {
      setValuesGetter({ values, state: LOAD_STATES.ERROR });
      return;
    }

    setValuesGetter({ values, state: LOAD_STATES.LOADED });

  }, [valuesKey, staticValues, initialData]);

  return valuesGetter;
}

