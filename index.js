'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simpleSchemaToReduxFormValidator = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dotObject = require('dot-object');

var _dotObject2 = _interopRequireDefault(_dotObject);

var _simplSchema = require('simpl-schema');

var _simplSchema2 = _interopRequireDefault(_simplSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var schema = new _simplSchema2.default({
  testNumber: { type: Number },
  testString: { type: String },
  testObject: { type: Object },
  'testObject.string': { type: String },
  'testObject.number': { type: Number },
  testArray: { type: Array },
  'testArray.$': { type: Object },
  'testArray.$.string': { type: String },
  'testArray.$.number': { type: Number }
});

var ctx = schema.newContext();

var simpleSchemaToReduxFormValidator = exports.simpleSchemaToReduxFormValidator = function simpleSchemaToReduxFormValidator(schema, ctx) {
  return function (values) {
    ctx.validate(values);
    if (ctx.isValid()) return {};
    var ssErrors = ctx.validationErrors();
    // console.log('ssErrors', ssErrors)
    // console.log('ssErrors fields', ssErrors.map(s => s.name))
    var ssErrorFields = ssErrors.reduce(function (acc, s) {
      return _extends({}, acc, _defineProperty({}, s.name, undefined));
    }, {});
    var errorResult = _dotObject2.default.object(ssErrorFields);
    console.log('ssErrorFields', ssErrorFields, errorResult);
    var rfRes = ssErrors.reduce(function (acc, ssError) {
      // Avoid taking into account multiple errors on one field, takes only the first
      if (acc[ssError.name]) return acc;
      var type = schema.get(ssError.name, 'type')[0].type;
      // console.log('type', type)
      var ssMsg = ctx.keyErrorMessage(ssError.name);
      // console.log('ssMsg', ssMsg)
      // Field is a leaf in the model
      if (type !== Array) return _extends({}, acc, _defineProperty({}, ssError.name, ssMsg[1]));
      // Field is an array
      // console.log('res intermediary', { ...acc, [ssError.name]: { ...ssMsg[0] } })
      return _extends({}, acc, _defineProperty({}, ssError.name, _extends({}, ssMsg[0])));
    }, {});
    // console.log('rfRes', rfRes)
    return rfRes;
  };
};

var validator = simpleSchemaToReduxFormValidator(schema, ctx);
validator({
  testNumber: 0,
  testString: 'Test',
  testObject: {},
  testArray: []
});