import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorComponentProps {
  data: string;
  onChange: (event: any, editor: any) => void;
}

const CKEditorComponent: React.FC<CKEditorComponentProps> = ({ data, onChange }) => {
  return (
    <div className="min-h-[400px] border rounded">
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: 'Start writing here...',
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'blockQuote',
            'insertTable',
            'undo',
            'redo'
          ]
        }}
        onReady={(editor: any) => {
          // You can store the "editor" and use it when needed.
          editor.setData(data);
        }}
        onChange={(event: any, editor: any) => {
          onChange(event, editor);
        }}
      />
    </div>
  );
};

export default CKEditorComponent;