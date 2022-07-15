import { formFieldClassesCustom } from '../Util';

const type = 'button';


export default function Button(props) {
  const {
    disabled,
    field
  } = props;

  const { 
	action = 'submit',
	hiddenFx
  } = field;

  return <div class={ formFieldClassesCustom(type, hiddenFx)}>
    <button class="fjs-button" type={ action } disabled={ disabled }>{ field.label }</button>
  </div>;
}

Button.create = function(options = {}) {

  return {
    action: 'submit',
    ...options
  };
};

Button.type = type;
Button.label = 'Button';
Button.keyed = true;
Button.hiddenFx = 'false';