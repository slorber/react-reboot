var React = require('React');
var PureRenderMixin = require("react-addons-pure-render-mixin")

var someFn1 = function() {
  var x = 3;
  var y = 5;
  var args = [x, y];
  return Math.max.apply(Math, args).map(function(n) {return n * 2;});
};

var someFn2 = function() {
  return "string";
};

function someFn3() {
  return someFn2() + someFn1();
};

var HelloWorld = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    input: React.PropTypes.string.isRequired,
    bool: React.PropTypes.bool.isRequired
  },


  handleClick:    function(arg) {
    alert("click " + arg)
  },

  render() {
    var x = 2, y = 3;
    var {hey, ...rest} = {hey: "hello"}
    let newVar = Object.assign({hey},{x,y},rest);
    var myString = "[" + newVar.hey + newVar.x + "]" + " ---- " + someFn3();

    var z = !!x ? true : false;
    debugger;
    return (
      <div
        onClick={this.handleClick}

        onMouseDown={function(e) {
          console.debug("test");
        }.bind(this)}
      >
        {React.createElement("div",
          {style: {width: 10}},(
            <span>children</span>))}

        <div weirdProperty="str"></div>

      </div>
    )
  },
});


