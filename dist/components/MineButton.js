"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useModal_1 = require("../components/useModal");
var MineButton = function (_a) {
    var Modal = _a.Modal;
    var _b = (0, useModal_1.useModal)(), isShown = _b.isShown, toggle = _b.toggle;
    var onConfirm = function () { return toggle(); };
    var onCancel = function () { return toggle(); };
    var runMine = function () {
        try {
            return (React.createElement(Modal, null));
        }
        catch (error) {
            console.log(error);
        }
    };
    return (React.createElement("div", { className: "MineButton bg-black2" },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: 'center p-20' },
                React.createElement("button", { className: "btn btn-orange btn-lg btn-mine", onClick: toggle },
                    React.createElement("i", { className: "fa fa-solid fa-trowel" }),
                    " Mine")))));
};
exports.default = MineButton;
