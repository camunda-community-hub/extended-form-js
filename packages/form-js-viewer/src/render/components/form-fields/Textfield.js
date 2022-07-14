import { useContext } from 'preact/hooks';

import { FormContext } from '../../context';

import Description from '../Description';
import Errors from '../Errors';
import Label from '../Label';

import {
  formFieldClassesCustom,
  prefixId
} from '../Util';

const type = 'textfield';


export default function Textfield(props) {
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

  return <div class={ formFieldClassesCustom(type, hiddenFx, errors) }>
    <Label
      id={ prefixId(id, formId) }
      label={ label }
      required={ required } />
    <input
      class="fjs-input"
      disabled={ disabled }
      id={ prefixId(id, formId) }
      onInput={ onChange }
      type="text"
      value={ value } />
    <Description description={ description } />
    <Errors errors={ errors } />
  </div>;
}

Textfield.create = function(options = {}) {
  return {
    ...options
  };
};

Textfield.type = type;
Textfield.label = 'Text Field';
Textfield.keyed = true;
Textfield.emptyValue = '';
Textfield.hiddenFx = 'false';