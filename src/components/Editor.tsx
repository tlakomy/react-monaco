import * as React from 'react';
import * as monaco from 'monaco-editor';
import { Language } from '../types';

import { setupMonaco } from '../setupMonaco';

setupMonaco();

type Props = {
  language: Language;
  initialValue: string;
  className?: string;
};

function useMonacoEditor(
  containerRef: React.RefObject<HTMLDivElement>,
  { language, initialValue = '' }: Props,
) {
  const [value, setValue] = React.useState('');
  const editor = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const subscription = React.useRef<monaco.IDisposable>();

  React.useEffect(() => {
    if (containerRef.current) {
      editor.current = monaco.editor.create(containerRef.current, {
        value: initialValue,
        language,
      });

      subscription.current = editor.current.onDidChangeModelContent(() => {
        setValue(editor.current ? editor.current.getValue() : '');
      });

      setValue(editor.current.getValue());
    }
    return () => {
      editor.current?.dispose();
      subscription.current?.dispose();
    };
  }, []);

  return { value };
}

export const Editor = ({ className, ...props }: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { value } = useMonacoEditor(containerRef, props);

  return (
    <div>
      <div className={className} ref={containerRef}></div>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
};
