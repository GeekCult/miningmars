"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var modal_style_1 = require("../css/modal.style");
var Modal = function (_a) {
    var isShown = _a.isShown, hide = _a.hide, modalContent = _a.modalContent, headerText = _a.headerText;
    var modal = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(modal_style_1.Backdrop, null),
        react_1.default.createElement(modal_style_1.Wrapper, null,
            react_1.default.createElement(modal_style_1.StyledModal, null,
                react_1.default.createElement(modal_style_1.Header, null,
                    react_1.default.createElement(modal_style_1.HeaderText, null, headerText),
                    react_1.default.createElement(modal_style_1.CloseButton, { onClick: hide },
                        react_1.default.createElement("i", { className: "fa fa-times" }))),
                react_1.default.createElement(modal_style_1.Content, null, modalContent)))));
    return isShown ? react_dom_1.default.createPortal(modal, document.body) : null;
};
exports.Modal = Modal;
