var React = require('react');
var PureRenderMixin = require("react-addons-pure-render-mixin");

var someFn = function() {
  var args = [3, 4].concat([5,6]);
  return Math.max.apply(Math, args).map(function(n) {return n * 2;});
};

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
    var x = 2, y = (!!x ? true : false);
    let newVar = Object.assign({},{x,y},this.props);
    var myString = "[" + newVar.x + "]" + " ---- " + someFn();
    debugger;
    return (
      <div
        onClick={this.handleClick}
        onMouseDown={function(e) {
          console.debug("test");
        }.bind(this)}
      >
        {React.createElement(
          SomeDiv,
          {className: myString},
          <span>children</span>
        )}
      </div>
    )
  },
});

var SomeDiv = React.createClass({
  render() {
    const {width, height, ...rest} = this.props;
    return (
      <div style={{width, height}} {...rest}>
        {React.createElement(
          SomeComponent,
          {style: {width: 10}},
          <span>children</span>
        )}
      </div>
    )
  },
});

class SomeComponent extends React.Component {
  constructor() {
    super()
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    console.debug("debug");
  }
  render() {
    return <div className="className"></div>;
  }
}
