/*!
 * Cropper v3.1.3
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright (c) 2014-2017 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2017-10-21T10:04:29.734Z
 */
!function(t, i) {
    "object" == typeof exports && "undefined" != typeof module ? i(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], i) : i(t.jQuery)
}(this, function(t) {
    "use strict";
    function i(t) {
        if (Array.isArray(t)) {
            for (var i = 0, e = Array(t.length); i < t.length; i++)
                e[i] = t[i];
            return e
        }
        return Array.from(t)
    }
    function e(t) {
        return "string" == typeof t
    }
    function a(t) {
        return "number" == typeof t && !z(t)
    }
    function n(t) {
        return void 0 === t
    }
    function o(t, i) {
        for (var e = arguments.length, a = Array(e > 2 ? e - 2 : 0), n = 2; n < e; n++)
            a[n - 2] = arguments[n];
        return function() {
            for (var e = arguments.length, n = Array(e), o = 0; o < e; o++)
                n[o] = arguments[o];
            return t.apply(i, a.concat(n))
        }
    }
    function h(t) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e11;
        return N.test(t) ? Math.round(t * i) / i : t
    }
    function r(t) {
        var i = t.match(L);
        return i && (i[1] !== R.protocol || i[2] !== R.hostname || i[3] !== R.port)
    }
    function s(t) {
        var i = "timestamp=" + (new Date).getTime();
        return t + (-1 === t.indexOf("?") ? "?" : "&") + i
    }
    function c(t) {
        var i = t.rotate
          , e = t.scaleX
          , n = t.scaleY
          , o = t.translateX
          , h = t.translateY
          , r = [];
        return a(o) && 0 !== o && r.push("translateX(" + o + "px)"),
        a(h) && 0 !== h && r.push("translateY(" + h + "px)"),
        a(i) && 0 !== i && r.push("rotate(" + i + "deg)"),
        a(e) && 1 !== e && r.push("scaleX(" + e + ")"),
        a(n) && 1 !== n && r.push("scaleY(" + n + ")"),
        r.length ? r.join(" ") : "none"
    }
    function d(t, i) {
        if (!t.naturalWidth || A) {
            var e = document.createElement("img");
            e.onload = function() {
                i(e.width, e.height)
            }
            ,
            e.src = t.src
        } else
            i(t.naturalWidth, t.naturalHeight)
    }
    function l(i) {
        var e = t.extend({}, i)
          , a = [];
        return t.each(i, function(i, n) {
            delete e[i],
            t.each(e, function(t, i) {
                var e = Math.abs(n.startX - i.startX)
                  , o = Math.abs(n.startY - i.startY)
                  , h = Math.abs(n.endX - i.endX)
                  , r = Math.abs(n.endY - i.endY)
                  , s = Math.sqrt(e * e + o * o)
                  , c = (Math.sqrt(h * h + r * r) - s) / s;
                a.push(c)
            })
        }),
        a.sort(function(t, i) {
            return Math.abs(t) < Math.abs(i)
        }),
        a[0]
    }
    function p(i, e) {
        var a = i.pageX
          , n = i.pageY
          , o = {
            endX: a,
            endY: n
        };
        return e ? o : t.extend({
            startX: a,
            startY: n
        }, o)
    }
    function m(i) {
        var e = 0
          , a = 0
          , n = 0;
        return t.each(i, function(t, i) {
            var o = i.startX
              , h = i.startY;
            e += o,
            a += h,
            n += 1
        }),
        e /= n,
        a /= n,
        {
            pageX: e,
            pageY: a
        }
    }
    function g(t) {
        var i = t.aspectRatio
          , e = t.height
          , a = t.width
          , n = function(t) {
            return I(t) && t > 0
        };
        return n(a) && n(e) ? e * i > a ? e = a / i : a = e * i : n(a) ? e = a / i : n(e) && (a = e * i),
        {
            width: a,
            height: e
        }
    }
    function u(t) {
        var i = t.width
          , e = t.height
          , a = t.degree;
        if ((a = Math.abs(a)) % 180 == 90)
            return {
                width: e,
                height: i
            };
        var n = a % 90 * Math.PI / 180
          , o = Math.sin(n)
          , h = Math.cos(n);
        return {
            width: i * h + e * o,
            height: i * o + e * h
        }
    }
    function f(e, a, n, o) {
        var r = a.naturalWidth
          , s = a.naturalHeight
          , c = a.rotate
          , d = void 0 === c ? 0 : c
          , l = a.scaleX
          , p = void 0 === l ? 1 : l
          , m = a.scaleY
          , u = void 0 === m ? 1 : m
          , f = n.aspectRatio
          , v = n.naturalWidth
          , w = n.naturalHeight
          , x = o.fillColor
          , b = void 0 === x ? "transparent" : x
          , y = o.imageSmoothingEnabled
          , C = void 0 === y || y
          , M = o.imageSmoothingQuality
          , $ = void 0 === M ? "low" : M
          , B = o.maxWidth
          , k = void 0 === B ? 1 / 0 : B
          , W = o.maxHeight
          , T = void 0 === W ? 1 / 0 : W
          , D = o.minWidth
          , H = void 0 === D ? 0 : D
          , Y = o.minHeight
          , X = void 0 === Y ? 0 : Y
          , O = g({
            aspectRatio: f,
            width: k,
            height: T
        })
          , z = g({
            aspectRatio: f,
            width: H,
            height: X
        })
          , E = Math.min(O.width, Math.max(z.width, v))
          , N = Math.min(O.height, Math.max(z.height, w))
          , R = document.createElement("canvas")
          , L = R.getContext("2d")
          , P = [-r / 2, -s / 2, r, s];
        return R.width = h(E),
        R.height = h(N),
        L.fillStyle = b,
        L.fillRect(0, 0, E, N),
        L.save(),
        L.translate(E / 2, N / 2),
        L.rotate(d * Math.PI / 180),
        L.scale(p, u),
        L.imageSmoothingEnabled = !!C,
        L.imageSmoothingQuality = $,
        L.drawImage.apply(L, [e].concat(i(t.map(P, function(t) {
            return Math.floor(h(t))
        })))),
        L.restore(),
        R
    }
    function v(t, i, e) {
        var a = ""
          , n = void 0;
        for (e += i,
        n = i; n < e; n += 1)
            a += U(t.getUint8(n));
        return a
    }
    function w(i) {
        var e = i.replace(F, "")
          , a = atob(e)
          , n = new ArrayBuffer(a.length)
          , o = new Uint8Array(n);
        return t.each(o, function(t) {
            o[t] = a.charCodeAt(t)
        }),
        n
    }
    function x(i, e) {
        var a = new Uint8Array(i)
          , n = "";
        return t.each(a, function(t, i) {
            n += U(i)
        }),
        "data:" + e + ";base64," + btoa(n)
    }
    function b(t) {
        var i = new DataView(t)
          , e = void 0
          , a = void 0
          , n = void 0
          , o = void 0;
        if (255 === i.getUint8(0) && 216 === i.getUint8(1))
            for (var h = i.byteLength, r = 2; r < h; ) {
                if (255 === i.getUint8(r) && 225 === i.getUint8(r + 1)) {
                    n = r;
                    break
                }
                r += 1
            }
        if (n) {
            var s = n + 10;
            if ("Exif" === v(i, n + 4, 4)) {
                var c = i.getUint16(s);
                if (((a = 18761 === c) || 19789 === c) && 42 === i.getUint16(s + 2, a)) {
                    var d = i.getUint32(s + 4, a);
                    d >= 8 && (o = s + d)
                }
            }
        }
        if (o) {
            var l = i.getUint16(o, a)
              , p = void 0
              , m = void 0;
            for (m = 0; m < l; m += 1)
                if (p = o + 12 * m + 2,
                274 === i.getUint16(p, a)) {
                    p += 8,
                    e = i.getUint16(p, a),
                    i.setUint16(p, 1, a);
                    break
                }
        }
        return e
    }
    function y(t) {
        var i = 0
          , e = 1
          , a = 1;
        switch (t) {
        case 2:
            e = -1;
            break;
        case 3:
            i = -180;
            break;
        case 4:
            a = -1;
            break;
        case 5:
            i = 90,
            a = -1;
            break;
        case 6:
            i = 90;
            break;
        case 7:
            i = 90,
            e = -1;
            break;
        case 8:
            i = -90
        }
        return {
            rotate: i,
            scaleX: e,
            scaleY: a
        }
    }
    function C(t) {
        if (Array.isArray(t)) {
            for (var i = 0, e = Array(t.length); i < t.length; i++)
                e[i] = t[i];
            return e
        }
        return Array.from(t)
    }
    function M(t, i) {
        if (!(t instanceof i))
            throw new TypeError("Cannot call a class as a function")
    }
    t = t && t.hasOwnProperty("default") ? t.default : t;
    var $ = "undefined" != typeof window ? window : {}
      , B = "cropper-hidden"
      , k = $.PointerEvent ? "pointerdown" : "touchstart mousedown"
      , W = $.PointerEvent ? "pointermove" : "touchmove mousemove"
      , T = $.PointerEvent ? " pointerup pointercancel" : "touchend touchcancel mouseup"
      , D = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/
      , H = /^data:/
      , Y = /^data:image\/jpeg;base64,/
      , X = /^(img|canvas)$/i
      , O = {
        viewMode: 0,
        dragMode: "crop",
        aspectRatio: NaN,
        data: null,
        preview: "",
        responsive: !0,
        restore: !0,
        checkCrossOrigin: !0,
        checkOrientation: !0,
        modal: !0,
        guides: !0,
        center: !0,
        highlight: !0,
        background: !0,
        autoCrop: !0,
        autoCropArea: .8,
        movable: !0,
        rotatable: !0,
        scalable: !0,
        zoomable: !0,
        zoomOnTouch: !0,
        zoomOnWheel: !0,
        wheelZoomRatio: .1,
        cropBoxMovable: !0,
        cropBoxResizable: !0,
        toggleDragModeOnDblclick: !0,
        minCanvasWidth: 0,
        minCanvasHeight: 0,
        minCropBoxWidth: 0,
        minCropBoxHeight: 0,
        minContainerWidth: 200,
        minContainerHeight: 100,
        ready: null,
        cropstart: null,
        cropmove: null,
        cropend: null,
        crop: null,
        zoom: null
    }
      , z = Number.isNaN || $.isNaN
      , E = Object.keys || function(i) {
        var e = [];
        return t.each(i, function(t) {
            e.push(t)
        }),
        e
    }
      , N = /\.\d*(?:0|9){12}\d*$/i
      , R = $.location
      , L = /^(https?:)\/\/([^:/?#]+):?(\d*)/i
      , P = $.navigator
      , A = P && /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(P.userAgent)
      , I = Number.isFinite || $.isFinite
      , U = String.fromCharCode
      , F = /^data:.*,/
      , S = {
        render: function() {
            this.initContainer(),
            this.initCanvas(),
            this.initCropBox(),
            this.renderCanvas(),
            this.cropped && this.renderCropBox()
        },
        initContainer: function() {
            var t = this.$element
              , i = this.options
              , e = this.$container
              , a = this.$cropper;
            a.addClass(B),
            t.removeClass(B),
            a.css(this.container = {
                width: Math.max(e.width(), Number(i.minContainerWidth) || 200),
                height: Math.max(e.height(), Number(i.minContainerHeight) || 100)
            }),
            t.addClass(B),
            a.removeClass(B)
        },
        initCanvas: function() {
            var i = this.container
              , e = this.image
              , a = this.options.viewMode
              , n = Math.abs(e.rotate) % 180 == 90
              , o = n ? e.naturalHeight : e.naturalWidth
              , h = n ? e.naturalWidth : e.naturalHeight
              , r = o / h
              , s = i.width
              , c = i.height;
            i.height * r > i.width ? 3 === a ? s = i.height * r : c = i.width / r : 3 === a ? c = i.width / r : s = i.height * r;
            var d = {
                aspectRatio: r,
                naturalWidth: o,
                naturalHeight: h,
                width: s,
                height: c
            };
            d.left = (i.width - s) / 2,
            d.top = (i.height - c) / 2,
            d.oldLeft = d.left,
            d.oldTop = d.top,
            this.canvas = d,
            this.limited = 1 === a || 2 === a,
            this.limitCanvas(!0, !0),
            this.initialImage = t.extend({}, e),
            this.initialCanvas = t.extend({}, d)
        },
        limitCanvas: function(t, i) {
            var e = this.options
              , a = this.container
              , n = this.canvas
              , o = this.cropBox
              , h = e.viewMode
              , r = n.aspectRatio
              , s = this.cropped && o;
            if (t) {
                var c = Number(e.minCanvasWidth) || 0
                  , d = Number(e.minCanvasHeight) || 0;
                h > 0 && (h > 1 ? (c = Math.max(c, a.width),
                d = Math.max(d, a.height),
                3 === h && (d * r > c ? c = d * r : d = c / r)) : c ? c = Math.max(c, s ? o.width : 0) : d ? d = Math.max(d, s ? o.height : 0) : s && (c = o.width,
                (d = o.height) * r > c ? c = d * r : d = c / r));
                var l = g({
                    aspectRatio: r,
                    width: c,
                    height: d
                });
                c = l.width,
                d = l.height,
                n.minWidth = c,
                n.minHeight = d,
                n.maxWidth = 1 / 0,
                n.maxHeight = 1 / 0
            }
            if (i)
                if (h > 0) {
                    var p = a.width - n.width
                      , m = a.height - n.height;
                    n.minLeft = Math.min(0, p),
                    n.minTop = Math.min(0, m),
                    n.maxLeft = Math.max(0, p),
                    n.maxTop = Math.max(0, m),
                    s && this.limited && (n.minLeft = Math.min(o.left, o.left + o.width - n.width),
                    n.minTop = Math.min(o.top, o.top + o.height - n.height),
                    n.maxLeft = o.left,
                    n.maxTop = o.top,
                    2 === h && (n.width >= a.width && (n.minLeft = Math.min(0, p),
                    n.maxLeft = Math.max(0, p)),
                    n.height >= a.height && (n.minTop = Math.min(0, m),
                    n.maxTop = Math.max(0, m))))
                } else
                    n.minLeft = -n.width,
                    n.minTop = -n.height,
                    n.maxLeft = a.width,
                    n.maxTop = a.height
        },
        renderCanvas: function(t, i) {
            var e = this.canvas
              , a = this.image;
            if (i) {
                var n = u({
                    width: a.naturalWidth * Math.abs(a.scaleX || 1),
                    height: a.naturalHeight * Math.abs(a.scaleY || 1),
                    degree: a.rotate || 0
                })
                  , o = n.width
                  , h = n.height
                  , r = e.width * (o / e.naturalWidth)
                  , s = e.height * (h / e.naturalHeight);
                e.left -= (r - e.width) / 2,
                e.top -= (s - e.height) / 2,
                e.width = r,
                e.height = s,
                e.aspectRatio = o / h,
                e.naturalWidth = o,
                e.naturalHeight = h,
                this.limitCanvas(!0, !1)
            }
            (e.width > e.maxWidth || e.width < e.minWidth) && (e.left = e.oldLeft),
            (e.height > e.maxHeight || e.height < e.minHeight) && (e.top = e.oldTop),
            e.width = Math.min(Math.max(e.width, e.minWidth), e.maxWidth),
            e.height = Math.min(Math.max(e.height, e.minHeight), e.maxHeight),
            this.limitCanvas(!1, !0),
            e.left = Math.min(Math.max(e.left, e.minLeft), e.maxLeft),
            e.top = Math.min(Math.max(e.top, e.minTop), e.maxTop),
            e.oldLeft = e.left,
            e.oldTop = e.top,
            this.$canvas.css({
                width: e.width,
                height: e.height,
                transform: c({
                    translateX: e.left,
                    translateY: e.top
                })
            }),
            this.renderImage(t),
            this.cropped && this.limited && this.limitCropBox(!0, !0)
        },
        renderImage: function(i) {
            var e = this.canvas
              , a = this.image
              , n = a.naturalWidth * (e.width / e.naturalWidth)
              , o = a.naturalHeight * (e.height / e.naturalHeight);
            t.extend(a, {
                width: n,
                height: o,
                left: (e.width - n) / 2,
                top: (e.height - o) / 2
            }),
            this.$clone.css({
                width: a.width,
                height: a.height,
                transform: c(t.extend({
                    translateX: a.left,
                    translateY: a.top
                }, a))
            }),
            i && this.output()
        },
        initCropBox: function() {
            var i = this.options
              , e = this.canvas
              , a = i.aspectRatio
              , n = Number(i.autoCropArea) || .8
              , o = {
                width: e.width,
                height: e.height
            };
            a && (e.height * a > e.width ? o.height = o.width / a : o.width = o.height * a),
            this.cropBox = o,
            this.limitCropBox(!0, !0),
            o.width = Math.min(Math.max(o.width, o.minWidth), o.maxWidth),
            o.height = Math.min(Math.max(o.height, o.minHeight), o.maxHeight),
            o.width = Math.max(o.minWidth, o.width * n),
            o.height = Math.max(o.minHeight, o.height * n),
            o.left = e.left + (e.width - o.width) / 2,
            o.top = e.top + (e.height - o.height) / 2,
            o.oldLeft = o.left,
            o.oldTop = o.top,
            this.initialCropBox = t.extend({}, o)
        },
        limitCropBox: function(t, i) {
            var e = this.options
              , a = this.container
              , n = this.canvas
              , o = this.cropBox
              , h = this.limited
              , r = e.aspectRatio;
            if (t) {
                var s = Number(e.minCropBoxWidth) || 0
                  , c = Number(e.minCropBoxHeight) || 0
                  , d = Math.min(a.width, h ? n.width : a.width)
                  , l = Math.min(a.height, h ? n.height : a.height);
                s = Math.min(s, a.width),
                c = Math.min(c, a.height),
                r && (s && c ? c * r > s ? c = s / r : s = c * r : s ? c = s / r : c && (s = c * r),
                l * r > d ? l = d / r : d = l * r),
                o.minWidth = Math.min(s, d),
                o.minHeight = Math.min(c, l),
                o.maxWidth = d,
                o.maxHeight = l
            }
            i && (h ? (o.minLeft = Math.max(0, n.left),
            o.minTop = Math.max(0, n.top),
            o.maxLeft = Math.min(a.width, n.left + n.width) - o.width,
            o.maxTop = Math.min(a.height, n.top + n.height) - o.height) : (o.minLeft = 0,
            o.minTop = 0,
            o.maxLeft = a.width - o.width,
            o.maxTop = a.height - o.height))
        },
        renderCropBox: function() {
            var t = this.options
              , i = this.container
              , e = this.cropBox;
            (e.width > e.maxWidth || e.width < e.minWidth) && (e.left = e.oldLeft),
            (e.height > e.maxHeight || e.height < e.minHeight) && (e.top = e.oldTop),
            e.width = Math.min(Math.max(e.width, e.minWidth), e.maxWidth),
            e.height = Math.min(Math.max(e.height, e.minHeight), e.maxHeight),
            this.limitCropBox(!1, !0),
            e.left = Math.min(Math.max(e.left, e.minLeft), e.maxLeft),
            e.top = Math.min(Math.max(e.top, e.minTop), e.maxTop),
            e.oldLeft = e.left,
            e.oldTop = e.top,
            t.movable && t.cropBoxMovable && this.$face.data("action", e.width >= i.width && e.height >= i.height ? "move" : "all"),
            this.$cropBox.css({
                width: e.width,
                height: e.height,
                transform: c({
                    translateX: e.left,
                    translateY: e.top
                })
            }),
            this.cropped && this.limited && this.limitCanvas(!0, !0),
            this.disabled || this.output()
        },
        output: function() {
            this.preview(),
            this.completed && this.trigger("crop", this.getData())
        }
    }
      , j = {
        initPreview: function() {
            var i = this.crossOrigin
              , e = i ? this.crossOriginUrl : this.url
              , a = document.createElement("img");
            i && (a.crossOrigin = i),
            a.src = e;
            var n = t(a);
            this.$preview = t(this.options.preview),
            this.$clone2 = n,
            this.$viewBox.html(n),
            this.$preview.each(function(a, n) {
                var o = t(n)
                  , h = document.createElement("img");
                o.data("preview", {
                    width: o.width(),
                    height: o.height(),
                    html: o.html()
                }),
                i && (h.crossOrigin = i),
                h.src = e,
                h.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"',
                o.html(h)
            })
        },
        resetPreview: function() {
            this.$preview.each(function(i, e) {
                var a = t(e)
                  , n = a.data("preview");
                a.css({
                    width: n.width,
                    height: n.height
                }).html(n.html).removeData("preview")
            })
        },
        preview: function() {
            var i = this.image
              , e = this.canvas
              , a = this.cropBox
              , n = a.width
              , o = a.height
              , h = i.width
              , r = i.height
              , s = a.left - e.left - i.left
              , d = a.top - e.top - i.top;
            this.cropped && !this.disabled && (this.$clone2.css({
                width: h,
                height: r,
                transform: c(t.extend({
                    translateX: -s,
                    translateY: -d
                }, i))
            }),
            this.$preview.each(function(e, a) {
                var l = t(a)
                  , p = l.data("preview")
                  , m = p.width
                  , g = p.height
                  , u = m
                  , f = g
                  , v = 1;
                n && (f = o * (v = m / n)),
                o && f > g && (u = n * (v = g / o),
                f = g),
                l.css({
                    width: u,
                    height: f
                }).find("img").css({
                    width: h * v,
                    height: r * v,
                    transform: c(t.extend({
                        translateX: -s * v,
                        translateY: -d * v
                    }, i))
                })
            }))
        }
    }
      , q = {
        bind: function() {
            var i = this.$element
              , e = this.options
              , a = this.$cropper;
            t.isFunction(e.cropstart) && i.on("cropstart", e.cropstart),
            t.isFunction(e.cropmove) && i.on("cropmove", e.cropmove),
            t.isFunction(e.cropend) && i.on("cropend", e.cropend),
            t.isFunction(e.crop) && i.on("crop", e.crop),
            t.isFunction(e.zoom) && i.on("zoom", e.zoom),
            a.on(k, o(this.cropStart, this)),
            e.zoomable && e.zoomOnWheel && a.on("wheel mousewheel DOMMouseScroll", o(this.wheel, this)),
            e.toggleDragModeOnDblclick && a.on("dblclick", o(this.dblclick, this)),
            t(document).on(W, this.onCropMove = o(this.cropMove, this)).on(T, this.onCropEnd = o(this.cropEnd, this)),
            e.responsive && t(window).on("resize", this.onResize = o(this.resize, this))
        },
        unbind: function() {
            var i = this.$element
              , e = this.options
              , a = this.$cropper;
            t.isFunction(e.cropstart) && i.off("cropstart", e.cropstart),
            t.isFunction(e.cropmove) && i.off("cropmove", e.cropmove),
            t.isFunction(e.cropend) && i.off("cropend", e.cropend),
            t.isFunction(e.crop) && i.off("crop", e.crop),
            t.isFunction(e.zoom) && i.off("zoom", e.zoom),
            a.off(k, this.cropStart),
            e.zoomable && e.zoomOnWheel && a.off("wheel mousewheel DOMMouseScroll", this.wheel),
            e.toggleDragModeOnDblclick && a.off("dblclick", this.dblclick),
            t(document).off(W, this.onCropMove).off(T, this.onCropEnd),
            e.responsive && t(window).off("resize", this.onResize)
        }
    }
      , Q = {
        resize: function() {
            var i = this.options
              , e = this.$container
              , a = this.container
              , n = Number(i.minContainerWidth) || 200
              , o = Number(i.minContainerHeight) || 100;
            if (!(this.disabled || a.width <= n || a.height <= o)) {
                var h = e.width() / a.width;
                if (1 !== h || e.height() !== a.height) {
                    var r = void 0
                      , s = void 0;
                    i.restore && (r = this.getCanvasData(),
                    s = this.getCropBoxData()),
                    this.render(),
                    i.restore && (this.setCanvasData(t.each(r, function(t, i) {
                        r[t] = i * h
                    })),
                    this.setCropBoxData(t.each(s, function(t, i) {
                        s[t] = i * h
                    })))
                }
            }
        },
        dblclick: function() {
            this.disabled || "none" === this.options.dragMode || this.setDragMode(this.$dragBox.hasClass("cropper-crop") ? "move" : "crop")
        },
        wheel: function(t) {
            var i = this
              , e = t.originalEvent || t
              , a = Number(this.options.wheelZoomRatio) || .1;
            if (!this.disabled && (t.preventDefault(),
            !this.wheeling)) {
                this.wheeling = !0,
                setTimeout(function() {
                    i.wheeling = !1
                }, 50);
                var n = 1;
                e.deltaY ? n = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? n = -e.wheelDelta / 120 : e.detail && (n = e.detail > 0 ? 1 : -1),
                this.zoom(-n * a, t)
            }
        },
        cropStart: function(i) {
            if (!this.disabled) {
                var e = this.options
                  , a = this.pointers
                  , n = i.originalEvent
                  , o = void 0;
                n && n.changedTouches ? t.each(n.changedTouches, function(t, i) {
                    a[i.identifier] = p(i)
                }) : a[n && n.pointerId || 0] = p(n || i),
                o = E(a).length > 1 && e.zoomable && e.zoomOnTouch ? "zoom" : t(i.target).data("action"),
                D.test(o) && (this.trigger("cropstart", {
                    originalEvent: n,
                    action: o
                }).isDefaultPrevented() || (i.preventDefault(),
                this.action = o,
                this.cropping = !1,
                "crop" === o && (this.cropping = !0,
                this.$dragBox.addClass("cropper-modal"))))
            }
        },
        cropMove: function(i) {
            var e = this.action;
            if (!this.disabled && e) {
                var a = this.pointers
                  , n = i.originalEvent;
                i.preventDefault(),
                this.trigger("cropmove", {
                    originalEvent: n,
                    action: e
                }).isDefaultPrevented() || (n && n.changedTouches ? t.each(n.changedTouches, function(i, e) {
                    t.extend(a[e.identifier], p(e, !0))
                }) : t.extend(a[n && n.pointerId || 0], p(n || i, !0)),
                this.change(i))
            }
        },
        cropEnd: function(i) {
            if (!this.disabled) {
                var e = this.action
                  , a = this.pointers
                  , n = i.originalEvent;
                n && n.changedTouches ? t.each(n.changedTouches, function(t, i) {
                    delete a[i.identifier]
                }) : delete a[n && n.pointerId || 0],
                e && (i.preventDefault(),
                E(a).length || (this.action = ""),
                this.cropping && (this.cropping = !1,
                this.$dragBox.toggleClass("cropper-modal", this.cropped && this.options.modal)),
                this.trigger("cropend", {
                    originalEvent: n,
                    action: e
                }))
            }
        }
    }
      , K = {
        change: function(i) {
            var e = this.options
              , a = this.pointers
              , n = this.container
              , o = this.canvas
              , h = this.cropBox
              , r = this.action
              , s = e.aspectRatio
              , c = h.left
              , d = h.top
              , p = h.width
              , m = h.height
              , g = c + p
              , u = d + m
              , f = 0
              , v = 0
              , w = n.width
              , x = n.height
              , b = !0
              , y = void 0;
            !s && i.shiftKey && (s = p && m ? p / m : 1),
            this.limited && (f = h.minLeft,
            v = h.minTop,
            w = f + Math.min(n.width, o.width, o.left + o.width),
            x = v + Math.min(n.height, o.height, o.top + o.height));
            var C = a[E(a)[0]]
              , M = {
                x: C.endX - C.startX,
                y: C.endY - C.startY
            }
              , $ = function(t) {
                switch (t) {
                case "e":
                    g + M.x > w && (M.x = w - g);
                    break;
                case "w":
                    c + M.x < f && (M.x = f - c);
                    break;
                case "n":
                    d + M.y < v && (M.y = v - d);
                    break;
                case "s":
                    u + M.y > x && (M.y = x - u)
                }
            };
            switch (r) {
            case "all":
                c += M.x,
                d += M.y;
                break;
            case "e":
                if (M.x >= 0 && (g >= w || s && (d <= v || u >= x))) {
                    b = !1;
                    break
                }
                $("e"),
                p += M.x,
                s && (m = p / s,
                d -= M.x / s / 2),
                p < 0 && (r = "w",
                p = 0);
                break;
            case "n":
                if (M.y <= 0 && (d <= v || s && (c <= f || g >= w))) {
                    b = !1;
                    break
                }
                $("n"),
                m -= M.y,
                d += M.y,
                s && (p = m * s,
                c += M.y * s / 2),
                m < 0 && (r = "s",
                m = 0);
                break;
            case "w":
                if (M.x <= 0 && (c <= f || s && (d <= v || u >= x))) {
                    b = !1;
                    break
                }
                $("w"),
                p -= M.x,
                c += M.x,
                s && (m = p / s,
                d += M.x / s / 2),
                p < 0 && (r = "e",
                p = 0);
                break;
            case "s":
                if (M.y >= 0 && (u >= x || s && (c <= f || g >= w))) {
                    b = !1;
                    break
                }
                $("s"),
                m += M.y,
                s && (p = m * s,
                c -= M.y * s / 2),
                m < 0 && (r = "n",
                m = 0);
                break;
            case "ne":
                if (s) {
                    if (M.y <= 0 && (d <= v || g >= w)) {
                        b = !1;
                        break
                    }
                    $("n"),
                    m -= M.y,
                    d += M.y,
                    p = m * s
                } else
                    $("n"),
                    $("e"),
                    M.x >= 0 ? g < w ? p += M.x : M.y <= 0 && d <= v && (b = !1) : p += M.x,
                    M.y <= 0 ? d > v && (m -= M.y,
                    d += M.y) : (m -= M.y,
                    d += M.y);
                p < 0 && m < 0 ? (r = "sw",
                m = 0,
                p = 0) : p < 0 ? (r = "nw",
                p = 0) : m < 0 && (r = "se",
                m = 0);
                break;
            case "nw":
                if (s) {
                    if (M.y <= 0 && (d <= v || c <= f)) {
                        b = !1;
                        break
                    }
                    $("n"),
                    m -= M.y,
                    d += M.y,
                    p = m * s,
                    c += M.y * s
                } else
                    $("n"),
                    $("w"),
                    M.x <= 0 ? c > f ? (p -= M.x,
                    c += M.x) : M.y <= 0 && d <= v && (b = !1) : (p -= M.x,
                    c += M.x),
                    M.y <= 0 ? d > v && (m -= M.y,
                    d += M.y) : (m -= M.y,
                    d += M.y);
                p < 0 && m < 0 ? (r = "se",
                m = 0,
                p = 0) : p < 0 ? (r = "ne",
                p = 0) : m < 0 && (r = "sw",
                m = 0);
                break;
            case "sw":
                if (s) {
                    if (M.x <= 0 && (c <= f || u >= x)) {
                        b = !1;
                        break
                    }
                    $("w"),
                    p -= M.x,
                    c += M.x,
                    m = p / s
                } else
                    $("s"),
                    $("w"),
                    M.x <= 0 ? c > f ? (p -= M.x,
                    c += M.x) : M.y >= 0 && u >= x && (b = !1) : (p -= M.x,
                    c += M.x),
                    M.y >= 0 ? u < x && (m += M.y) : m += M.y;
                p < 0 && m < 0 ? (r = "ne",
                m = 0,
                p = 0) : p < 0 ? (r = "se",
                p = 0) : m < 0 && (r = "nw",
                m = 0);
                break;
            case "se":
                if (s) {
                    if (M.x >= 0 && (g >= w || u >= x)) {
                        b = !1;
                        break
                    }
                    $("e"),
                    m = (p += M.x) / s
                } else
                    $("s"),
                    $("e"),
                    M.x >= 0 ? g < w ? p += M.x : M.y >= 0 && u >= x && (b = !1) : p += M.x,
                    M.y >= 0 ? u < x && (m += M.y) : m += M.y;
                p < 0 && m < 0 ? (r = "nw",
                m = 0,
                p = 0) : p < 0 ? (r = "sw",
                p = 0) : m < 0 && (r = "ne",
                m = 0);
                break;
            case "move":
                this.move(M.x, M.y),
                b = !1;
                break;
            case "zoom":
                this.zoom(l(a), i.originalEvent),
                b = !1;
                break;
            case "crop":
                if (!M.x || !M.y) {
                    b = !1;
                    break
                }
                y = this.$cropper.offset(),
                c = C.startX - y.left,
                d = C.startY - y.top,
                p = h.minWidth,
                m = h.minHeight,
                M.x > 0 ? r = M.y > 0 ? "se" : "ne" : M.x < 0 && (c -= p,
                r = M.y > 0 ? "sw" : "nw"),
                M.y < 0 && (d -= m),
                this.cropped || (this.$cropBox.removeClass(B),
                this.cropped = !0,
                this.limited && this.limitCropBox(!0, !0))
            }
            b && (h.width = p,
            h.height = m,
            h.left = c,
            h.top = d,
            this.action = r,
            this.renderCropBox()),
            t.each(a, function(t, i) {
                i.startX = i.endX,
                i.startY = i.endY
            })
        }
    }
      , Z = {
        crop: function() {
            this.ready && !this.disabled && (this.cropped || (this.cropped = !0,
            this.limitCropBox(!0, !0),
            this.options.modal && this.$dragBox.addClass("cropper-modal"),
            this.$cropBox.removeClass(B)),
            this.setCropBoxData(this.initialCropBox))
        },
        reset: function() {
            this.ready && !this.disabled && (this.image = t.extend({}, this.initialImage),
            this.canvas = t.extend({}, this.initialCanvas),
            this.cropBox = t.extend({}, this.initialCropBox),
            this.renderCanvas(),
            this.cropped && this.renderCropBox())
        },
        clear: function() {
            this.cropped && !this.disabled && (t.extend(this.cropBox, {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            }),
            this.cropped = !1,
            this.renderCropBox(),
            this.limitCanvas(!0, !0),
            this.renderCanvas(),
            this.$dragBox.removeClass("cropper-modal"),
            this.$cropBox.addClass(B))
        },
        replace: function(t, i) {
            !this.disabled && t && (this.isImg && this.$element.attr("src", t),
            i ? (this.url = t,
            this.$clone.attr("src", t),
            this.ready && this.$preview.find("img").add(this.$clone2).attr("src", t)) : (this.isImg && (this.replaced = !0),
            this.options.data = null,
            this.load(t)))
        },
        enable: function() {
            this.ready && (this.disabled = !1,
            this.$cropper.removeClass("cropper-disabled"))
        },
        disable: function() {
            this.ready && (this.disabled = !0,
            this.$cropper.addClass("cropper-disabled"))
        },
        destroy: function() {
            var t = this.$element;
            this.loaded ? (this.isImg && this.replaced && t.attr("src", this.originalUrl),
            this.unbuild(),
            t.removeClass(B)) : this.isImg ? t.off("load", this.start) : this.$clone && this.$clone.remove(),
            t.removeData("cropper")
        },
        move: function(t, i) {
            var e = this.canvas
              , a = e.left
              , o = e.top;
            this.moveTo(n(t) ? t : a + Number(t), n(i) ? i : o + Number(i))
        },
        moveTo: function(t, i) {
            var e = this.canvas
              , o = !1;
            n(i) && (i = t),
            t = Number(t),
            i = Number(i),
            this.ready && !this.disabled && this.options.movable && (a(t) && (e.left = t,
            o = !0),
            a(i) && (e.top = i,
            o = !0),
            o && this.renderCanvas(!0))
        },
        zoom: function(t, i) {
            var e = this.canvas;
            t = (t = Number(t)) < 0 ? 1 / (1 - t) : 1 + t,
            this.zoomTo(e.width * t / e.naturalWidth, i)
        },
        zoomTo: function(t, i) {
            var e = this.options
              , a = this.pointers
              , n = this.canvas
              , o = n.width
              , h = n.height
              , r = n.naturalWidth
              , s = n.naturalHeight;
            if ((t = Number(t)) >= 0 && this.ready && !this.disabled && e.zoomable) {
                var c = r * t
                  , d = s * t
                  , l = void 0;
                if (i && (l = i.originalEvent),
                this.trigger("zoom", {
                    originalEvent: l,
                    oldRatio: o / r,
                    ratio: c / r
                }).isDefaultPrevented())
                    return;
                if (l) {
                    var p = this.$cropper.offset()
                      , g = a && E(a).length ? m(a) : {
                        pageX: i.pageX || l.pageX || 0,
                        pageY: i.pageY || l.pageY || 0
                    };
                    n.left -= (c - o) * ((g.pageX - p.left - n.left) / o),
                    n.top -= (d - h) * ((g.pageY - p.top - n.top) / h)
                } else
                    n.left -= (c - o) / 2,
                    n.top -= (d - h) / 2;
                n.width = c,
                n.height = d,
                this.renderCanvas(!0)
            }
        },
        rotate: function(t) {
            this.rotateTo((this.image.rotate || 0) + Number(t))
        },
        rotateTo: function(t) {
            a(t = Number(t)) && this.ready && !this.disabled && this.options.rotatable && (this.image.rotate = t % 360,
            this.renderCanvas(!0, !0))
        },
        scaleX: function(t) {
            var i = this.image.scaleY;
            this.scale(t, a(i) ? i : 1)
        },
        scaleY: function(t) {
            var i = this.image.scaleX;
            this.scale(a(i) ? i : 1, t)
        },
        scale: function(t) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t
              , e = this.image
              , n = !1;
            t = Number(t),
            i = Number(i),
            this.ready && !this.disabled && this.options.scalable && (a(t) && (e.scaleX = t,
            n = !0),
            a(i) && (e.scaleY = i,
            n = !0),
            n && this.renderCanvas(!0, !0))
        },
        getData: function() {
            var i = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
              , e = this.options
              , a = this.image
              , n = this.canvas
              , o = this.cropBox
              , h = void 0;
            if (this.ready && this.cropped) {
                h = {
                    x: o.left - n.left,
                    y: o.top - n.top,
                    width: o.width,
                    height: o.height
                };
                var r = a.width / a.naturalWidth;
                t.each(h, function(t, e) {
                    e /= r,
                    h[t] = i ? Math.round(e) : e
                })
            } else
                h = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
            return e.rotatable && (h.rotate = a.rotate || 0),
            e.scalable && (h.scaleX = a.scaleX || 1,
            h.scaleY = a.scaleY || 1),
            h
        },
        setData: function(i) {
            var e = this.options
              , n = this.image
              , o = this.canvas
              , h = {};
            if (t.isFunction(i) && (i = i.call(this.element)),
            this.ready && !this.disabled && t.isPlainObject(i)) {
                var r = !1;
                e.rotatable && a(i.rotate) && i.rotate !== n.rotate && (n.rotate = i.rotate,
                r = !0),
                e.scalable && (a(i.scaleX) && i.scaleX !== n.scaleX && (n.scaleX = i.scaleX,
                r = !0),
                a(i.scaleY) && i.scaleY !== n.scaleY && (n.scaleY = i.scaleY,
                r = !0)),
                r && this.renderCanvas(!0, !0);
                var s = n.width / n.naturalWidth;
                a(i.x) && (h.left = i.x * s + o.left),
                a(i.y) && (h.top = i.y * s + o.top),
                a(i.width) && (h.width = i.width * s),
                a(i.height) && (h.height = i.height * s),
                this.setCropBoxData(h)
            }
        },
        getContainerData: function() {
            return this.ready ? t.extend({}, this.container) : {}
        },
        getImageData: function() {
            return this.loaded ? t.extend({}, this.image) : {}
        },
        getCanvasData: function() {
            var i = this.canvas
              , e = {};
            return this.ready && t.each(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(t, a) {
                e[a] = i[a]
            }),
            e
        },
        setCanvasData: function(i) {
            var e = this.canvas
              , n = e.aspectRatio;
            t.isFunction(i) && (i = i.call(this.$element)),
            this.ready && !this.disabled && t.isPlainObject(i) && (a(i.left) && (e.left = i.left),
            a(i.top) && (e.top = i.top),
            a(i.width) ? (e.width = i.width,
            e.height = i.width / n) : a(i.height) && (e.height = i.height,
            e.width = i.height * n),
            this.renderCanvas(!0))
        },
        getCropBoxData: function() {
            var t = this.cropBox;
            return this.ready && this.cropped ? {
                left: t.left,
                top: t.top,
                width: t.width,
                height: t.height
            } : {}
        },
        setCropBoxData: function(i) {
            var e = this.cropBox
              , n = this.options.aspectRatio
              , o = void 0
              , h = void 0;
            t.isFunction(i) && (i = i.call(this.$element)),
            this.ready && this.cropped && !this.disabled && t.isPlainObject(i) && (a(i.left) && (e.left = i.left),
            a(i.top) && (e.top = i.top),
            a(i.width) && i.width !== e.width && (o = !0,
            e.width = i.width),
            a(i.height) && i.height !== e.height && (h = !0,
            e.height = i.height),
            n && (o ? e.height = e.width / n : h && (e.width = e.height * n)),
            this.renderCropBox())
        },
        getCroppedCanvas: function() {
            var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!this.ready || !window.HTMLCanvasElement)
                return null;
            var e = this.canvas
              , a = f(this.$clone[0], this.image, e, i);
            if (!this.cropped)
                return a;
            var n = this.getData()
              , o = n.x
              , r = n.y
              , s = n.width
              , c = n.height
              , d = s / c
              , l = g({
                aspectRatio: d,
                width: i.maxWidth || 1 / 0,
                height: i.maxHeight || 1 / 0
            })
              , p = g({
                aspectRatio: d,
                width: i.minWidth || 0,
                height: i.minHeight || 0
            })
              , m = g({
                aspectRatio: d,
                width: i.width || s,
                height: i.height || c
            })
              , u = m.width
              , v = m.height;
            u = Math.min(l.width, Math.max(p.width, u)),
            v = Math.min(l.height, Math.max(p.height, v));
            var w = document.createElement("canvas")
              , x = w.getContext("2d");
            w.width = h(u),
            w.height = h(v),
            x.fillStyle = i.fillColor || "transparent",
            x.fillRect(0, 0, u, v);
            var b = i.imageSmoothingEnabled
              , y = void 0 === b || b
              , M = i.imageSmoothingQuality;
            x.imageSmoothingEnabled = y,
            M && (x.imageSmoothingQuality = M);
            var $ = a.width
              , B = a.height
              , k = o
              , W = r
              , T = void 0
              , D = void 0
              , H = void 0
              , Y = void 0
              , X = void 0
              , O = void 0;
            k <= -s || k > $ ? (k = 0,
            T = 0,
            H = 0,
            X = 0) : k <= 0 ? (H = -k,
            k = 0,
            X = T = Math.min($, s + k)) : k <= $ && (H = 0,
            X = T = Math.min(s, $ - k)),
            T <= 0 || W <= -c || W > B ? (W = 0,
            D = 0,
            Y = 0,
            O = 0) : W <= 0 ? (Y = -W,
            W = 0,
            O = D = Math.min(B, c + W)) : W <= B && (Y = 0,
            O = D = Math.min(c, B - W));
            var z = [k, W, T, D];
            if (X > 0 && O > 0) {
                var E = u / s;
                z.push(H * E, Y * E, X * E, O * E)
            }
            return x.drawImage.apply(x, [a].concat(C(t.map(z, function(t) {
                return Math.floor(h(t))
            })))),
            w
        },
        setAspectRatio: function(t) {
            var i = this.options;
            this.disabled || n(t) || (i.aspectRatio = Math.max(0, t) || NaN,
            this.ready && (this.initCropBox(),
            this.cropped && this.renderCropBox()))
        },
        setDragMode: function(t) {
            var i = this.options
              , e = void 0
              , a = void 0;
            this.loaded && !this.disabled && (e = "crop" === t,
            a = i.movable && "move" === t,
            t = e || a ? t : "none",
            this.$dragBox.data("action", t).toggleClass("cropper-crop", e).toggleClass("cropper-move", a),
            i.cropBoxMovable || this.$face.data("action", t).toggleClass("cropper-crop", e).toggleClass("cropper-move", a))
        }
    }
      , V = function() {
        function t(t, i) {
            for (var e = 0; e < i.length; e++) {
                var a = i[e];
                a.enumerable = a.enumerable || !1,
                a.configurable = !0,
                "value"in a && (a.writable = !0),
                Object.defineProperty(t, a.key, a)
            }
        }
        return function(i, e, a) {
            return e && t(i.prototype, e),
            a && t(i, a),
            i
        }
    }()
      , G = function() {
        function i(e) {
            var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (M(this, i),
            !e || !X.test(e.tagName))
                throw new Error("The first argument is required and must be an <img> or <canvas> element.");
            this.element = e,
            this.$element = t(e),
            this.options = t.extend({}, O, t.isPlainObject(a) && a),
            this.completed = !1,
            this.cropped = !1,
            this.disabled = !1,
            this.isImg = !1,
            this.limited = !1,
            this.loaded = !1,
            this.ready = !1,
            this.replaced = !1,
            this.wheeling = !1,
            this.originalUrl = "",
            this.canvas = null,
            this.cropBox = null,
            this.pointers = {},
            this.init()
        }
        return V(i, [{
            key: "init",
            value: function() {
                var t = this.$element
                  , i = void 0;
                if (t.is("img")) {
                    if (this.isImg = !0,
                    i = t.attr("src") || "",
                    this.originalUrl = i,
                    !i)
                        return;
                    i = t.prop("src")
                } else
                    t.is("canvas") && window.HTMLCanvasElement && (i = t[0].toDataURL());
                this.load(i)
            }
        }, {
            key: "trigger",
            value: function(i, e) {
                var a = t.Event(i, e);
                return this.$element.trigger(a),
                a
            }
        }, {
            key: "load",
            value: function(t) {
                var i = this;
                if (t) {
                    this.url = t,
                    this.image = {};
                    var e = this.$element
                      , a = this.options;
                    if (a.checkOrientation && window.ArrayBuffer)
                        if (H.test(t))
                            Y.test(t) ? this.read(w(t)) : this.clone();
                        else {
                            var n = new XMLHttpRequest;
                            n.onerror = function() {
                                i.clone()
                            }
                            ,
                            n.onload = function() {
                                i.read(n.response)
                            }
                            ,
                            a.checkCrossOrigin && r(t) && e.prop("crossOrigin") && (t = s(t)),
                            n.open("get", t),
                            n.responseType = "arraybuffer",
                            n.withCredentials = "use-credentials" === e.prop("crossOrigin"),
                            n.send()
                        }
                    else
                        this.clone()
                }
            }
        }, {
            key: "read",
            value: function(t) {
                var i = this.options
                  , e = this.image
                  , a = b(t)
                  , n = 0
                  , o = 1
                  , h = 1;
                if (a > 1) {
                    this.url = x(t, "image/jpeg");
                    var r = y(a);
                    n = r.rotate,
                    o = r.scaleX,
                    h = r.scaleY
                }
                i.rotatable && (e.rotate = n),
                i.scalable && (e.scaleX = o,
                e.scaleY = h),
                this.clone()
            }
        }, {
            key: "clone",
            value: function() {
                var i = this.$element
                  , e = this.options
                  , a = this.url
                  , n = ""
                  , o = void 0;
                e.checkCrossOrigin && r(a) && ((n = i.prop("crossOrigin")) ? o = a : (n = "anonymous",
                o = s(a))),
                this.crossOrigin = n,
                this.crossOriginUrl = o;
                var h = document.createElement("img");
                n && (h.crossOrigin = n),
                h.src = o || a;
                var c = t(h);
                this.$clone = c,
                this.isImg ? this.element.complete ? this.start() : i.one("load", t.proxy(this.start, this)) : c.one("load", t.proxy(this.start, this)).one("error", t.proxy(this.stop, this)).addClass("cropper-hide").insertAfter(i)
            }
        }, {
            key: "start",
            value: function() {
                var i = this
                  , e = this.$clone
                  , a = this.$element;
                this.isImg || (e.off("error", this.stop),
                a = e),
                d(a[0], function(e, a) {
                    t.extend(i.image, {
                        naturalWidth: e,
                        naturalHeight: a,
                        aspectRatio: e / a
                    }),
                    i.loaded = !0,
                    i.build()
                })
            }
        }, {
            key: "stop",
            value: function() {
                this.$clone.remove(),
                this.$clone = null
            }
        }, {
            key: "build",
            value: function() {
                var i = this;
                if (this.loaded) {
                    this.ready && this.unbuild();
                    var e = this.$element
                      , a = this.options
                      , n = this.$clone
                      , o = t('<div class="cropper-container"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-action="e"></span><span class="cropper-line line-n" data-action="n"></span><span class="cropper-line line-w" data-action="w"></span><span class="cropper-line line-s" data-action="s"></span><span class="cropper-point point-e" data-action="e"></span><span class="cropper-point point-n" data-action="n"></span><span class="cropper-point point-w" data-action="w"></span><span class="cropper-point point-s" data-action="s"></span><span class="cropper-point point-ne" data-action="ne"></span><span class="cropper-point point-nw" data-action="nw"></span><span class="cropper-point point-sw" data-action="sw"></span><span class="cropper-point point-se" data-action="se"></span></div></div>')
                      , h = o.find(".cropper-crop-box")
                      , r = h.find(".cropper-face");
                    this.$container = e.parent(),
                    this.$cropper = o,
                    this.$canvas = o.find(".cropper-canvas").append(n),
                    this.$dragBox = o.find(".cropper-drag-box"),
                    this.$cropBox = h,
                    this.$viewBox = o.find(".cropper-view-box"),
                    this.$face = r,
                    e.addClass(B).after(o),
                    this.isImg || n.removeClass("cropper-hide"),
                    this.initPreview(),
                    this.bind(),
                    a.aspectRatio = Math.max(0, a.aspectRatio) || NaN,
                    a.viewMode = Math.max(0, Math.min(3, Math.round(a.viewMode))) || 0,
                    this.cropped = a.autoCrop,
                    a.autoCrop ? a.modal && this.$dragBox.addClass("cropper-modal") : h.addClass(B),
                    a.guides || h.find(".cropper-dashed").addClass(B),
                    a.center || h.find(".cropper-center").addClass(B),
                    a.cropBoxMovable && r.addClass("cropper-move").data("action", "all"),
                    a.highlight || r.addClass("cropper-invisible"),
                    a.background && o.addClass("cropper-bg"),
                    a.cropBoxResizable || h.find(".cropper-line,.cropper-point").addClass(B),
                    this.setDragMode(a.dragMode),
                    this.render(),
                    this.ready = !0,
                    this.setData(a.data),
                    this.completing = setTimeout(function() {
                        t.isFunction(a.ready) && e.one("ready", a.ready),
                        i.trigger("ready"),
                        i.trigger("crop", i.getData()),
                        i.completed = !0
                    }, 0)
                }
            }
        }, {
            key: "unbuild",
            value: function() {
                this.ready && (this.completed || clearTimeout(this.completing),
                this.ready = !1,
                this.completed = !1,
                this.initialImage = null,
                this.initialCanvas = null,
                this.initialCropBox = null,
                this.container = null,
                this.canvas = null,
                this.cropBox = null,
                this.unbind(),
                this.resetPreview(),
                this.$preview = null,
                this.$viewBox = null,
                this.$cropBox = null,
                this.$dragBox = null,
                this.$canvas = null,
                this.$container = null,
                this.$cropper.remove(),
                this.$cropper = null)
            }
        }], [{
            key: "setDefaults",
            value: function(i) {
                t.extend(O, t.isPlainObject(i) && i)
            }
        }]),
        i
    }();
    if (t.extend && t.extend(G.prototype, S, j, q, Q, K, Z),
    t.fn) {
        var J = t.fn.cropper;
        t.fn.cropper = function(i) {
            for (var a = arguments.length, o = Array(a > 1 ? a - 1 : 0), h = 1; h < a; h++)
                o[h - 1] = arguments[h];
            var r = void 0;
            return this.each(function(a, n) {
                var h = t(n)
                  , s = h.data("cropper");
                if (!s) {
                    if (/destroy/.test(i))
                        return;
                    var c = t.extend({}, h.data(), t.isPlainObject(i) && i);
                    s = new G(n,c),
                    h.data("cropper", s)
                }
                if (e(i)) {
                    var d = s[i];
                    t.isFunction(d) && (r = d.apply(s, o))
                }
            }),
            n(r) ? this : r
        }
        ,
        t.fn.cropper.Constructor = G,
        t.fn.cropper.setDefaults = G.setDefaults,
        t.fn.cropper.noConflict = function() {
            return t.fn.cropper = J,
            this
        }
    }
});
