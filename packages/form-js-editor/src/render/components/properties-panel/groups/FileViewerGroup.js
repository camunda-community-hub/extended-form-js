import {
  get,
  set
} from 'min-dash';

import {
  CheckboxEntry,
  isCheckboxEntryEdited,
  isNumberFieldEntryEdited,
  isTextFieldEntryEdited,
  NumberFieldEntry,
  TextFieldEntry
} from '@bpmn-io/properties-panel';

import { useService } from '../../../hooks';


export default function FileViewerGroup(field, editField) {
  const { type } = field;

  if (type !== 'fileUpload' && type !== 'fileViewer') {
    return null;
  } else {
	if (!field.fileSource) {
		editField(field, 'fileSource', "'/file/serve?fileId='+data.fileId");
		editField(field, 'viewerBackdrop', 'modal-backdrop');
		editField(field, 'viewerClass', 'modal-dialog');
		editField(field, 'viewerHeaderClass', 'modal-header');
		editField(field, 'viewerHeaderTitle', 'File viewer');
		editField(field, 'iFrameClass', 'modal-body');
	}
  }
  
  const setFileSource = (value) => {
    return editField(field, 'fileSource', value);
  };
  const setViewerBackdrop = (value) => {
    return editField(field, 'viewerBackdrop', value);
  };
  const setViewerClass = (value) => {
    return editField(field, 'viewerClass', value);
  };
  const setViewerHeaderClass = (value) => {
    return editField(field, 'viewerHeaderClass', value);
  };
  const setViewerHeaderTitle = (value) => {
    return editField(field, 'viewerHeaderTitle', value);
  };
  const setIFrameClass = (value) => {
    return editField(field, 'iFrameClass', value);
  };

  const getValue = (key) => {
    return () => {
      return get(field, [key], '');
    };
  };

  let entries = [
  ];
 
  entries.push(
    {
      id: 'fileSource',
      component: FileSource,
      getValue,
      field,
      isEdited: isTextFieldEntryEdited,
      setFileSource
    },
    {
      id: 'viewerBackdrop',
      component: ViewerBackdrop,
      getValue,
      field,
      isEdited: isTextFieldEntryEdited,
      setViewerBackdrop
    },
	{
      id: 'viewerClass',
      component: ViewerClass,
      getValue,
      field,
      isEdited: isTextFieldEntryEdited,
      setViewerClass
	},
	{
      id: 'viewerHeaderClass',
      component: ViewerHeaderClass,
      getValue,
      field,
      isEdited: isTextFieldEntryEdited,
      setViewerHeaderClass
	},
	{
      id: 'viewerHeaderTitle',
      component: ViewerHeaderTitle,
      getValue,
      field,
      isEdited: isTextFieldEntryEdited,
      setViewerHeaderTitle
	},
	{
      id: 'iFrameClass',
      component: IFrameClass,
      getValue,
      field,
      isEdited: isTextFieldEntryEdited,
      setIFrameClass
	}
  );

  return {
    id: 'FileViewer',
    label: 'FileViewer',
    entries
  };
}

function FileSource(props) {
  const {
    field,
    getValue,
    id,
    setFileSource
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('fileSource'),
    id,
    label: 'FileSource API',
    setValue: setFileSource
  });
}

function ViewerBackdrop(props) {
  const {
    field,
    getValue,
    id,
    setViewerBackdrop
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('viewerBackdrop'),
    id,
    label: 'Viewer backdrop',
    setValue: setViewerBackdrop
  });
}

function ViewerClass(props) {
  const {
    field,
    getValue,
    id,
    setViewerClass
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('viewerClass'),
    id,
    label: 'Viewer class',
    setValue: setViewerClass
  });
}

function ViewerHeaderClass(props) {
  const {
    field,
    getValue,
    id,
    setViewerHeaderClass
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('viewerHeaderClass'),
    id,
    label: 'Viewer header class',
    setValue: setViewerHeaderClass
  });
}

function ViewerHeaderTitle(props) {
  const {
    field,
    getValue,
    id,
    setViewerHeaderTitle
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('viewerHeaderTitle'),
    id,
    label: 'Viewer header title',
    setValue: setViewerHeaderTitle
  });
}

function IFrameClass(props) {
  const {
    field,
    getValue,
    id,
    setIFrameClass
  } = props;

  const debounce = useService('debounce');

  return TextFieldEntry({
    debounce,
    element: field,
    getValue: getValue('iFrameClass'),
    id,
    label: 'Viewer iFrame class',
    setValue: setIFrameClass
  });
}