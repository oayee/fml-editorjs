import EditorJS from '@editorjs/editorjs';
import Div from './div/div';
import TextInput from './text-input/text-input';
import TextAreaInput from './text-area-input/text-area-input';
import InputFile from './input-file/input-file';
import InlineTextInput from './inline-text-input';

const List = require('@editorjs/list');
const Checklist = require('@editorjs/checklist');

function init() {
  const editor = new EditorJS({
    holder: 'editor',
    autofocus: true,
    defaultBlock: 'customDiv',
    placeholder: 'Custom placeholder',
    tools: {
      marker: InlineTextInput,
      customDiv: {
        class: Div,
        inlineToolbar: true,
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      textInput: {
        class: TextInput
      },
      textAreaInput: {
        class: TextAreaInput
      },
      inputFile: {
        class: InputFile
      },
      list: {
        class: List,
        inlineToolbar: true,
      },
    }
  });

  const saveButton = document.getElementById('save-button');
  const output = document.getElementById('output');

  saveButton!.addEventListener('click', () => {
    editor.save().then(savedData => {
      output!.innerHTML = JSON.stringify(savedData, null, 4);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});
