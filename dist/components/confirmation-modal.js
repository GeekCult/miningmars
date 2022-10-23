"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationModal = void 0;
var react_1 = __importDefault(require("react"));
var confirmation_modal_style_1 = require("../css/confirmation-modal.style");
var ConfirmationModal = function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(confirmation_modal_style_1.StyledModal, null,
            react_1.default.createElement(confirmation_modal_style_1.Message, null, props.message),
            react_1.default.createElement(confirmation_modal_style_1.ConfirmationButtons, null,
                react_1.default.createElement("button", { onClick: props.onCancel, className: "btn btn-second mgR0" }, "No"),
                react_1.default.createElement("button", { onClick: props.onConfirm, className: "btn btn-main" }, "Yes")))));
};
exports.ConfirmationModal = ConfirmationModal;
