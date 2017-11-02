const fs = require("fs");
const jscodeshiftCore = require("jscodeshift");
const prettier = require("prettier");
const eslint = require("eslint");
const babel = require("babel-core");
const babylon = require("babylon");

require('babel-register')({
  babelrc: false,
  presets: [
    require('babel-preset-es2015'),
    require('babel-preset-stage-1'),
  ],
  plugins: [
    require('babel-plugin-transform-flow-strip-types'),
    require('babel-plugin-transform-inline-consecutive-adds'),
  ]
});


// Hacky backport of the babel.parse function that is expected by jscodeshift
// https://github.com/babel/babel/blob/5.x/packages/babel/src/api/node.js
babel.parse = (code, opts = {}) => {
  opts.allowHashBang = true;
  opts.sourceType = "module";
  opts.ecmaVersion = Infinity;
  /*
  opts.plugins = {
    jsx: true,
    flow: true,
  };
  opts.features = {
    "es7.trailingFunctionCommas": true,
    "es7.asyncFunctions": true,
    "es7.decorators": true,
    "es7.classProperties": true,
    "es7.doExpressions": true,
    "es7.exportExtensions": true,
    "es7.functionBind": true,
    "es7.functionSent": true,
    "es7.objectRestSpread": true,
    "es7.dynamicImport": true,
  };
  */

  opts.plugins =  [
    "estree",
    "flow",
    "jsx",
    "asyncGenerators",
    "classProperties",
    "doExpressions",
    "exportExtensions",
    "functionBind",
    "functionSent",
    "objectRestSpread",
    "dynamicImport"
  ];

  /*
  opts.features = {};
  for (var key in transform.pipeline.transformers) {
    opts.features[key] = true;
  }
  */
  const ast = babylon.parse(code, opts);
  if (opts.onToken) {
    opts.onToken.push(...ast.tokens);
  }

  if (opts.onComment) {
    opts.onComment.push(...ast.comments);
  }
  return ast.program;
};


const jscodeshift = jscodeshiftCore.withParser(babel);


const Api = {
  j: jscodeshift,
  jscodeshift: jscodeshift,
  stats: {}
};


const Transforms = [
  {
    transform: require("5to6-codemod/transforms/amd.js"),
    options: {},
  },
  {
    transform: require("5to6-codemod/transforms/cjs.js"),
    options: {},
  },
  {
    transform: require("5to6-codemod/transforms/exports.js"),
    options: {},
  },
  {
    transform: require("5to6-codemod/transforms/named-export-generation.js"),
    options: {},
  },
  {
    transform: require("5to6-codemod/transforms/let.js"),
    options: {},
  },
  {
    transform: require("5to6-codemod/transforms/simple-arrow.js"),
    options: {},
  },
  {
    transform: require("5to6-codemod/transforms/no-strict.js"),
    options: {},
  },
  {
    transform: require("5to6-codemod/transforms/import-cleanup.js"),
    options: {},
  },
  {
    transform: require("../../codemods/react-codemod/transforms/error-boundaries.js"),
    options: {},
  },
  {
    transform: require("../../codemods/react-codemod/transforms/create-element-to-jsx.js"),
    options: {},
  },
  {
    transform: require("../../codemods/react-codemod/transforms/findDOMNode.js"),
    options: {},
  },
  {
    transform: require("../../codemods/react-codemod/transforms/React-PropTypes-to-prop-types.js"),
    options: {},
  },
  {
    transform: require("../../codemods/js-codemod/transforms/arrow-function-arguments.js"),
    options: {},
  },
  {
    transform: require("../../codemods/js-codemod/transforms/arrow-function.js"),
    options: {},
  },
  {
    transform: require("../../codemods/js-codemod/transforms/invalid-requires.js"),
    options: {},
  },
  {
    transform: require("../../codemods/js-codemod/transforms/outline-require.js"),
    options: {},
  },
  {
    transform: require("../../codemods/js-codemod/transforms/no-vars.js"),
    options: {},
  },
  {
    transform: require("../../codemods/js-codemod/transforms/rm-merge.js"),
    options: {},
  },
  {
    transform: require("../../codemods/js-codemod/transforms/rm-copyProperties.js"),
    options: {},
  },
  {
    transform: require("../../codemods/js-codemod/transforms/rm-object-assign.js"),
    options: {},
  },
  {
    transform: require("../../codemods/js-codemod/transforms/rm-requires.js"),
    options: {},
  },
  {
    transform: require("../../codemods/js-codemod/transforms/template-literals.js"),
    options: {},
  },
  {
    transform: require("../../codemods/js-codemod/transforms/unchain-variables.js"),
    options: {},
  },
  {
    transform: require("../../codemods/js-codemod/transforms/object-shorthand.js"),
    options: {},
  },
  {
    transform: require("../../codemods/react-codemod/transforms/manual-bind-to-arrow.js").default,
    options: {},
  },
  {
    transform: require("../../codemods/react-codemod/transforms/react-to-react-dom.js"),
    options: {},
  },
  {
    transform: require("../../codemods/react-codemod/transforms/pure-render-mixin.js"),
    options: {"pure-component": true},
  },
  {
    transform: require("../../codemods/react-codemod/transforms/class.js"),
    options: {"pure-component": true},
  },
  {
    transform: require("../../codemods/react-codemod/transforms/pure-component.js"),
    options: {"useArrows": true, "destructuring": true},
  }
];



const applyTransform = (transform, options, input,logger) => {
  const output = transform(
    {
      path: "react-reboot-string.js",
      source: input,
    },
    Api,
    options
  );
  //console.log("single transform output: ",output);
  logger.push("Transform: input === output? => " + (input === output));
  return output ? output : input;
};


const applyTransforms = (transforms,input,logger) => {
  const output = transforms.reduce(
    (currentSource, {transform, options}) => {
      try {
        return applyTransform(transform, options, currentSource,logger);
      }
      catch (e) {
        console.log("transform error",e);
        logger.push("transform error: " + e.message);
        return currentSource;
      }
    },
    input
  );
  logger.push("Codemod: input !== output? => " + (input !== output));
  logger.push("output",output);
  return output;
};



const PrettierOptions = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
};

const applyPrettier = (input,logger) => {
  try {
    const output = prettier.format(input, PrettierOptions);
    return output ? output : input;
  } catch (e) {
    console.error("Prettier failure",e);
    logger.push("Prettier failure: "+e.message);
    return input;
  }
};



const applyESLint = (input,logger) => {
  try {
    const eslintConfig = {
      fix: true,
      parser: "babel-eslint",
      plugins: [
        "react",
        "react-native",
      ],
      rules: {
        "no-extra-boolean-cast": 2,
        "no-debugger": 2,
        "no-extra-parens": 2,
        "no-regex-spaces": 2,
        "curly": 2,
        "dot-location": 2,
        "dot-notation": 2,
        "eqeqeq": 2,
        "no-extra-bind": 2,
        "no-useless-return": 2,
        "yoda": 2,
        "wrap-iife": 2,
        "no-unneeded-ternary": 2,

        // ES6:
        "arrow-body-style": 2,
        "arrow-spacing": 2,
        "generator-star-spacing": 2,
        "no-var": 2,
        "no-useless-rename": 2,
        "no-useless-computed-key": 2,
        "prefer-arrow-callback": 2,
        "prefer-const": 2,
        "prefer-spread": 2,
        "yield-star-spacing": 2,
        "template-curly-spacing": 2,

        "react/no-unknown-property": 2,
        "react/self-closing-comp": 2,

        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 2,
        "react-native/no-color-literals": 2,
      }
    };



    const engine = new eslint.CLIEngine(eslintConfig);
    const report = engine.executeOnText(input) ;
    const {messages,output} = report.results[0];
    const fixed = output !== input;

    if ( fixed ) {
      logger.push("ESLint fixed the code!");
      messages.forEach(message => {
        logger.push(`[${message.line}][${message.ruleId}] ${message.message}`)
      });
      return output;
    }
    else {
      logger.push("ESLint didn't fix the code");
      return input;
    }

  } catch(e) {
    console.error("ESLint failure",e);
    logger.push("ESLint failure: "+e.message);
    return input;
  }
};

/*
presets: [
  require('babel-preset-es2015'),
  require('babel-preset-stage-1'),
],
plugins: [
  require('babel-plugin-transform-flow-strip-types'),
  require('babel-plugin-transform-inline-consecutive-adds'),
]
*/

const applyBabel = (input,logger) => {
  try {
    const result = babel.transform(input,{
      babelrc: false,
      presets: [
        'es2015',
        'stage-1',
      ],
      plugins: [
        //'syntax-jsx',
        'transform-flow-strip-types',
        'transform-inline-consecutive-adds',
      ]
    });
    //console.log("result:",JSON.stringify(result,null,2));
    const {output,map,ast} = result;
    //console.log(output);
    return output ? output : input;
  } catch (e) {
    console.error("Babel transform failure",e);
    logger.push("Babel transform failure: "+e.message);
    return input;
  }
};



const transform = (input) => {
  try {
    babel.parse(input);
  } catch(e) {
    throw new Error("Unable to parse code with Babel. Reason=" + e.message);
  }
  const logger = [];
  let output = input;
  output = applyTransforms(Transforms,output,logger);
  output = applyESLint(output,logger);
  output = applyBabel(output,logger);
  output = applyPrettier(output,logger);
  return {output,logger};
};
exports.transform = transform;



const test = () => new Promise((resolve, reject) => {
  const inputFile = "../fixtures/input1.js";
  fs.readFile(inputFile, (err, source) => {
    if (err) reject(err);
    const {output,logger} = transform(
      Transforms,
      source.toString()
    );
    console.log(output);
    console.log(JSON.stringify(logger,null,2));
    resolve(output);
  });
});
exports.test = test;


