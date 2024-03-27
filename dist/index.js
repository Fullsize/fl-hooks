(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.useLocalStorage = exports.useAxios = void 0;
	const tslib_1 = require("tslib");
	const useAxios_1 = tslib_1.__importDefault(require("./useAxios"));
	exports.useAxios = useAxios_1.default;
	const useLocalStorage_1 = tslib_1.__importDefault(require("./useLocalStorage"));
	exports.useLocalStorage = useLocalStorage_1.default;

}));
