import Markup from 'preact-markup';

import {
  formFieldClassesCustom,
  safeMarkdown
} from '../Util';

const type = 'text';


export default function Text(props) {
  const { field } = props;

  const { text = '', hiddenFx } = field;

  return <div class={ formFieldClassesCustom(type, hiddenFx) }>
    <Markup markup={ safeMarkdown(text) } trim={ false } />
  </div>;
}

Text.create = function(options = {}) {
  return {
    text: '# Text',
    ...options
  };
};

Text.type = type;
Text.keyed = false;
Text.hiddenFx = 'false';