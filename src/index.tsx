import * as React from 'react';
import { render } from 'react-dom';
import { Editor } from './components/Editor';

import './index.css';

render(
  <React.StrictMode>
    <div>
      React Monaco
      <Editor language='typescript' />
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
