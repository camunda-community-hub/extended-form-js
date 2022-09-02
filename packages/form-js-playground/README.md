# @camunda-community/form-js-playground

[![CI](https://github.com/camunda-community-hub/extended-form-js/workflows/CI/badge.svg)](https://github.com/camunda-community-hub/extended-form-js/actions?query=workflow%3ACI)

A tool to try out and explore [@camunda-community/extended-form-js](../extended-form-js) in a playful manner.

![Playground Screenshot](./resources/screenshot.png)


## Usage

Integrate the playground into your application:

```javascript
import '@camunda-community/form-js/dist/assets/form-js.css';
import '@camunda-community/form-js/dist/assets/form-js-editor.css';
import '@camunda-community/form-js/dist/assets/dragula.css';
import '@camunda-community/form-js/dist/assets/properties-panel.css';
import '@camunda-community/form-js-playground/dist/assets/form-js-playground.css';

import { Playground } from '@camunda-community/form-js-playground';

const playground = new Playground({
  container: document.querySelector('#container'),
  schema,
  data
});

const {
  schema,
  data
} = playground.getState();
```

## Resources

* [Demo](https://demo.bpmn.io/form)
* [Issues](https://github.com/camunda-community-hub-hub/form-js/issues)


## License

Use under the terms of the [bpmn.io license](http://bpmn.io/license).