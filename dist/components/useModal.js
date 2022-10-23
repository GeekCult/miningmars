"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = void 0;
var react_1 = require("react");
var useModal = function () {
    var _a = (0, react_1.useState)(false), isShown = _a[0], setIsShown = _a[1];
    var toggle = function () { return setIsShown(!isShown); };
    return {
        isShown: isShown,
        toggle: toggle,
    };
};
exports.useModal = useModal;
