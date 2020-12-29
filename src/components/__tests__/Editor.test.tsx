import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Editor } from '../Editor';

describe('Editor', () => {
  it('renders', () => {
    render(<Editor language='typescript' />);
  });
});
