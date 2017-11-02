var React = require('react');
var PureRenderMixin = require("react-addons-pure-render-mixin");

var HelloWorld = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },
  sayHello:     function(name) {
    alert("Hello " + name)
  },
  render() {
    var name = this.props.name;
    return (
      <div
        onClick={function(e) {
          this.sayHello(name);
        }.bind(this)}
      >
        {React.createElement("div",{className: "button"},<span>Say hello</span>)}
      </div>
    )
  },
});
