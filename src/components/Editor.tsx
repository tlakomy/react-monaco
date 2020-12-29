import * as React from 'react';
import * as monaco from 'monaco-editor';
import { setupMonaco } from '../setupMonaco';
import { Language } from '../types';

setupMonaco();

/**
 * For now we'll allow any prop from monaco.editor.IStandaloneEditorConstructionOptions
 * to be passed in to Editor component. In the future we'll most likely limit the set of possible props
 * in order not to expose a giant API
 */
type Props = {
  language: Language;
  className?: string;
} & monaco.editor.IStandaloneEditorConstructionOptions;

function useMonacoEditor(
  containerRef: React.RefObject<HTMLDivElement>,
  { language, ...props }: Props,
) {
  const [value, setValue] = React.useState('');
  const editor = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const subscription = React.useRef<monaco.IDisposable>();

  React.useEffect(() => {
    if (containerRef.current) {
      /**
       * This is the crucial part - creating the Monaco Editor itself
       * props are of type monaco.editor.IStandaloneEditorConstructionOptions
       * Docs: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html
       */
      editor.current = monaco.editor.create(containerRef.current, {
        language,
        ...props,
      });

      /**
       * Setting up a subscrption to editor value
       * This is a simple example but the hook will always return a current value
       * (that is - code) provided by the user
       */
      subscription.current = editor.current.onDidChangeModelContent(() => {
        setValue(editor.current ? editor.current.getValue() : '');
      });

      setValue(editor.current.getValue());
    }
    return () => {
      // Cleaning up the subscriptions when this component unmounts
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
