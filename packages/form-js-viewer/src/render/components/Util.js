import snarkdown from '@bpmn-io/snarkdown';

import { sanitizeHTML } from './Sanitizer';

import useService from '../hooks/useService';

export function formFieldClasses(type, errors = []) {
  if (!type) {
    throw new Error('type required');
  }

  const classes = [
    'fjs-form-field',
    `fjs-form-field-${ type }`
  ];

  if (errors.length) {
    classes.push('fjs-has-errors');
  }

  return classes.join(' ');
}

export function getDataAsJson() {
  const form = useService('form');
  return JSON.stringify(form._getState().data);
}

export function formFieldClassesCustom(type, hiddenFx, errors = []) {
  let dataStr = getDataAsJson();

  if (!type) {
    throw new Error('type required');
  }
  let hidden = false;
  try{
	  hidden = Function("let data = "+dataStr+"; return " + hiddenFx).call()
  }catch(err) {
	  hidden = false;
  }
  let fieldClass = hidden ? 'fjs-form-field hidden' :  'fjs-form-field';
  const classes = [
    fieldClass,
    `fjs-form-field-${ type }`,
	
  ];

  if (errors.length) {
    classes.push('fjs-has-errors');
  }

  return classes.join(' ');
}



export function getDatasource(datasource) {
	if (!datasource.includes('${data')) {
		return datasource;
	}
		  
    let dataStr = getDataAsJson();

	try{
      let transform = '"'+datasource.replace('${','"+').replace('}','+"')+'"';
	  let result = Function("let data = "+dataStr+"; return " + transform+";").call();
	}catch(err) {
	  return datasource
	}
}


export function prefixId(id, formId) {
  if (formId) {
    return `fjs-form-${ formId }-${ id }`;
  }

  return `fjs-form-${ id }`;
}

export function markdownToHTML(markdown) {
  const htmls = markdown
    .split(/(?:\r?\n){2,}/)
    .map(line =>
      /^((\d+.)|[><\s#-*])/.test(line)
        ? snarkdown(line)
        : `<p>${ snarkdown(line) }</p>`,
    );

  return htmls.join('\n\n');
}

// see https://github.com/developit/snarkdown/issues/70
export function safeMarkdown(markdown) {
  const html = markdownToHTML(markdown);

  return sanitizeHTML(html);
}