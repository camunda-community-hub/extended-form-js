# This project shouldn't be used anymore. It's an old unmaintained fork of form-js

# @camunda-community/form-js

[![Community Extension](https://img.shields.io/badge/Community%20Extension-An%20open%20source%20community%20maintained%20project-FF4700)](https://github.com/camunda-community-hub/community)
![Compatible with: Camunda Platform 8](https://img.shields.io/badge/Compatible%20with-Camunda%20Platform%208-0072Ce)
![](https://img.shields.io/badge/Lifecycle-Deprecated-yellowgreen)
![](https://img.shields.io/badge/Lifecycle-Unmaintained-lightgrey)

[View](./packages/form-js-viewer) and [visually edit](./packages/form-js-editor) JSON-based forms.

Forked from [@bpmn-io/form-js](https://github.com/bpmn-io/form-js)

## New features
 - New property "Should be hidden" in properties panel where you can use javascript expressions to hide components : data.myProcessVariable=='toHide'. Be sure to prefix your process variable with **data.**
- Date picker component
- You can populate select (drop down) and checklist options from webservices
- FileUpload widget where you can define the target endpoint and HTTP verb. This widget also comes with a FileViewer. You can override viewer CSS classnames and define your own endpoint to serve the file. You can use a litteral expression or a javascript expression : '/file/serve?fileId='+data.file.reference (where file is the process variable) or directly '/file/serve?fileId='+value.reference (where value is a direct reference to the component field value).
- Table widget where you can display/edit and add rows (columns types can be defined)
 
## local dev
You should install cross-env. If you want to release, you should also install npm-run-all 
```
npm install
npm install --save-dev cross-env
npm install npm-run-all --save-dev
```

## Usage

This library exports a [form viewer](./packages/form-js-viewer) and [editor](./packages/form-js-editor).

### Display a Form <a id="viewer" />

Renders a form based on [a form schema](./docs/FORM_SCHEMA.md) and existing data:

```javascript
import { Form } from '@camunda-community/form-js';

const form = new Form({
  container: document.querySelector('#form')
});

await form.importSchema(schema, data);

form.on('submit', (event) => {
  console.log(event.data, event.errors);
});
```

See [viewer documentation](./packages/form-js-viewer) for further details.


### Create and Edit a Form <a id="builder" />

Create a new form or edit an exsting one:

```javascript
import { FormEditor } from '@camunda-community/form-js';

const formEditor = new FormEditor({
  container: document.querySelector('#form-editor')
});

await formEditor.importSchema(schema);
```

See [editor documentation](./packages/form-js-editor) for further details.


## Resources

* [Demo](https://demo.bpmn.io/form)
* [Issues](https://github.com/bpmn-io/form-js/issues)
* [Changelog](./packages/form-js/CHANGELOG.md)
* [Form schema](./docs/FORM_SCHEMA.md)


## License

Use under the terms of the [bpmn.io license](http://bpmn.io/license).

## Release

```
npm run release
```
