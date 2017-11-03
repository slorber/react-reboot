# react-reboot
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

The easiest way to refresh your React components with up-to-date syntax.

The [Playground](https://react-reboot.now.sh/) is available to transform your react components online.

This is for now a very basic and unflexible MVP, so don't be angry if it does not work well and come back later :) 

Coming soon: Node API and CLI


#### Before

```javascript
var React = require('react');
var PureRenderMixin = require("react-addons-pure-render-mixin");

var HelloWorld = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    input: React.PropTypes.string.isRequired,
    bool: React.PropTypes.bool.isRequired
  },
  handleClick:    function(arg) {
    console.debug("debug " + arg,React.findDOMNode(this));
  },
  render() {
    var x = 2, y = 3, z = (!!x ? true : false);
    var {hey, ...rest} = {hey: "hello"}
    let newVar = Object.assign({hey},{x,y},rest);
    var myString = "[" + newVar.hey + newVar.x + "]" + " ---- " + someFn();
    debugger;
    return (
      <div
        onClick={this.handleClick}
        onMouseDown={function(e) {
          console.debug("test");
        }.bind(this)}
      >
        {myString}
      </div>
    )
  },
});
``` 

#### After
```javascript
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

class HelloWorld extends React.PureComponent {
  static propTypes = {
    input: PropTypes.string.isRequired,
    bool: PropTypes.bool.isRequired,
  };

  handleClick = arg => {
    console.debug(`debug ${arg}`, ReactDOM.findDOMNode(this));
  };

  render() {
    const x = 2;
    const y = 3;
    const z = !!x;
    const { hey, ...rest } = { hey: "hello" };
    const newVar = {
      hey,
      x,
      y,
      ...rest,
    };
    const myString = `[${newVar.hey}${newVar.x}] ---- ${someFn()}`;

    return (
      <div
        onClick={this.handleClick}
        onMouseDown={e => {
          console.debug("test");
        }}
      >
        {myString}
      </div>
    );
  }
}
``` 


# How it works

It simply runs in a row these 4 tools in a Node server, with an opiniated default configuration:

- JSCodeshift codemods
- ESLint rules with --fix
- Babel transforms (coming soon!)
- Prettier --write

# Problems

- Currently, no single tool solve every transform problem, and setting up and integrating all the available tools together is time consuming.

- Not all transforms available are bugfree, and figuring out which to run in which order 

- Some teams might prefer to update components gradually to avoid git conflicts. This tool focus on transforming completely files one by one, while other tools like JSCodeShift runner are focusing on running transforms one by one efficiently against a very large codebase like Facebook.


# TODO

- Better error handling in case of unparsable input
- Diplay transform log in playground
- Support other parsers (Flow...)
- Fine-tune transformation rules and order
- Publish Node API and CLI (without embedding codemods? licensing problem)
- Provide options (api + playground)
- Tests
- Help me :)

# Dev

Works with these versions:

```
  "engines": {
    "node": ">=6.9.0",
    "npm": ">=3.10.10",
    "yarn": ">=1.2.1"
  },
```

### Run local website / playground:

```
yarn install
yarn dev
```

# Sponsor

<img src="https://avatars1.githubusercontent.com/u/14985020?s=200&v=4" width="50"/>
Thanks to Zeit for sponsoring/hosting the project: it runs on NextJs and Now.

Thanks to Babel, Jscodeshift, ESlint, Prettier, and [Carbon](https://github.com/dawnlabs/carbon) for some design/layout/code inspiration.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/709456?v=4" width="100px;"/><br /><sub><b>Sutterlity Laurent</b></sub>](http://www.sutterlity.fr)<br />[💻](https://github.com/slorber/react-reboot/commits?author=sutter "Code") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!