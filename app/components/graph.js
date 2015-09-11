/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************************!*\
  !*** ./app/components/graph-dev.js ***!
  \*************************************/
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ChartContainer = (function (_React$Component) {
		_inherits(ChartContainer, _React$Component);
	
		function ChartContainer() {
			_classCallCheck(this, ChartContainer);
	
			_get(Object.getPrototypeOf(ChartContainer.prototype), 'constructor', this).call(this);
			this.state = { data: [] };
		}
	
		_createClass(ChartContainer, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				$.ajax({
					url: "data.json",
					dataType: 'json',
					success: (function (data) {
						this.setState({ data: data });
					}).bind(this)
				});
			}
		}, {
			key: 'render',
			value: function render() {
				console.log('something');
				console.log(this.props.type);
				return React.createElement(Chart, { data: this.state.data });
			}
		}]);
	
		return ChartContainer;
	})(React.Component);
	
	var Chart = (function (_React$Component2) {
		_inherits(Chart, _React$Component2);
	
		function Chart(props) {
			_classCallCheck(this, Chart);
	
			_get(Object.getPrototypeOf(Chart.prototype), 'constructor', this).call(this, props);
		}
	
		_createClass(Chart, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'chart-container' },
					' ',
					this.renderChart({ chartType: 'pie', chartData: this.props.data }),
					' '
				);
			}
		}, {
			key: 'renderChart',
			value: function renderChart(_ref) {
				var chartType = _ref.chartType;
				var chartData = _ref.chartData;
	
				var modifiedData = {};
				var chartKeys = [];
	
				this.props.data.forEach(function (elem) {
					chartKeys.push(elem.label);
					modifiedData[elem.label] = elem.value;
				});
	
				c3.generate({
					bindto: '.chart-container',
					data: {
						json: [modifiedData],
						keys: {
							value: chartKeys
						},
						type: chartType
					}
				});
			}
		}]);
	
		return Chart;
	})(React.Component);
	
	React.render(React.createElement(ChartContainer, { type: 'pie' }), document.querySelector('#container'));

/***/ }
/******/ ]);
//# sourceMappingURL=graph.js.map