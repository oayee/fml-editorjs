import EditorJS from '@editorjs/editorjs';
import Div from './div/div';
import TextInput from './text-input/text-input';
import TextAreaInput from './text-area-input/text-area-input';
import InputFile from './input-file/input-file';
import InlineTextInput from './inline-text-input';
import Delimiter from './delimiter/delimiter';
import Radio from './radio/radio';

const DragDrop = require('editorjs-drag-drop');
const Undo = require('editorjs-undo');

const List = require('@editorjs/list');
const Checklist = require('@editorjs/checklist');
const Header = require('@editorjs/header');
const Embed = require('@editorjs/embed');
const Table = require('@editorjs/table');
const SimpleImage = require('@editorjs/simple-image');
const Quote = require('@editorjs/quote');
const Warning = require('@editorjs/warning');
const CodeTool = require('@editorjs/code');
const RawTool = require('@editorjs/raw');
const AnyButton = require('editorjs-button');
const Underline = require('@editorjs/underline');
const InlineCode = require('@editorjs/inline-code');
const Marker = require('@editorjs/marker');

function init() {
  const editor = new EditorJS({
    holder: 'editor',
    autofocus: true,
    defaultBlock: 'customDiv',
    placeholder: 'Custom placeholder',
    onReady: () => {
      new DragDrop(editor);
      new Undo({ editor });
    },
    tools: {
      Marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
      },
      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
      },
      underline: Underline,
      AnyButton: {
        class: AnyButton,
        inlineToolbar: false,
        config: {
          css: {
            'btnColor': 'btn--gray',
          }
        }
      },
      code: CodeTool,
      raw: RawTool,
      warning: {
        class: Warning,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+W',
        config: {
          titlePlaceholder: 'Title',
          messagePlaceholder: 'Message',
        },
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+O',
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: 'Quote\'s author',
        },
      },
      image: SimpleImage,
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3,
        },
      },
      delimiter: {
        class: Delimiter
      },
      embed: {
        class: Embed,
        inlineToolbar: true
      },
      header: {
        class: Header,
        config: {
          placeholder: 'Enter a header',
          levels: [2, 3, 4],
          defaultLevel: 3
        }
      },
      marker: InlineTextInput,
      customDiv: {
        class: Div,
        inlineToolbar: true,
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      radio: {
        class: Radio,
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
