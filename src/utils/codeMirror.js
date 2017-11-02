
// See https://github.com/dawnlabs/carbon/blob/bdc9211d25196dba9a00244ff23fed7d7b44ed73/lib/react-codemirror.js

// For SSR, CodeMirror will throw an error, so return a div instead
let CodeMirror = 'div'
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  CodeMirror = require('react-codemirror2-mobile').Controlled;
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/xml/xml');
  require('codemirror/mode/jsx/jsx');
}
export default CodeMirror