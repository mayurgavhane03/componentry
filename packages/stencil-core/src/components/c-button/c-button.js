var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { Component, Prop, Event } from '@stencil/core';
let CButton = (() => {
    let _classDecorators = [Component({
            tag: 'c-button',
            styleUrl: 'c-button.css',
            shadow: true,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _variant_decorators;
    let _variant_initializers = [];
    let _variant_extraInitializers = [];
    let _size_decorators;
    let _size_initializers = [];
    let _size_extraInitializers = [];
    let _disabled_decorators;
    let _disabled_initializers = [];
    let _disabled_extraInitializers = [];
    let _label_decorators;
    let _label_initializers = [];
    let _label_extraInitializers = [];
    let _cClick_decorators;
    let _cClick_initializers = [];
    let _cClick_extraInitializers = [];
    var CButton = _classThis = class {
        constructor() {
            /**
             * Visual variant
             */
            this.variant = __runInitializers(this, _variant_initializers, 'primary');
            /**
             * Size
             */
            this.size = (__runInitializers(this, _variant_extraInitializers), __runInitializers(this, _size_initializers, 'md'));
            /**
             * Disabled state
             */
            this.disabled = (__runInitializers(this, _size_extraInitializers), __runInitializers(this, _disabled_initializers, false));
            /**
             * Button label
             */
            this.label = (__runInitializers(this, _disabled_extraInitializers), __runInitializers(this, _label_initializers, 'Button'));
            /**
             * Fired when button is clicked
             */
            this.cClick = (__runInitializers(this, _label_extraInitializers), __runInitializers(this, _cClick_initializers, void 0));
            this.handleClick = (__runInitializers(this, _cClick_extraInitializers), () => {
                if (this.disabled) {
                    return;
                }
                this.cClick.emit();
            });
        }
        render() {
            return (_jsx("button", { type: "button", class: `btn btn--${this.variant} btn--${this.size}`, disabled: this.disabled, onClick: this.handleClick, children: _jsx("slot", { children: this.label }) }));
        }
    };
    __setFunctionName(_classThis, "CButton");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _variant_decorators = [Prop()];
        _size_decorators = [Prop()];
        _disabled_decorators = [Prop()];
        _label_decorators = [Prop()];
        _cClick_decorators = [Event()];
        __esDecorate(null, null, _variant_decorators, { kind: "field", name: "variant", static: false, private: false, access: { has: obj => "variant" in obj, get: obj => obj.variant, set: (obj, value) => { obj.variant = value; } }, metadata: _metadata }, _variant_initializers, _variant_extraInitializers);
        __esDecorate(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: obj => "size" in obj, get: obj => obj.size, set: (obj, value) => { obj.size = value; } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
        __esDecorate(null, null, _disabled_decorators, { kind: "field", name: "disabled", static: false, private: false, access: { has: obj => "disabled" in obj, get: obj => obj.disabled, set: (obj, value) => { obj.disabled = value; } }, metadata: _metadata }, _disabled_initializers, _disabled_extraInitializers);
        __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label, set: (obj, value) => { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
        __esDecorate(null, null, _cClick_decorators, { kind: "field", name: "cClick", static: false, private: false, access: { has: obj => "cClick" in obj, get: obj => obj.cClick, set: (obj, value) => { obj.cClick = value; } }, metadata: _metadata }, _cClick_initializers, _cClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CButton = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CButton = _classThis;
})();
export { CButton };
