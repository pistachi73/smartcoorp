import { memo, useContext } from 'react';

import { PostEditorToolContext } from '../contexts/tool-context';

export const TestBlock = memo(() => {
  console.log('rendering test block');
  const { setCurrentTool } = useContext(PostEditorToolContext);
  return (
    <div>
      <TestBlocContent></TestBlocContent>
    </div>
  );
});

const TestBlocContent = memo(() => {
  console.log('rendering test block content');

  return <div>content</div>;
});
