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
	console.log(form);
	let dataStr = JSON.stringify(form._getState().data);
	try {
	  setProcessFileSource(Function("let data = "+dataStr+"; return " + fileSource).call());
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
	  {value.name ?
	  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEEUlEQVRoge3Zy48VRRTH8Y8z8kqM8QEmAiNsjPKIQEx0ICER9y4EogKJOwbER0TAR2KMf4CyMGEnGzdKcNy404US3UhcQIKRlzxUIIIyCAlDYJxxUd1a3XTd7rn3Gk2836QyN9O/PnW66tSpU9306NGjR48OuKXL9vrxAB7ETNyZ/X8Ev+Jw1sa73G9H3IPN+BxXMFHTrmTazdm9/xoP4QPcUO90qv2BT/FIu060E0Lz8Q7WJK7/jIM4I4QOIZTmYGn2t4phbMepNnxqRD/ewKibR/JLbMHsBnbm4Hnsq7BzFa9nfXWVgYoOx/GhMKrtsjSzMV6yvQ9zO7BbYDnOlTr4Ruu4XYwNeCVrG7Cohf5R7C/1cS7ruyPW4Fpk9DreVD3FM7ADx6UX7XFsw/SK+/vxlmJSuIbV7Tr/LMYiYyN4LKFdgR9bOF5upzCYsLUq6yvXjmW+TIonFEfiDJYktE8pztIELmIv3sXO7PdISTOKtQmbC4WHjB8ilfVuYqVipjkonV1WlJz/BRsxpUI7BZtwvvQQqZmYjQMl7co65xcrjtQRzEpoZyiGzSHcV9cB5mXa/L6TmJbQzsx8iGc2mQxuw/eR+KywaaXYoTjyTZzPmac4E9taaAfwU6Q9hturhHsi0e/q8/sPkX5jc9//YnPJqVYsxeVIv6csGIouTuCZGoOLFae1KubrmIpLkZ2FNfp1JR+H8gv3Ksb97gadr4/0eyfpeMxwZGddA/1uxSiZ24dduCMTHMPLDQzFWelUQ2erOJmwmeIlYZ0S1sF7fSXBmGaHjYnodyeHorj/iaTqb8aEErxAOYTeb2AoDqGPG+hTfGJyIbRLKYTyC+VFXGdsUaQd0Z1FvKBG/7TEIs6J0+hl9Wn0aKTfNAnHc7ZE99el0SWKafSjKlF5IzuP+1sY3V7Szmvuu/m4EN2/tYV2QHHHT25khNC4GImPCNt5FdMVC65Dmj3EfHwX3XdC61LicKRtWUrklIu5A9IpbnlJe0HYYadWaKfiOcWRH5U+GM1RLOaualDM5VSV06k1sdbN5+RLwia1M2vDigs2dz5VIi/C6Ug7qXI6p+pAsyqhHRQ2pYmG7YT0yD+umNZvaONAk7NacXRvCMe+qiPlNOH8e6yF40eFBVsV87fibcWZH8WT7TqfU3Wo3y8cxFMsEDa7rVlbr3WeH8S3pT7OSR92Js1c4d1P3MG4kI+XdWD3YWH/Kb9W+UIXX6vk9OE1IRuUQ+MrvCDk7DoG8CK+rrBzFa8q1kgt+SdeLZ4V0t9ZIW/DXUIqXibUXlUMCyez02341Bb5y93rmmefcuv45W43mCXUQp8p1iupdjnTDknv8o3p9geOPuEDxwLcLYQOIZR+E2qtI/5jHzh69OjR43/MnxNI1S38PZTBAAAAAElFTkSuQmCC" class='fjs-fileviewer-icon' onClick={toggleViewer}/>
	  : <></>}
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
	{!displayViewer ? <></> :
	<>
	  <div class={viewerBackdrop}></div>
      <div class="fileViewer">
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