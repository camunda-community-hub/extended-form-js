import { useContext } from 'preact/hooks';

import { FormContext } from '../../context';

import Description from '../Description';
import Errors from '../Errors';
import Label from '../Label';

import {
  formFieldClasses,
  formFieldClassesCustom,
  prefixId
} from '../Util';

const type = 'table';


export default function Table(props) {
  const {
    disabled,
    errors = [],
    field,
    value = ''
  } = props;

  const {
    description,
    id,
    label,
	hiddenFx,
	headers,
	headersTypes,
	editableColumns,
    validate = {}
  } = field;

  const { required } = validate;

  const onChange = ({ target }) => {
    props.onChange({
      field,
      value: target.value
    });
  };

  const { formId } = useContext(FormContext);

  return (<div class={ formFieldClassesCustom(type, hiddenFx, errors) }>
    <Label
      id={ prefixId(id, formId) }
      label={ label }
      required={ required }
	  />
    <table>
      <thead>
        <tr>
		  {
            headers && headers.map((header) => (
              <th>{header.trim()}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          value && value.map((row) => (
            <tr>
			  {
				headers && headers.map((header) => (
                  <td>{row[header.trim()]}</td>
                ))
			  }
            </tr>
          ))
        }
      </tbody>
    </table>
    
    <Description description={ description } />
    <Errors errors={ errors } />
  </div>);
}

Table.create = function(options = {}) {
  return {
    ...options
  };
};

Table.type = type;
Table.label = 'Table';
Table.keyed = true;
Table.emptyValue = '';
Table.hiddenFx = 'false';