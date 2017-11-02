
import React from "react";
import {Div} from "glamorous";
import {debounce} from "lodash";

import CodeMirror from 'utils/codeMirror';
import {SpinnerOverlay} from "components/Spinner";


import PlaygroundDefaultInlineJS from "../fixtures/playgroundDefault.js";
import PlaygroundDefaultMobileInlineJS from "../fixtures/playgroundDefaultMobile.js";
import {MediaQueries} from "constants";


const isProbablyMobile = userAgent => {
  return typeof userAgent === 'undefined'
    || userAgent.match(/Android/i)
    || userAgent.match(/webOS/i)
    || userAgent.match(/iPhone/i)
    || userAgent.match(/iPad/i)
    || userAgent.match(/iPod/i)
    || userAgent.match(/BlackBerry/i)
    || userAgent.match(/Windows Phone/i);
};

// For mobile we want a simplified input to showcase the tool because user has a small screen to view large examples
// We have to infer mobile usage from user agent unreliably but it's good enough
const getInitialInput = (req) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return isProbablyMobile(userAgent) ?
    PlaygroundDefaultMobileInlineJS :
    PlaygroundDefaultInlineJS;
};

export default class Editor extends React.Component {

  static async getInitialProps({ req }) {
    const initialInput = getInitialInput(req);
    return { initialInput };
  }

  static Throttle = 1000;
  static DefaultOutput = "";
  static DefaultLogger = [];

  state = {
    input: this.props.initialInput,
    output: "",
    logger: Editor.DefaultLogger,
  };


  componentDidMount() {
    this.updateOutputImmediate(this.state.input);
  };
  componentWillUnmount() {
    this.unmounted = true;
  }

  updateOutputImmediate = value => {
    const transformPromise = getTransform(value);
    this.setState({
      transformPromise,
      output: Editor.DefaultOutput,
      logger: Editor.DefaultLogger,
      error: undefined
    });
    transformPromise.then(
      ({output, logger}) => {
        if (!this.unmounted && transformPromise === this.state.transformPromise) {
          console.debug("transform success", logger);
          this.setState({
            output,
            logger,
            transformPromise: undefined,
          });
        }
        else {
          console.debug("ignoring stale transform result", output, logger);
        }
      },
      e => {
        if (!this.unmounted && transformPromise === this.state.transformPromise) {
          console.error("transform error", e);
          this.setState({
            transformPromise: undefined,
            output: Editor.DefaultOutput,
            logger: Editor.DefaultLogger,
            error: e
          });
        }
        else {
          console.warn("ignored transform error", e);
        }
      }
    );
    this.setState({input: value});
  };

  updateOutputDebounced = debounce(
    value => this.updateOutputImmediate(value),
    Editor.Throttle,
  );


  onChangeInput = value => {
    this.setState({
      input: value,
      output: Editor.DefaultOutput,
      logger: Editor.DefaultLogger,
      error: undefined,
      // if we are ignoring the change due to debouncing
      // we still want a spinner to immediately appear
      // we know for sure the promise will be replaced on debounced call
      transformPromise: new Promise(() => {}),
    });
    this.updateOutputDebounced(value);
  };

  onChangeOutput = value => {
    this.setState({output: value});
  };

  render() {
    const {
      input,
      output,
      transformPromise,
      logger,
      error,
    } = this.state;
    return (
      <Div
        css={{
          padding: "0 20px",
          [MediaQueries.large]: {
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          },
          [MediaQueries.small]: {
            width: '100%',
          },
        }}
      >
        <Window
          title="before"
          css={{
            [MediaQueries.large]: {
              marginRight: 20,
            }
          }}
        >
          <CodeMirrorEditor
            value={input}
            onChange={this.onChangeInput}
          />
        </Window>
        <Window
          title="after"
          css={{
            [MediaQueries.small]: {
              marginTop: 20,
            },
          }}
          spinner={!!transformPromise}
          error={error}
        >
          <CodeMirrorEditor
            value={output}
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

const Window = ({children, title, spinner, error, css = {}, ...rest}) => (
  <Div
    position="relative"
    background="#282a36"
    borderRadius={5}
    {...rest}
    {...FlexColumnGrow}
    css={{
      ...css,
      [MediaQueries.small]: {
        ...css[MediaQueries.small],
        height: "38vh",
        minHeight: 250,
      },
    }}
  >
    <Div
      padding={5}
      {...FlexColumnGrow}
    >
      <Div
        padding={5}
        flex={0}
      >
        <Div
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Div flex={0}>
            <WindowControls/>
          </Div>
          <Div
            flex={1}
            marginBottom={3}
            marginLeft={10}
          >
            {title}
          </Div>
        </Div>
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
    {error && (
      <Div
        position="absolute"
        width="100%"
        height="100%"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Div
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Div padding={20} fontSize={30} color={"red"}>Error</Div>
          <Div padding={20} fontSize={20} color={"red"}>{error.message}</Div>
        </Div>
      </Div>
    )}
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
    this.props.onChange(code);
  };
  render() {
    if (!this.state.show) {
      return <SpinnerOverlay zIndex={10}/>;
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
  }
  else {
    return response.text().then(text => {
      const error = new Error(text);
      error.response = response;
      throw error;
    });
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




