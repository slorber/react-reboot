
import React from "react";
import {Div} from "glamorous";
import {debounce} from "lodash";

import CodeMirror from 'utils/codeMirror';
import {SpinnerOverlay} from "components/Spinner";


import PlaygroundDefaultInlineJS from "../../fixtures/playgroundDefault.js";


export default class Editor extends React.Component {
  static Throttle = 1000;
  state = {
    input: PlaygroundDefaultInlineJS,
    output: "",
    logger: [],
  };


  componentDidMount() {
    this.updateOutput(this.state.input);
  };

  updateOutput = value => {
    const transformPromise = getTransform(value);
    this.setState({transformPromise});
    transformPromise.then(
      ({output, logger}) => {
        if (transformPromise === this.state.transformPromise) {
          console.debug("transform success", logger);
          this.setState({output, logger, transformPromise: undefined});
        }
        else {
          console.debug("ignoring stale transform result", output, logger);
        }
      },
      e => {
        if (transformPromise === this.state.transformPromise) {
          console.error("transform error", e);
          this.setState({transformPromise: undefined});
        }
        else {
          console.warn("ignored transform error", e);
        }
      }
    );
    this.setState({input: value});
  };

  updateOutputThrottled = debounce(value => this.updateOutput(value), Editor.Throttle);




  onChangeInput = value => {
    this.setState({input: value});
    const immediateFeedbackPromise = new Promise((resolve) => {
      setTimeout(resolve,Editor.Throttle);
    });
    this.setState({transformPromise: immediateFeedbackPromise});
    this.updateOutputThrottled(value);
  };

  onChangeOutput = value => {
    this.setState({output: value});
  };

  render() {
    return (
      <Div
        flex={1}
        width="100%"
        display="flex"
        flexDirection="row"
      >
        <Window margin={20} marginRight={10}>
          <CodeMirrorEditor
            value={this.state.input}
            onChange={this.onChangeInput}
          />
        </Window>
        <Window margin={20} marginLeft={10} spinner={!!this.state.transformPromise}>
          <CodeMirrorEditor
            value={this.state.output}
            onChange={this.onChangeOutput}
          />
        </Window>
      </Div>
    )
  }
}


export const WindowControls = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
    <g fill="none" fillRule="evenodd" transform="translate(1 1)">
      <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" strokeWidth=".5" />
      <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" strokeWidth=".5" />
      <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" strokeWidth=".5" />
    </g>
  </svg>
);

const FlexColumnGrow = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const Window = ({children, spinner, ...rest}) => (
  <Div
    position="relative"
    background="#282a36"
    borderRadius={5}
    {...rest}
    {...FlexColumnGrow}
  >
    <Div
      padding={5}
      {...FlexColumnGrow}
    >
      <Div padding={5} flex={0}>
        <WindowControls/>
      </Div>
      <Div
        css={{
          ...FlexColumnGrow,
          "& .react-codemirror2": FlexColumnGrow,
          "& .react-codemirror2 > .CodeMirror": FlexColumnGrow,
        }}
      >
        {children}
      </Div>
    </Div>
    {spinner && <SpinnerOverlay zIndex={10}/>}
  </Div>
);


class CodeMirrorEditor extends React.PureComponent {
  static Options = {
    lineNumbers: true,
    mode: "jsx",
    theme: "dracula",
    scrollBarStyle: "overlay",
    viewportMargin: Infinity,
    lineWrapping: true,
    autoCursor: true,
    tabSize: 2,
    readOnly: false,
  };
  state = {show: false};
  componentDidMount() {
    this.setState({show: true});
  }
  handleChange = (editor, meta, code) => {
    console.debug("handleChange",code);
    this.props.onChange(code);
  };
  render() {
    if (!this.state.show) {
      return null;
    }
    return (
        <CodeMirror
          onBeforeChange={this.handleChange}
          value={this.props.value}
          options={CodeMirrorEditor.Options}
        />
    );
  }
}




function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
function parseJSON(response) {
  return response.json();
}
const getTransform = (input) => {
  return fetch('/transform', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input,
    })
  })
    .then(checkStatus)
    .then(parseJSON);
};




