import * as React from 'react';
import { render } from 'react-dom';
import { Editor } from './components/Editor';

import './index.css';

const initialValue = [
  'function x() {',
  '\tconsole.log("Hello world!");',
  '}',
].join('\n');

render(
  <React.StrictMode>
    <div>
      React Monaco
      <Editor
        language='typescript'
        initialValue={initialValue}
        className='monaco-editor'
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
