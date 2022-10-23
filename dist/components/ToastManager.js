"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toast = exports.ToastManager = void 0;
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var Toast_1 = __importDefault(require("./Toast"));
var ToastManager = /** @class */ (function () {
    function ToastManager() {
        this.toasts = [];
        var body = document.getElementsByTagName("body")[0];
        var toastContainer = document.createElement("div");
        toastContainer.id = "toast-container-main";
        body.insertAdjacentElement("beforeend", toastContainer);
        this.containerRef = toastContainer;
    }
    ToastManager.prototype.show = function (options) {
        var _this = this;
        var toastId = Math.random().toString(36).substr(2, 9);
        var toast = __assign(__assign({ id: toastId }, options), { destroy: function () { var _a; return _this.destroy((_a = options.id) !== null && _a !== void 0 ? _a : toastId); } });
        this.toasts = __spreadArray([toast], this.toasts, true);
        this.render();
    };
    ToastManager.prototype.destroy = function (id) {
        this.toasts = this.toasts.filter(function (toast) { return toast.id !== id; });
        this.render();
    };
    ToastManager.prototype.render = function () {
        var toastsList = this.toasts.map(function (toastProps) { return (react_1.default.createElement(Toast_1.default, __assign({ key: toastProps.id }, toastProps))); });
        react_dom_1.default.render(toastsList, this.containerRef);
    };
    return ToastManager;
}());
exports.ToastManager = ToastManager;
exports.toast = new ToastManager();
