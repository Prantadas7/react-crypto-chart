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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var lightweight_charts_1 = require("lightweight-charts");
var TradeView = function (_a) {
    var initialChartData = _a.initialChartData, _b = _a.updatedata, updatedata = _b === void 0 ? null : _b, _c = _a.candleStickConfig, candleStickConfig = _c === void 0 ? {} : _c, _d = _a.histogramConfig, histogramConfig = _d === void 0 ? {} : _d, _e = _a.chartLayout, chartLayout = _e === void 0 ? {} : _e, _f = _a.containerStyle, containerStyle = _f === void 0 ? {
        maxWidth: '100%',
        maxHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    } : _f;
    var resizeObserver = (0, react_1.useRef)();
    var chartContainerRef = (0, react_1.useRef)();
    var chart = (0, react_1.useRef)();
    var candleSeries = (0, react_1.useRef)();
    var volumeSeries = (0, react_1.useRef)();
    var setInitialData = (0, react_1.useCallback)(function () {
        var _a, _b;
        candleSeries.current =
            (_a = chart === null || chart === void 0 ? void 0 : chart.current) === null || _a === void 0 ? void 0 : _a.addCandlestickSeries(candleStickConfig);
        candleSeries === null || candleSeries === void 0 ? void 0 : candleSeries.current.setData(initialChartData);
        volumeSeries.current = chart.current.addHistogramSeries(histogramConfig);
        (_b = volumeSeries === null || volumeSeries === void 0 ? void 0 : volumeSeries.current) === null || _b === void 0 ? void 0 : _b.setData(initialChartData);
        candleSeries.current.applyOptions({
            priceFormat: {
                type: 'price',
                precision: 5,
                minMove: 0.001,
            },
        });
    }, [initialChartData, candleStickConfig, histogramConfig]);
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if (updatedata) {
            (_a = candleSeries === null || candleSeries === void 0 ? void 0 : candleSeries.current) === null || _a === void 0 ? void 0 : _a.update(updatedata);
            (_b = volumeSeries === null || volumeSeries === void 0 ? void 0 : volumeSeries.current) === null || _b === void 0 ? void 0 : _b.update(updatedata);
        }
    }, [updatedata]);
    (0, react_1.useEffect)(function () {
        chart.current = (0, lightweight_charts_1.createChart)(chartContainerRef.current, __assign({ width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight }, chartLayout));
        setInitialData();
    }, [setInitialData, chartLayout]);
    // Resize chart on container resizes.
    (0, react_1.useEffect)(function () {
        resizeObserver.current = new ResizeObserver(function (entries) {
            var _a = entries[0].contentRect, width = _a.width, height = _a.height;
            chart.current.applyOptions({
                width: width,
                height: height,
                priceFormat: {
                    type: 'price',
                    precision: 5,
                    minMove: 0.001,
                },
            });
        });
        resizeObserver.current.observe(chartContainerRef.current);
        return function () { return resizeObserver.current.disconnect(); };
    }, []);
    return (react_1.default.createElement("div", { ref: chartContainerRef, className: "chartContainer", style: containerStyle }));
};
exports.default = (0, react_1.memo)(TradeView);
