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

export function tableClasses(type, hiddenFx, length) {
	
  let classes = formFieldClassesCustom(type, hiddenFx, []);

  return classes+' table'+length;
}

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
	headersNames,
	editableColumns,
    validate = {}
  } = field;

  const { required } = validate;
  const headersArray = headers ? headers.split(",") : [];
  const headersNamesArray = headersNames ? headersNames.split(",") : [];
  const editableColumnsArray = editableColumns ? editableColumns.split(",") : [];
  const editableMap = {};
  //build the editableMap
  for(let i=0; i<editableColumnsArray.length;i++) {
	let col = editableColumnsArray[i].trim();
	let type = "text";
	let colAndType = col.match(/([a-z0-9]+)[ ]*\[([a-z]+)\]/i);
	if (colAndType!=null) {
		col = colAndType[1];
		type = colAndType[2];
	}
	editableMap[col]=type;
  }	  
  const { formId } = useContext(FormContext);


  const onChange = ( index, col, newValue) => {
	value[index][col] = newValue;
    props.onChange({
      field,
      value: value
    });
  };
  

  const getInput = (col, type, index) => {
	  return type=='boolean' || type=='bool' ?
	  <input
        checked={ value[index][col] }
        class="fjs-table-checkbox"
        type="checkbox"
        onChange={ e => onChange(index, col, e.target.checked) } /> :
	  <input
		  class="fjs-table-input"
		  onInput={ e => onChange(index, col, e.target.value) }
		  type= { type }
		  value={ value[index][col] } />
   }

  return (<div class={ tableClasses(type, hiddenFx, headersArray.length) }>
    <Label
      id={ prefixId(id, formId) }
      label={ label }
      required={ required }
	  />
    <table>
      <thead>
        <tr>
		  {
            headersNamesArray.map((header) => (
              <th>{header.trim()}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          value && value.map((row, index) => (
            <tr>
			  {
				headersArray.map((header) => (
                  <td>{editableMap[header.trim()] ? getInput(header.trim(), editableMap[header.trim()], index) : row[header.trim()]}</td>
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