import React from "react";
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

const type = 'fileUpload';


export default function FileUpload(props) {
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
	targetApi,
	targetApiVerb,
    validate = {}
  } = field;

  const { required } = validate;

  const onChange = ({ target }) => {
	const formData = new FormData();
	formData.append('File', target.files[0]);

	const requestOptions = {
        method: targetApiVerb,
        body: formData
    };
	fetch(targetApi, requestOptions).then((response) => {
		 response.ok ? response.json().then(json => {
		props.onChange({
		  field,
		  value: json
		}); }) : console.log(response)
    })
	
    
  };

  const { formId } = useContext(FormContext);

  return <div class={ formFieldClassesCustom(type, hiddenFx, errors) }>
    <label class="fjs-form-field-label">
      { label || '' }
      {
        required && <span class="fjs-asterix">*</span>
      }
    </label>
    <label for={ prefixId(id, formId) } class="fjs-form-field-label fjs-file-input">
      File Upload
	  <div class="fjs-file-input-info">{value.name}</div>
	  <img src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACLklEQVRoge2YTS8DQRjHHwfahAYHRycfgAQ3dWlExFGCfgFXX8HBN5AQr9c6e7l7S9TJgYarEFFXkYgqnr/dTadjptul0x0xv+SftLszO792Z+dliRwOh8PhcPxP2jjJuCWiMsTZ4txyPvwUOducTIxeoSQ4G5x3qoirssvpislRS4pzRLXFxRTIoh8B+RNSi75xXjXnduKQldHJX3LGOe3kda0RUt+hWJ8Jnfwpp1NRHiPSsVQ21xRTBVHlA9JS+aJZTTU/lQeYE0pCHYxYCWOmCuqRHw6pXxbq4XOrKVlV4yr5PFXkp8n7h7Oaa0xKdW8M+lYRRR7H9xXXwLh/LdVfN2rtgz56SPXLB11KBOXOpProPgOG3b9YoGjyyKpQXyWPLJtXJ2rh3FM0+RdOf4j8AXnzgjGCkaFHaviJ011DHt9nQuQxI3eYlMfF9wQJsXGsa8Y4cxr52bjlxQe21z92oRCRY4U8WBManPePZf+K/CBVb0awo0r55xY18s+cKRvkwabUcIGq1zaj5K0ecfycs8Tp88/FLg/upMYn6qxnhTzGZLH7lOtsHPJ5+i6PZUeqRr2Gk5QEShT+OkQnj01L0/55kUdJJF2jrHXyIKeQUU33VsqDjEIKfRl3At0JfRrr+StFudjlA/CqQzdZlTXnrJEH2HRgnA9bOgTBssMa+QD8CN2dEIfZFTK8JP4teCbwYD+QJ415AntYbAObspNqJFilNu3tgcPhcNjFJ4udZjdSNDK9AAAAAElFTkSuQmCC" class="fjs-upload-icon"></img>
    </label>
    <input
      class="fjs-input-file-hidden"
      disabled={ disabled }
      id={ prefixId(id, formId) }
      onInput={ onChange }
      type="file"/>
	 
    <Description description={ description } />
    <Errors errors={ errors } />
  </div>;
}

FileUpload.create = function(options = {}) {
  return {
    ...options
  };
};

FileUpload.type = type;
FileUpload.label = 'File Upload';
FileUpload.keyed = true;
FileUpload.emptyValue = '';
FileUpload.hiddenFx = 'false';