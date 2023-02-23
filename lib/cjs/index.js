"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var fetchService_1 = require("./utils/fetchService");
var TradeView_1 = __importDefault(require("./TradeView"));
var urls_1 = require("./utils/urls");
var adaptor_1 = require("./utils/adaptor");
var constants_1 = require("./utils/constants");
var TradeViewChart = function (_a) {
    var _b = _a.pair, pair = _b === void 0 ? 'BTCBUSD' : _b, _c = _a.interval, interval = _c === void 0 ? '1m' : _c, _d = _a.useFuturesTestnet, useFuturesTestnet = _d === void 0 ? false : _d, _e = _a.useSpotTestnet, useSpotTestnet = _e === void 0 ? false : _e, _f = _a.candleStickConfig, candleStickConfig = _f === void 0 ? constants_1.condleStickDefaultConfig : _f, _g = _a.histogramConfig, histogramConfig = _g === void 0 ? constants_1.histogramDefaultConfig : _g, _h = _a.chartLayout, chartLayout = _h === void 0 ? constants_1.defaultChartLayout : _h, containerStyle = _a.containerStyle;
    var _j = (0, react_1.useState)(null), candleStickData = _j[0], setCandleData = _j[1];
    var _k = (0, react_1.useState)(null), updatedata = _k[0], setUpdateData = _k[1];
    var fetchCandleData = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var candleData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, fetchService_1.fetchCandleStickData)(pair, interval, useFuturesTestnet, useSpotTestnet)];
                case 1:
                    candleData = _a.sent();
                    setCandleData(candleData);
                    return [2 /*return*/];
            }
        });
    }); }, [pair, useFuturesTestnet, useSpotTestnet]);
    (0, react_1.useEffect)(function () {
        fetchCandleData();
    }, [fetchCandleData]);
    (0, react_1.useEffect)(function () {
        var ws = new WebSocket("".concat((0, urls_1.getWebsocketUrl)(useFuturesTestnet, useSpotTestnet), "/").concat(pair.toLocaleLowerCase(), "@kline_").concat(interval));
        // ws.onopen = () => console.log("open");
        ws.onmessage = function (e) {
            var message = JSON.parse(e.data);
            var parsedMessage = (0, adaptor_1.candleSocketAdaptor)(message);
            setUpdateData(parsedMessage);
        };
        return function () {
            ws.close();
        };
    }, [pair, interval]);
    if (!candleStickData) {
        return react_1.default.createElement("div", { className: "loader" });
    }
    return (react_1.default.createElement(TradeView_1.default, { updatedata: updatedata, initialChartData: candleStickData, candleStickConfig: candleStickConfig, histogramConfig: histogramConfig, chartLayout: chartLayout, containerStyle: containerStyle }));
};
exports.default = (0, react_1.memo)(TradeViewChart);
