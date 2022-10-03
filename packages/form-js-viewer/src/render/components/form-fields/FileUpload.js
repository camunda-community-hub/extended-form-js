import React from "react";
import { useContext } from 'preact/hooks';

import { FormContext } from '../../context';

import useService from '../../hooks/useService';

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
  const [displayViewer, setDisplayViewer] = React.useState(false);
  const [processFileSource, setProcessFileSource] = React.useState("");
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
	fileSource,
	displayFileUpload,
	displayFileViewer,
	viewerBackdrop,
	viewerClass,
	viewerHeaderClass,
	viewerHeaderTitle,
	iFrameClass,
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
  const form = useService('form');
  
  const toggleViewer = () => {
	
	let dataStr = JSON.stringify(form._getState().data);
	let valueStr = JSON.stringify(value);
	try {
	  setProcessFileSource(Function("let data = "+dataStr+"; let value = "+valueStr+"; return " + fileSource).call());
	} catch(error) {
	  setProcessFileSource(fileSource);
	}
	setDisplayViewer(!displayViewer);
  }
  const { formId } = useContext(FormContext);

  return <div class={ formFieldClassesCustom(type, hiddenFx, errors) }>
	  
    <label class="fjs-form-field-label">
      { label || '' }
      {
        required && <span class="fjs-asterix">*</span>
      }
	  {displayFileViewer && value.name ?
	  <div class='fjs-fileviewer-icon' onClick={toggleViewer}/>
	  : <></>}
    </label>
	{!displayFileUpload ? <></> :
	<>
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
	  </>
	}
	 
    <Description description={ description } />
    <Errors errors={ errors } />
	{!displayFileViewer ? <></> :
	<>
	  <div class={displayViewer ? viewerBackdrop+" show" : viewerBackdrop}></div>
      <div class={displayViewer ? "fileViewer show" : "fileViewer"}>
        <div class={viewerClass}>
	      <div class={viewerHeaderClass}>
	  	    <h4>{viewerHeaderTitle}</h4><button type="button" class="btn-close" onClick={toggleViewer}></button>
  		  </div>
		  <iframe class={iFrameClass} src={processFileSource}></iframe>
	    </div>
	  </div>
	</>
	}
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