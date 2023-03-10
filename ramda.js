//  Ramda v0.23.0
//  https://github.com/ramda/ramda
//  (c) 2013-2016 Scott Sauyet, Michael Hurley, and David Chambers
//  Ramda may be freely distributed under the MIT license.

(function() {
    "use strict";
    var t = {
            "@@functional/placeholder": !0
        },
        n = function(t, n) {
            for (var r = 0, e = n.length - (t - 1), u = new Array(e >= 0 ? e : 0); e > r;) u[r] = Array.prototype.slice.call(n, r, r + t), r += 1;
            return u
        },
        r = function(t, n) {
            switch (t) {
                case 0:
                    return function() {
                        return n.apply(this, arguments)
                    };
                case 1:
                    return function(t) {
                        return n.apply(this, arguments)
                    };
                case 2:
                    return function(t, r) {
                        return n.apply(this, arguments)
                    };
                case 3:
                    return function(t, r, e) {
                        return n.apply(this, arguments)
                    };
                case 4:
                    return function(t, r, e, u) {
                        return n.apply(this, arguments)
                    };
                case 5:
                    return function(t, r, e, u, i) {
                        return n.apply(this, arguments)
                    };
                case 6:
                    return function(t, r, e, u, i, o) {
                        return n.apply(this, arguments)
                    };
                case 7:
                    return function(t, r, e, u, i, o, c) {
                        return n.apply(this, arguments)
                    };
                case 8:
                    return function(t, r, e, u, i, o, c, a) {
                        return n.apply(this, arguments)
                    };
                case 9:
                    return function(t, r, e, u, i, o, c, a, s) {
                        return n.apply(this, arguments)
                    };
                case 10:
                    return function(t, r, e, u, i, o, c, a, s, f) {
                        return n.apply(this, arguments)
                    };
                default:
                    throw new Error("First argument to _arity must be a non-negative integer no greater than ten")
            }
        },
        e = function(t) {
            for (var n, r = []; !(n = t.next()).done;) r.push(n.value);
            return r
        },
        u = function(t) {
            return new RegExp(t.source, (t.global ? "g" : "") + (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.sticky ? "y" : "") + (t.unicode ? "u" : ""))
        },
        i = function(t) {
            return function() {
                return !t.apply(this, arguments)
            }
        },
        o = function(t, n) {
            t = t || [], n = n || [];
            var r, e = t.length,
                u = n.length,
                i = [];
            for (r = 0; e > r;) i[i.length] = t[r], r += 1;
            for (r = 0; u > r;) i[i.length] = n[r], r += 1;
            return i
        },
        c = function(t, n, r) {
            for (var e = 0, u = r.length; u > e;) {
                if (t(n, r[e])) return !0;
                e += 1
            }
            return !1
        },
        a = function(t, n) {
            for (var r = n.length - 1; r >= 0 && t(n[r]);) r -= 1;
            return Array.prototype.slice.call(n, 0, r + 1)
        },
        s = function(t, n) {
            for (var r = 0, e = n.length, u = []; e > r;) t(n[r]) && (u[u.length] = n[r]), r += 1;
            return u
        },
        f = function(t) {
            return {
                "@@transducer/value": t,
                "@@transducer/reduced": !0
            }
        },
        l = function(t) {
            var n = String(t).match(/^function (\w*)/);
            return null == n ? "" : n[1]
        },
        p = function(t, n) {
            return Object.prototype.hasOwnProperty.call(n, t)
        },
        h = function(t) {
            return t
        },
        g = function() {
            var t = Object.prototype.toString;
            return "[object Arguments]" === t.call(arguments) ? function(n) {
                return "[object Arguments]" === t.call(n)
            } : function(t) {
                return p("callee", t)
            }
        }(),
        y = Array.isArray || function(t) {
            return null != t && t.length >= 0 && "[object Array]" === Object.prototype.toString.call(t)
        },
        d = function(t) {
            return "[object Function]" === Object.prototype.toString.call(t)
        },
        m = Number.isInteger || function(t) {
            return t << 0 === t
        },
        v = function(t) {
            return "[object Number]" === Object.prototype.toString.call(t)
        },
        w = function(t) {
            return "[object Object]" === Object.prototype.toString.call(t)
        },
        b = function(t) {
            return null != t && "object" == typeof t && t["@@functional/placeholder"] === !0
        },
        x = function(t) {
            return "[object RegExp]" === Object.prototype.toString.call(t)
        },
        A = function(t) {
            return "[object String]" === Object.prototype.toString.call(t)
        },
        j = function(t) {
            return "function" == typeof t["@@transducer/step"]
        },
        O = function(t, n) {
            for (var r = 0, e = n.length, u = Array(e); e > r;) u[r] = t(n[r]), r += 1;
            return u
        },
        S = function(t) {
            if (null == t) throw new TypeError("Cannot convert undefined or null to object");
            for (var n = Object(t), r = 1, e = arguments.length; e > r;) {
                var u = arguments[r];
                if (null != u)
                    for (var i in u) p(i, u) && (n[i] = u[i]);
                r += 1
            }
            return n
        },
        E = function(t) {
            return [t]
        },
        _ = function(t, n) {
            return function() {
                return n.call(this, t.apply(this, arguments))
            }
        },
        k = function(t, n) {
            return function() {
                var r = this;
                return t.apply(r, arguments).then(function(t) {
                    return n.call(r, t)
                })
            }
        },
        N = function(t) {
            var n = t.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
            return '"' + n.replace(/"/g, '\\"') + '"'
        },
        I = function(t) {
            return t && t["@@transducer/reduced"] ? t : {
                "@@transducer/value": t,
                "@@transducer/reduced": !0
            }
        },
        q = function() {
            var t = function(t) {
                return (10 > t ? "0" : "") + t
            };
            return "function" == typeof Date.prototype.toISOString ? function(t) {
                return t.toISOString()
            } : function(n) {
                return n.getUTCFullYear() + "-" + t(n.getUTCMonth() + 1) + "-" + t(n.getUTCDate()) + "T" + t(n.getUTCHours()) + ":" + t(n.getUTCMinutes()) + ":" + t(n.getUTCSeconds()) + "." + (n.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z"
            }
        }(),
        W = {
            init: function() {
                return this.xf["@@transducer/init"]()
            },
            result: function(t) {
                return this.xf["@@transducer/result"](t)
            }
        },
        C = function() {
            function t(t) {
                this.f = t
            }
            return t.prototype["@@transducer/init"] = function() {
                    throw new Error("init not implemented on XWrap")
                }, t.prototype["@@transducer/result"] = function(t) {
                    return t
                }, t.prototype["@@transducer/step"] = function(t, n) {
                    return this.f(t, n)
                },
                function(n) {
                    return new t(n)
                }
        }(),
        P = "function" == typeof Object.assign ? Object.assign : S,
        T = function(t, n) {
            return function() {
                var r = arguments.length;
                if (0 === r) return n();
                var e = arguments[r - 1];
                return y(e) || "function" != typeof e[t] ? n.apply(this, arguments) : e[t].apply(e, Array.prototype.slice.call(arguments, 0, r - 1))
            }
        },
        F = function(t) {
            return function n(r) {
                return 0 === arguments.length || b(r) ? n : t.apply(this, arguments)
            }
        },
        B = function(t) {
            return function n(r, e) {
                switch (arguments.length) {
                    case 0:
                        return n;
                    case 1:
                        return b(r) ? n : F(function(n) {
                            return t(r, n)
                        });
                    default:
                        return b(r) && b(e) ? n : b(r) ? F(function(n) {
                            return t(n, e)
                        }) : b(e) ? F(function(n) {
                            return t(r, n)
                        }) : t(r, e)
                }
            }
        },
        U = function(t) {
            return function n(r, e, u) {
                switch (arguments.length) {
                    case 0:
                        return n;
                    case 1:
                        return b(r) ? n : B(function(n, e) {
                            return t(r, n, e)
                        });
                    case 2:
                        return b(r) && b(e) ? n : b(r) ? B(function(n, r) {
                            return t(n, e, r)
                        }) : b(e) ? B(function(n, e) {
                            return t(r, n, e)
                        }) : F(function(n) {
                            return t(r, e, n)
                        });
                    default:
                        return b(r) && b(e) && b(u) ? n : b(r) && b(e) ? B(function(n, r) {
                            return t(n, r, u)
                        }) : b(r) && b(u) ? B(function(n, r) {
                            return t(n, e, r)
                        }) : b(e) && b(u) ? B(function(n, e) {
                            return t(r, n, e)
                        }) : b(r) ? F(function(n) {
                            return t(n, e, u)
                        }) : b(e) ? F(function(n) {
                            return t(r, n, u)
                        }) : b(u) ? F(function(n) {
                            return t(r, e, n)
                        }) : t(r, e, u)
                }
            }
        },
        R = function Mu(t, n, e) {
            return function() {
                for (var u = [], i = 0, o = t, c = 0; c < n.length || i < arguments.length;) {
                    var a;
                    c < n.length && (!b(n[c]) || i >= arguments.length) ? a = n[c] : (a = arguments[i], i += 1), u[c] = a, b(a) || (o -= 1), c += 1
                }
                return 0 >= o ? e.apply(this, u) : r(o, Mu(t, u, e))
            }
        },
        M = function(t, n, r) {
            return function() {
                if (0 === arguments.length) return r();
                var e = Array.prototype.slice.call(arguments, 0),
                    u = e.pop();
                if (!y(u)) {
                    for (var i = 0; i < t.length;) {
                        if ("function" == typeof u[t[i]]) return u[t[i]].apply(u, e);
                        i += 1
                    }
                    if (j(u)) {
                        var o = n.apply(null, e);
                        return o(u)
                    }
                }
                return r.apply(this, arguments)
            }
        },
        L = function() {
            function t(t, n) {
                this.xf = n, this.f = t, this.all = !0
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = function(t) {
                return this.all && (t = this.xf["@@transducer/step"](t, !0)), this.xf["@@transducer/result"](t)
            }, t.prototype["@@transducer/step"] = function(t, n) {
                return this.f(n) || (this.all = !1, t = I(this.xf["@@transducer/step"](t, !1))), t
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        D = function() {
            function t(t, n) {
                this.xf = n, this.f = t, this.any = !1
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = function(t) {
                return this.any || (t = this.xf["@@transducer/step"](t, !1)), this.xf["@@transducer/result"](t)
            }, t.prototype["@@transducer/step"] = function(t, n) {
                return this.f(n) && (this.any = !0, t = I(this.xf["@@transducer/step"](t, !0))), t
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        z = function() {
            function t(t, n) {
                this.xf = n, this.pos = 0, this.full = !1, this.acc = new Array(t)
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = function(t) {
                return this.acc = null, this.xf["@@transducer/result"](t)
            }, t.prototype["@@transducer/step"] = function(t, n) {
                return this.store(n), this.full ? this.xf["@@transducer/step"](t, this.getCopy()) : t
            }, t.prototype.store = function(t) {
                this.acc[this.pos] = t, this.pos += 1, this.pos === this.acc.length && (this.pos = 0, this.full = !0)
            }, t.prototype.getCopy = function() {
                return o(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos))
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        V = function() {
            function t(t, n) {
                this.xf = n, this.n = t
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = W.result, t.prototype["@@transducer/step"] = function(t, n) {
                return this.n > 0 ? (this.n -= 1, t) : this.xf["@@transducer/step"](t, n)
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        K = function() {
            function t(t, n) {
                this.xf = n, this.pos = 0, this.full = !1, this.acc = new Array(t)
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = function(t) {
                return this.acc = null, this.xf["@@transducer/result"](t)
            }, t.prototype["@@transducer/step"] = function(t, n) {
                return this.full && (t = this.xf["@@transducer/step"](t, this.acc[this.pos])), this.store(n), t
            }, t.prototype.store = function(t) {
                this.acc[this.pos] = t, this.pos += 1, this.pos === this.acc.length && (this.pos = 0, this.full = !0)
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        $ = function() {
            function t(t, n) {
                this.xf = n, this.pred = t, this.lastValue = void 0, this.seenFirstValue = !1
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = W.result, t.prototype["@@transducer/step"] = function(t, n) {
                var r = !1;
                return this.seenFirstValue ? this.pred(this.lastValue, n) && (r = !0) : this.seenFirstValue = !0, this.lastValue = n, r ? t : this.xf["@@transducer/step"](t, n)
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        H = function() {
            function t(t, n) {
                this.xf = n, this.f = t
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = W.result, t.prototype["@@transducer/step"] = function(t, n) {
                if (this.f) {
                    if (this.f(n)) return t;
                    this.f = null
                }
                return this.xf["@@transducer/step"](t, n)
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        X = function() {
            function t(t, n) {
                this.xf = n, this.f = t
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = W.result, t.prototype["@@transducer/step"] = function(t, n) {
                return this.f(n) ? this.xf["@@transducer/step"](t, n) : t
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        Y = function() {
            function t(t, n) {
                this.xf = n, this.f = t, this.found = !1
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = function(t) {
                return this.found || (t = this.xf["@@transducer/step"](t, void 0)), this.xf["@@transducer/result"](t)
            }, t.prototype["@@transducer/step"] = function(t, n) {
                return this.f(n) && (this.found = !0, t = I(this.xf["@@transducer/step"](t, n))), t
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        Z = function() {
            function t(t, n) {
                this.xf = n, this.f = t, this.idx = -1, this.found = !1
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = function(t) {
                return this.found || (t = this.xf["@@transducer/step"](t, -1)), this.xf["@@transducer/result"](t)
            }, t.prototype["@@transducer/step"] = function(t, n) {
                return this.idx += 1, this.f(n) && (this.found = !0, t = I(this.xf["@@transducer/step"](t, this.idx))), t
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        G = function() {
            function t(t, n) {
                this.xf = n, this.f = t
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = function(t) {
                return this.xf["@@transducer/result"](this.xf["@@transducer/step"](t, this.last))
            }, t.prototype["@@transducer/step"] = function(t, n) {
                return this.f(n) && (this.last = n), t
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        J = function() {
            function t(t, n) {
                this.xf = n, this.f = t, this.idx = -1, this.lastIdx = -1
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = function(t) {
                return this.xf["@@transducer/result"](this.xf["@@transducer/step"](t, this.lastIdx))
            }, t.prototype["@@transducer/step"] = function(t, n) {
                return this.idx += 1, this.f(n) && (this.lastIdx = this.idx), t
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        Q = function() {
            function t(t, n) {
                this.xf = n, this.f = t
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = W.result, t.prototype["@@transducer/step"] = function(t, n) {
                return this.xf["@@transducer/step"](t, this.f(n))
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        tt = function() {
            function t(t, n, r, e) {
                this.valueFn = t, this.valueAcc = n, this.keyFn = r, this.xf = e, this.inputs = {}
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = function(t) {
                var n;
                for (n in this.inputs)
                    if (p(n, this.inputs) && (t = this.xf["@@transducer/step"](t, this.inputs[n]), t["@@transducer/reduced"])) {
                        t = t["@@transducer/value"];
                        break
                    }
                return this.inputs = null, this.xf["@@transducer/result"](t)
            }, t.prototype["@@transducer/step"] = function(t, n) {
                var r = this.keyFn(n);
                return this.inputs[r] = this.inputs[r] || [r, this.valueAcc], this.inputs[r][1] = this.valueFn(this.inputs[r][1], n), t
            }, R(4, [], function(n, r, e, u) {
                return new t(n, r, e, u)
            })
        }(),
        nt = function() {
            function t(t, n) {
                this.xf = n, this.n = t, this.i = 0
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = W.result, t.prototype["@@transducer/step"] = function(t, n) {
                this.i += 1;
                var r = 0 === this.n ? t : this.xf["@@transducer/step"](t, n);
                return this.i >= this.n ? I(r) : r
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        rt = function() {
            function t(t, n) {
                this.xf = n, this.f = t
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = W.result, t.prototype["@@transducer/step"] = function(t, n) {
                return this.f(n) ? this.xf["@@transducer/step"](t, n) : I(t)
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        et = B(function(t, n) {
            return Number(t) + Number(n)
        }),
        ut = U(function(t, n, r) {
            if (n >= r.length || n < -r.length) return r;
            var e = 0 > n ? r.length : 0,
                u = e + n,
                i = o(r);
            return i[u] = t(r[u]), i
        }),
        it = B(M(["all"], L, function(t, n) {
            for (var r = 0; r < n.length;) {
                if (!t(n[r])) return !1;
                r += 1
            }
            return !0
        })),
        ot = F(function(t) {
            return function() {
                return t
            }
        }),
        ct = B(function(t, n) {
            return t && n
        }),
        at = B(M(["any"], D, function(t, n) {
            for (var r = 0; r < n.length;) {
                if (t(n[r])) return !0;
                r += 1
            }
            return !1
        })),
        st = B(M([], z, n)),
        ft = B(function(t, n) {
            return o(n, [t])
        }),
        lt = B(function(t, n) {
            return t.apply(this, n)
        }),
        pt = U(function(t, n, r) {
            var e = t(n),
                u = t(r);
            return u > e ? -1 : e > u ? 1 : 0
        }),
        ht = U(function(t, n, r) {
            var e = {};
            for (var u in r) e[u] = r[u];
            return e[t] = n, e
        }),
        gt = U(function Lu(t, n, r) {
            if (0 === t.length) return n;
            var e = t[0];
            if (t.length > 1) {
                var u = p(e, r) ? r[e] : m(t[1]) ? [] : {};
                n = Lu(Array.prototype.slice.call(t, 1), n, u)
            }
            if (m(e) && y(r)) {
                var i = [].concat(r);
                return i[e] = n, i
            }
            return ht(e, n, r)
        }),
        yt = B(function(t, n) {
            return r(t.length, function() {
                return t.apply(n, arguments)
            })
        }),
        dt = U(function(t, n, r) {
            if (t > n) throw new Error("min must not be greater than max in clamp(min, max, value)");
            return t > r ? t : r > n ? n : r
        }),
        mt = F(function(t) {
            return function(n, r) {
                return t(n, r) ? -1 : t(r, n) ? 1 : 0
            }
        }),
        vt = B(function(t, n) {
            return 1 === t ? F(n) : r(t, R(t, [], n))
        }),
        wt = et(-1),
        bt = B(function(t, n) {
            return null == n || n !== n ? t : n
        }),
        xt = U(function(t, n, r) {
            var e = t(n),
                u = t(r);
            return e > u ? -1 : u > e ? 1 : 0
        }),
        At = U(function(t, n, r) {
            for (var e = [], u = 0, i = n.length; i > u;) c(t, n[u], r) || c(t, n[u], e) || e.push(n[u]), u += 1;
            return e
        }),
        jt = B(function(t, n) {
            var r = {};
            for (var e in n) r[e] = n[e];
            return delete r[t], r
        }),
        Ot = B(function Du(t, n) {
            switch (t.length) {
                case 0:
                    return n;
                case 1:
                    return jt(t[0], n);
                default:
                    var r = t[0],
                        e = Array.prototype.slice.call(t, 1);
                    return null == n[r] ? n : ht(r, Du(e, n[r]), n)
            }
        }),
        St = B(function(t, n) {
            return t / n
        }),
        Et = B(M(["dropWhile"], H, function(t, n) {
            for (var r = 0, e = n.length; e > r && t(n[r]);) r += 1;
            return Array.prototype.slice.call(n, r)
        })),
        _t = F(function(t) {
            return null != t && "function" == typeof t.empty ? t.empty() : null != t && null != t.constructor && "function" == typeof t.constructor.empty ? t.constructor.empty() : y(t) ? [] : A(t) ? "" : w(t) ? {} : g(t) ? function() {
                return arguments
            }() : void 0
        }),
        kt = B(function zu(t, n) {
            var r, e, u, i = {};
            for (e in n) r = t[e], u = typeof r, i[e] = "function" === u ? r(n[e]) : r && "object" === u ? zu(r, n[e]) : n[e];
            return i
        }),
        Nt = B(M(["find"], Y, function(t, n) {
            for (var r = 0, e = n.length; e > r;) {
                if (t(n[r])) return n[r];
                r += 1
            }
        })),
        It = B(M([], Z, function(t, n) {
            for (var r = 0, e = n.length; e > r;) {
                if (t(n[r])) return r;
                r += 1
            }
            return -1
        })),
        qt = B(M([], G, function(t, n) {
            for (var r = n.length - 1; r >= 0;) {
                if (t(n[r])) return n[r];
                r -= 1
            }
        })),
        Wt = B(M([], J, function(t, n) {
            for (var r = n.length - 1; r >= 0;) {
                if (t(n[r])) return r;
                r -= 1
            }
            return -1
        })),
        Ct = B(T("forEach", function(t, n) {
            for (var r = n.length, e = 0; r > e;) t(n[e]), e += 1;
            return n
        })),
        Pt = F(function(t) {
            for (var n = {}, r = 0; r < t.length;) n[t[r][0]] = t[r][1], r += 1;
            return n
        }),
        Tt = B(function(t, n) {
            for (var r = [], e = 0, u = n.length; u > e;) {
                for (var i = e + 1; u > i && t(n[e], n[i]);) i += 1;
                r.push(n.slice(e, i)), e = i
            }
            return r
        }),
        Ft = B(function(t, n) {
            return t > n
        }),
        Bt = B(function(t, n) {
            return t >= n
        }),
        Ut = B(p),
        Rt = B(function(t, n) {
            return t in n
        }),
        Mt = B(function(t, n) {
            return t === n ? 0 !== t || 1 / t === 1 / n : t !== t && n !== n
        }),
        Lt = F(h),
        Dt = U(function(t, n, r) {
            return vt(Math.max(t.length, n.length, r.length), function() {
                return t.apply(this, arguments) ? n.apply(this, arguments) : r.apply(this, arguments)
            })
        }),
        zt = et(1),
        Vt = U(function(t, n, r) {
            t = t < r.length && t >= 0 ? t : r.length;
            var e = Array.prototype.slice.call(r, 0);
            return e.splice(t, 0, n), e
        }),
        Kt = U(function(t, n, r) {
            return t = t < r.length && t >= 0 ? t : r.length, [].concat(Array.prototype.slice.call(r, 0, t), n, Array.prototype.slice.call(r, t))
        }),
        $t = B(T("intersperse", function(t, n) {
            for (var r = [], e = 0, u = n.length; u > e;) e === u - 1 ? r.push(n[e]) : r.push(n[e], t), e += 1;
            return r
        })),
        Ht = B(function(t, n) {
            return null != n && n.constructor === t || n instanceof t
        }),
        Xt = F(function(t) {
            return y(t) ? !0 : t ? "object" != typeof t ? !1 : A(t) ? !1 : 1 === t.nodeType ? !!t.length : 0 === t.length ? !0 : t.length > 0 ? t.hasOwnProperty(0) && t.hasOwnProperty(t.length - 1) : !1 : !1
        }),
        Yt = F(function(t) {
            return null == t
        }),
        Zt = function() {
            var t = !{
                    toString: null
                }.propertyIsEnumerable("toString"),
                n = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
                r = function() {
                    return arguments.propertyIsEnumerable("length")
                }(),
                e = function(t, n) {
                    for (var r = 0; r < t.length;) {
                        if (t[r] === n) return !0;
                        r += 1
                    }
                    return !1
                };
            return F("function" != typeof Object.keys || r ? function(u) {
                if (Object(u) !== u) return [];
                var i, o, c = [],
                    a = r && g(u);
                for (i in u) !p(i, u) || a && "length" === i || (c[c.length] = i);
                if (t)
                    for (o = n.length - 1; o >= 0;) i = n[o], p(i, u) && !e(c, i) && (c[c.length] = i), o -= 1;
                return c
            } : function(t) {
                return Object(t) !== t ? [] : Object.keys(t)
            })
        }(),
        Gt = F(function(t) {
            var n, r = [];
            for (n in t) r[r.length] = n;
            return r
        }),
        Jt = F(function(t) {
            return null != t && v(t.length) ? t.length : NaN
        }),
        Qt = B(function(t, n) {
            return n > t
        }),
        tn = B(function(t, n) {
            return n >= t
        }),
        nn = U(function(t, n, r) {
            for (var e = 0, u = r.length, i = [], o = [n]; u > e;) o = t(o[0], r[e]), i[e] = o[1], e += 1;
            return [o[0], i]
        }),
        rn = U(function(t, n, r) {
            for (var e = r.length - 1, u = [], i = [n]; e >= 0;) i = t(r[e], i[0]), u[e] = i[1], e -= 1;
            return [u, i[0]]
        }),
        en = B(function(t, n) {
            return n.match(t) || []
        }),
        un = B(function(t, n) {
            return m(t) ? !m(n) || 1 > n ? NaN : (t % n + n) % n : NaN
        }),
        on = B(function(t, n) {
            return n > t ? n : t
        }),
        cn = U(function(t, n, r) {
            return t(r) > t(n) ? r : n
        }),
        an = B(function(t, n) {
            return P({}, t, n)
        }),
        sn = F(function(t) {
            return P.apply(null, [{}].concat(t))
        }),
        fn = U(function(t, n, r) {
            var e, u = {};
            for (e in n) p(e, n) && (u[e] = p(e, r) ? t(e, n[e], r[e]) : n[e]);
            for (e in r) p(e, r) && !p(e, u) && (u[e] = r[e]);
            return u
        }),
        ln = B(function(t, n) {
            return t > n ? n : t
        }),
        pn = U(function(t, n, r) {
            return t(r) < t(n) ? r : n
        }),
        hn = B(function(t, n) {
            return t % n
        }),
        gn = B(function(t, n) {
            return t * n
        }),
        yn = B(function(t, n) {
            switch (t) {
                case 0:
                    return function() {
                        return n.call(this)
                    };
                case 1:
                    return function(t) {
                        return n.call(this, t)
                    };
                case 2:
                    return function(t, r) {
                        return n.call(this, t, r)
                    };
                case 3:
                    return function(t, r, e) {
                        return n.call(this, t, r, e)
                    };
                case 4:
                    return function(t, r, e, u) {
                        return n.call(this, t, r, e, u)
                    };
                case 5:
                    return function(t, r, e, u, i) {
                        return n.call(this, t, r, e, u, i)
                    };
                case 6:
                    return function(t, r, e, u, i, o) {
                        return n.call(this, t, r, e, u, i, o)
                    };
                case 7:
                    return function(t, r, e, u, i, o, c) {
                        return n.call(this, t, r, e, u, i, o, c)
                    };
                case 8:
                    return function(t, r, e, u, i, o, c, a) {
                        return n.call(this, t, r, e, u, i, o, c, a)
                    };
                case 9:
                    return function(t, r, e, u, i, o, c, a, s) {
                        return n.call(this, t, r, e, u, i, o, c, a, s)
                    };
                case 10:
                    return function(t, r, e, u, i, o, c, a, s, f) {
                        return n.call(this, t, r, e, u, i, o, c, a, s, f)
                    };
                default:
                    throw new Error("First argument to nAry must be a non-negative integer no greater than ten")
            }
        }),
        dn = F(function(t) {
            return -t
        }),
        mn = B(i(M(["any"], D, at))),
        vn = F(function(t) {
            return !t
        }),
        wn = B(function(t, n) {
            var r = 0 > t ? n.length + t : t;
            return A(n) ? n.charAt(r) : n[r]
        }),
        bn = F(function(t) {
            var n = 0 > t ? 1 : t + 1;
            return vt(n, function() {
                return wn(t, arguments)
            })
        }),
        xn = B(function(t, n) {
            var r = {};
            return r[t] = n, r
        }),
        An = F(E),
        jn = F(function(t) {
            var n, e = !1;
            return r(t.length, function() {
                return e ? n : (e = !0, n = t.apply(this, arguments))
            })
        }),
        On = B(function(t, n) {
            return t || n
        }),
        Sn = function() {
            var t = function(n) {
                return {
                    value: n,
                    map: function(r) {
                        return t(r(n))
                    }
                }
            };
            return U(function(n, r, e) {
                return n(function(n) {
                    return t(r(n))
                })(e).value
            })
        }(),
        En = B(function(t, n) {
            return [t, n]
        }),
        _n = B(function(t, n) {
            for (var r = n, e = 0; e < t.length;) {
                if (null == r) return;
                r = r[t[e]], e += 1
            }
            return r
        }),
        kn = U(function(t, n, r) {
            return bt(t, _n(n, r))
        }),
        Nn = U(function(t, n, r) {
            return n.length > 0 && t(_n(n, r))
        }),
        In = B(function(t, n) {
            for (var r = {}, e = 0; e < t.length;) t[e] in n && (r[t[e]] = n[t[e]]), e += 1;
            return r
        }),
        qn = B(function(t, n) {
            for (var r = {}, e = 0, u = t.length; u > e;) {
                var i = t[e];
                r[i] = n[i], e += 1
            }
            return r
        }),
        Wn = B(function(t, n) {
            var r = {};
            for (var e in n) t(n[e], e, n) && (r[e] = n[e]);
            return r
        }),
        Cn = B(function(t, n) {
            return o([t], n)
        }),
        Pn = B(function(t, n) {
            return n[t]
        }),
        Tn = U(function(t, n, r) {
            return Ht(t, r[n])
        }),
        Fn = U(function(t, n, r) {
            return null != r && p(n, r) ? r[n] : t
        }),
        Bn = U(function(t, n, r) {
            return t(r[n])
        }),
        Un = B(function(t, n) {
            for (var r = t.length, e = [], u = 0; r > u;) e[u] = n[t[u]], u += 1;
            return e
        }),
        Rn = B(function(t, n) {
            if (!v(t) || !v(n)) throw new TypeError("Both arguments to range must be numbers");
            for (var r = [], e = t; n > e;) r.push(e), e += 1;
            return r
        }),
        Mn = U(function(t, n, r) {
            for (var e = r.length - 1; e >= 0;) n = t(r[e], n), e -= 1;
            return n
        }),
        Ln = F(I),
        Dn = U(function(t, n, r) {
            var e = Array.prototype.slice.call(r, 0);
            return e.splice(t, n), e
        }),
        zn = U(function(t, n, r) {
            return r.replace(t, n)
        }),
        Vn = F(function(t) {
            return A(t) ? t.split("").reverse().join("") : Array.prototype.slice.call(t, 0).reverse()
        }),
        Kn = U(function(t, n, r) {
            for (var e = 0, u = r.length, i = [n]; u > e;) n = t(n, r[e]), i[e + 1] = n, e += 1;
            return i
        }),
        $n = U(function(t, n, r) {
            return Sn(t, ot(n), r)
        }),
        Hn = U(T("slice", function(t, n, r) {
            return Array.prototype.slice.call(r, t, n)
        })),
        Xn = B(function(t, n) {
            return Array.prototype.slice.call(n, 0).sort(t)
        }),
        Yn = B(function(t, n) {
            return Array.prototype.slice.call(n, 0).sort(function(n, r) {
                var e = t(n),
                    u = t(r);
                return u > e ? -1 : e > u ? 1 : 0
            })
        }),
        Zn = B(function(t, n) {
            return Array.prototype.slice.call(n, 0).sort(function(n, r) {
                for (var e = 0, u = 0; 0 === e && u < t.length;) e = t[u](n, r), u += 1;
                return e
            })
        }),
        Gn = B(function(t, n) {
            return [Hn(0, t, n), Hn(t, Jt(n), n)]
        }),
        Jn = B(function(t, n) {
            if (0 >= t) throw new Error("First argument to splitEvery must be a positive integer");
            for (var r = [], e = 0; e < n.length;) r.push(Hn(e, e += t, n));
            return r
        }),
        Qn = B(function(t, n) {
            for (var r = 0, e = n.length, u = []; e > r && !t(n[r]);) u.push(n[r]), r += 1;
            return [u, Array.prototype.slice.call(n, r)]
        }),
        tr = B(function(t, n) {
            return Number(t) - Number(n)
        }),
        nr = F(T("tail", Hn(1, 1 / 0))),
        rr = B(M(["take"], nt, function(t, n) {
            return Hn(0, 0 > t ? 1 / 0 : t, n)
        })),
        er = B(function(t, n) {
            for (var r = n.length - 1; r >= 0 && t(n[r]);) r -= 1;
            return Array.prototype.slice.call(n, r + 1)
        }),
        ur = B(M(["takeWhile"], rt, function(t, n) {
            for (var r = 0, e = n.length; e > r && t(n[r]);) r += 1;
            return Array.prototype.slice.call(n, 0, r)
        })),
        ir = B(function(t, n) {
            return t(n), n
        }),
        or = B(function(t, n) {
            var r, e = Number(n),
                u = 0;
            if (0 > e || isNaN(e)) throw new RangeError("n must be a non-negative number");
            for (r = new Array(e); e > u;) r[u] = t(u), u += 1;
            return r
        }),
        cr = F(function(t) {
            var n = [];
            for (var r in t) p(r, t) && (n[n.length] = [r, t[r]]);
            return n
        }),
        ar = F(function(t) {
            var n = [];
            for (var r in t) n[n.length] = [r, t[r]];
            return n
        }),
        sr = F(function(t) {
            for (var n = 0, r = []; n < t.length;) {
                for (var e = t[n], u = 0; u < e.length;) "undefined" == typeof r[u] && (r[u] = []), r[u].push(e[u]), u += 1;
                n += 1
            }
            return r
        }),
        fr = function() {
            var t = "	\n\f\r  ????????????????????????????????????????????????\u2028\u2029\ufeff",
                n = "???",
                r = "function" == typeof String.prototype.trim;
            return F(r && !t.trim() && n.trim() ? function(t) {
                return t.trim()
            } : function(n) {
                var r = new RegExp("^[" + t + "][" + t + "]*"),
                    e = new RegExp("[" + t + "][" + t + "]*$");
                return n.replace(r, "").replace(e, "")
            })
        }(),
        lr = B(function(t, n) {
            return r(t.length, function() {
                try {
                    return t.apply(this, arguments)
                } catch (r) {
                    return n.apply(this, o([r], arguments))
                }
            })
        }),
        pr = F(function(t) {
            return null === t ? "Null" : void 0 === t ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1)
        }),
        hr = F(function(t) {
            return function() {
                return t(Array.prototype.slice.call(arguments, 0))
            }
        }),
        gr = F(function(t) {
            return yn(1, t)
        }),
        yr = B(function(t, n) {
            return vt(t, function() {
                for (var r, e = 1, u = n, i = 0; t >= e && "function" == typeof u;) r = e === t ? arguments.length : i + u.length, u = u.apply(this, Array.prototype.slice.call(arguments, i, r)), e += 1, i = r;
                return u
            })
        }),
        dr = B(function(t, n) {
            for (var r = t(n), e = []; r && r.length;) e[e.length] = r[0], r = t(r[1]);
            return e
        }),
        mr = B(function(t, n) {
            for (var r, e = 0, u = n.length, i = []; u > e;) r = n[e], c(t, r, i) || (i[i.length] = r), e += 1;
            return i
        }),
        vr = U(function(t, n, r) {
            return t(r) ? r : n(r)
        }),
        wr = U(function(t, n, r) {
            for (var e = r; !t(e);) e = n(e);
            return e
        }),
        br = U(function(t, n, r) {
            return ut(ot(n), t, r)
        }),
        xr = B(function(t, n) {
            return vt(n.length, function() {
                for (var r = [], e = 0; e < n.length;) r.push(n[e].call(this, arguments[e])), e += 1;
                return t.apply(this, r.concat(Array.prototype.slice.call(arguments, n.length)))
            })
        }),
        Ar = F(function(t) {
            for (var n = Zt(t), r = n.length, e = [], u = 0; r > u;) e[u] = t[n[u]], u += 1;
            return e
        }),
        jr = F(function(t) {
            var n, r = [];
            for (n in t) r[r.length] = t[n];
            return r
        }),
        Or = function() {
            var t = function(t) {
                return {
                    value: t,
                    map: function() {
                        return this
                    }
                }
            };
            return B(function(n, r) {
                return n(t)(r).value
            })
        }(),
        Sr = U(function(t, n, r) {
            return t(r) ? n(r) : r
        }),
        Er = B(function(t, n) {
            for (var r in t)
                if (p(r, t) && !t[r](n[r])) return !1;
            return !0
        }),
        _r = B(function(t, n) {
            for (var r, e = 0, u = t.length, i = n.length, o = []; u > e;) {
                for (r = 0; i > r;) o[o.length] = [t[e], n[r]], r += 1;
                e += 1
            }
            return o
        }),
        kr = B(function(t, n) {
            for (var r = [], e = 0, u = Math.min(t.length, n.length); u > e;) r[e] = [t[e], n[e]], e += 1;
            return r
        }),
        Nr = B(function(t, n) {
            for (var r = 0, e = Math.min(t.length, n.length), u = {}; e > r;) u[t[r]] = n[r], r += 1;
            return u
        }),
        Ir = U(function(t, n, r) {
            for (var e = [], u = 0, i = Math.min(n.length, r.length); i > u;) e[u] = t(n[u], r[u]), u += 1;
            return e
        }),
        qr = ot(!1),
        Wr = ot(!0),
        Cr = function Vu(t, n, r, e) {
            var i = function(u) {
                for (var i = n.length, o = 0; i > o;) {
                    if (t === n[o]) return r[o];
                    o += 1
                }
                n[o + 1] = t, r[o + 1] = u;
                for (var c in t) u[c] = e ? Vu(t[c], n, r, !0) : t[c];
                return u
            };
            switch (pr(t)) {
                case "Object":
                    return i({});
                case "Array":
                    return i([]);
                case "Date":
                    return new Date(t.valueOf());
                case "RegExp":
                    return u(t);
                default:
                    return t
            }
        },
        Pr = function(t) {
            return B(function(n, e) {
                return r(Math.max(0, n.length - e.length), function() {
                    return n.apply(this, t(e, arguments))
                })
            })
        },
        Tr = function(t, n) {
            return rr(t < n.length ? n.length - t : 0, n)
        },
        Fr = function Ku(t, n, r, u) {
            if (Mt(t, n)) return !0;
            if (pr(t) !== pr(n)) return !1;
            if (null == t || null == n) return !1;
            if ("function" == typeof t.equals || "function" == typeof n.equals) return "function" == typeof t.equals && t.equals(n) && "function" == typeof n.equals && n.equals(t);
            switch (pr(t)) {
                case "Arguments":
                case "Array":
                case "Object":
                    if ("function" == typeof t.constructor && "Promise" === l(t.constructor)) return t === n;
                    break;
                case "Boolean":
                case "Number":
                case "String":
                    if (typeof t != typeof n || !Mt(t.valueOf(), n.valueOf())) return !1;
                    break;
                case "Date":
                    if (!Mt(t.valueOf(), n.valueOf())) return !1;
                    break;
                case "Error":
                    return t.name === n.name && t.message === n.message;
                case "RegExp":
                    if (t.source !== n.source || t.global !== n.global || t.ignoreCase !== n.ignoreCase || t.multiline !== n.multiline || t.sticky !== n.sticky || t.unicode !== n.unicode) return !1;
                    break;
                case "Map":
                case "Set":
                    if (!Ku(e(t.entries()), e(n.entries()), r, u)) return !1;
                    break;
                case "Int8Array":
                case "Uint8Array":
                case "Uint8ClampedArray":
                case "Int16Array":
                case "Uint16Array":
                case "Int32Array":
                case "Uint32Array":
                case "Float32Array":
                case "Float64Array":
                    break;
                case "ArrayBuffer":
                    break;
                default:
                    return !1
            }
            var i = Zt(t);
            if (i.length !== Zt(n).length) return !1;
            for (var o = r.length - 1; o >= 0;) {
                if (r[o] === t) return u[o] === n;
                o -= 1
            }
            for (r.push(t), u.push(n), o = i.length - 1; o >= 0;) {
                var c = i[o];
                if (!p(c, n) || !Ku(n[c], t[c], r, u)) return !1;
                o -= 1
            }
            return r.pop(), u.pop(), !0
        },
        Br = function(t) {
            return function n(r) {
                for (var e, u, i, o = [], c = 0, a = r.length; a > c;) {
                    if (Xt(r[c]))
                        for (e = t ? n(r[c]) : r[c], i = 0, u = e.length; u > i;) o[o.length] = e[i], i += 1;
                    else o[o.length] = r[c];
                    c += 1
                }
                return o
            }
        },
        Ur = function() {
            function t(t, n, r) {
                for (var e = 0, u = r.length; u > e;) {
                    if (n = t["@@transducer/step"](n, r[e]), n && n["@@transducer/reduced"]) {
                        n = n["@@transducer/value"];
                        break
                    }
                    e += 1
                }
                return t["@@transducer/result"](n)
            }

            function n(t, n, r) {
                for (var e = r.next(); !e.done;) {
                    if (n = t["@@transducer/step"](n, e.value), n && n["@@transducer/reduced"]) {
                        n = n["@@transducer/value"];
                        break
                    }
                    e = r.next()
                }
                return t["@@transducer/result"](n)
            }

            function r(t, n, r) {
                return t["@@transducer/result"](r.reduce(yt(t["@@transducer/step"], t), n))
            }
            var e = "undefined" != typeof Symbol ? Symbol.iterator : "@@iterator";
            return function(u, i, o) {
                if ("function" == typeof u && (u = C(u)), Xt(o)) return t(u, i, o);
                if ("function" == typeof o.reduce) return r(u, i, o);
                if (null != o[e]) return n(u, i, o[e]());
                if ("function" == typeof o.next) return n(u, i, o);
                throw new TypeError("reduce: list must be array or iterable")
            }
        }(),
        Rr = function() {
            var t = {
                    "@@transducer/init": Array,
                    "@@transducer/step": function(t, n) {
                        return t.push(n), t
                    },
                    "@@transducer/result": h
                },
                n = {
                    "@@transducer/init": String,
                    "@@transducer/step": function(t, n) {
                        return t + n
                    },
                    "@@transducer/result": h
                },
                r = {
                    "@@transducer/init": Object,
                    "@@transducer/step": function(t, n) {
                        return P(t, Xt(n) ? xn(n[0], n[1]) : n)
                    },
                    "@@transducer/result": h
                };
            return function(e) {
                if (j(e)) return e;
                if (Xt(e)) return t;
                if ("string" == typeof e) return n;
                if ("object" == typeof e) return r;
                throw new Error("Cannot create transformer for " + e)
            }
        }(),
        Mr = function() {
            function t(t, n) {
                this.f = t, this.retained = [], this.xf = n
            }
            return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = function(t) {
                return this.retained = null, this.xf["@@transducer/result"](t)
            }, t.prototype["@@transducer/step"] = function(t, n) {
                return this.f(n) ? this.retain(t, n) : this.flush(t, n)
            }, t.prototype.flush = function(t, n) {
                return t = Ur(this.xf["@@transducer/step"], t, this.retained), this.retained = [], this.xf["@@transducer/step"](t, n)
            }, t.prototype.retain = function(t, n) {
                return this.retained.push(n), t
            }, B(function(n, r) {
                return new t(n, r)
            })
        }(),
        Lr = F(function(t) {
            return vt(t.length, function() {
                var n = 0,
                    r = arguments[0],
                    e = arguments[arguments.length - 1],
                    u = Array.prototype.slice.call(arguments, 0);
                return u[0] = function() {
                    var t = r.apply(this, o(arguments, [n, e]));
                    return n += 1, t
                }, t.apply(this, u)
            })
        }),
        Dr = F(function(t) {
            return yn(2, t)
        }),
        zr = F(function(t) {
            return null != t && "function" == typeof t.clone ? t.clone() : Cr(t, [], [], !0)
        }),
        Vr = F(function(t) {
            return vt(t.length, t)
        }),
        Kr = B(M(["drop"], V, function(t, n) {
            return Hn(Math.max(0, t), 1 / 0, n)
        })),
        $r = B(M([], K, Tr)),
        Hr = B(M([], Mr, a)),
        Xr = B(function(t, n) {
            return Fr(t, n, [], [])
        }),
        Yr = B(M(["filter"], X, function(t, n) {
            return w(n) ? Ur(function(r, e) {
                return t(n[e]) && (r[e] = n[e]), r
            }, {}, Zt(n)) : s(t, n)
        })),
        Zr = F(Br(!0)),
        Gr = F(function(t) {
            return Vr(function(n, r) {
                var e = Array.prototype.slice.call(arguments, 0);
                return e[0] = r, e[1] = n, t.apply(this, e)
            })
        }),
        Jr = B(function(t, n) {
            for (var r = Zt(n), e = 0; e < r.length;) {
                var u = r[e];
                t(n[u], u, n), e += 1
            }
            return n
        }),
        Qr = wn(0),
        te = Hn(0, -1),
        ne = U(function(t, n, r) {
            var e, u;
            n.length > r.length ? (e = n, u = r) : (e = r, u = n);
            for (var i = [], o = 0; o < u.length;) c(t, u[o], e) && (i[i.length] = u[o]), o += 1;
            return mr(t, i)
        }),
        re = U(function(t, n, r) {
            return j(t) ? Ur(n(t), t["@@transducer/init"](), r) : Ur(n(Rr(t)), Cr(t, [], [], !1), r)
        }),
        ee = F(function(t) {
            for (var n = Zt(t), r = n.length, e = 0, u = {}; r > e;) {
                var i = n[e],
                    o = t[i],
                    c = p(o, u) ? u[o] : u[o] = [];
                c[c.length] = i, e += 1
            }
            return u
        }),
        ue = F(function(t) {
            for (var n = Zt(t), r = n.length, e = 0, u = {}; r > e;) {
                var i = n[e];
                u[t[i]] = i, e += 1
            }
            return u
        }),
        ie = F(function(t) {
            return null != t && Xr(t, _t(t))
        }),
        oe = wn(-1),
        ce = B(function(t, n) {
            if ("function" != typeof n.lastIndexOf || y(n)) {
                for (var r = n.length - 1; r >= 0;) {
                    if (Xr(n[r], t)) return r;
                    r -= 1
                }
                return -1
            }
            return n.lastIndexOf(t)
        }),
        ae = B(M(["map"], Q, function(t, n) {
            switch (Object.prototype.toString.call(n)) {
                case "[object Function]":
                    return vt(n.length, function() {
                        return t.call(this, n.apply(this, arguments))
                    });
                case "[object Object]":
                    return Ur(function(r, e) {
                        return r[e] = t(n[e]), r
                    }, {}, Zt(n));
                default:
                    return O(t, n)
            }
        })),
        se = B(function(t, n) {
            return Ur(function(r, e) {
                return r[e] = t(n[e], e, n), r
            }, {}, Zt(n))
        }),
        fe = U(function(t, n, r) {
            return fn(function(n, r, e) {
                return t(r, e)
            }, n, r)
        }),
        le = Pr(o),
        pe = Pr(Gr(o)),
        he = U(function(t, n, r) {
            return Xr(_n(t, r), n)
        }),
        ge = B(function(t, n) {
            return ae(Pn(t), n)
        }),
        ye = xr(O, [qn, Lt]),
        de = U(function(t, n, r) {
            return Xr(n, r[t])
        }),
        me = U(Ur),
        ve = R(4, [], M([], tt, function(t, n, r, e) {
            return Ur(function(e, u) {
                var i = r(u);
                return e[i] = t(p(i, e) ? e[i] : n, u), e
            }, {}, e)
        })),
        we = R(4, [], function(t, n, r, e) {
            return Ur(function(r, e) {
                return t(r, e) ? n(r, e) : I(r)
            }, r, e)
        }),
        be = B(function(t, n) {
            return Yr(i(t), n)
        }),
        xe = B(function(t, n) {
            return or(ot(t), n)
        }),
        Ae = me(et, 0),
        je = B(function(t, n) {
            return Kr(t >= 0 ? n.length - t : 0, n)
        }),
        Oe = vt(4, function(t, n, r, e) {
            return Ur(t("function" == typeof n ? C(n) : n), r, e)
        }),
        Se = U(function(t, n, r) {
            return mr(t, o(n, r))
        }),
        Ee = B(function(t, n) {
            return Er(ae(Xr, t), n)
        }),
        _e = function() {
            var t = function(t) {
                return {
                    "@@transducer/init": W.init,
                    "@@transducer/result": function(n) {
                        return t["@@transducer/result"](n)
                    },
                    "@@transducer/step": function(n, r) {
                        var e = t["@@transducer/step"](n, r);
                        return e["@@transducer/reduced"] ? f(e) : e
                    }
                }
            };
            return function(n) {
                var r = t(n);
                return {
                    "@@transducer/init": W.init,
                    "@@transducer/result": function(t) {
                        return r["@@transducer/result"](t)
                    },
                    "@@transducer/step": function(t, n) {
                        return Xt(n) ? Ur(r, t, n) : Ur(r, t, [n])
                    }
                }
            }
        }(),
        ke = function(t, n, r) {
            var e, u;
            if ("function" == typeof t.indexOf) switch (typeof n) {
                case "number":
                    if (0 === n) {
                        for (e = 1 / n; r < t.length;) {
                            if (u = t[r], 0 === u && 1 / u === e) return r;
                            r += 1
                        }
                        return -1
                    }
                    if (n !== n) {
                        for (; r < t.length;) {
                            if (u = t[r], "number" == typeof u && u !== u) return r;
                            r += 1
                        }
                        return -1
                    }
                    return t.indexOf(n, r);
                case "string":
                case "boolean":
                case "function":
                case "undefined":
                    return t.indexOf(n, r);
                case "object":
                    if (null === n) return t.indexOf(n, r)
            }
            for (; r < t.length;) {
                if (Xr(t[r], n)) return r;
                r += 1
            }
            return -1
        },
        Ne = B(function(t, n) {
            return ae(t, _e(n))
        }),
        Ie = F(function(t) {
            return vt(me(on, 0, ge("length", t)), function() {
                for (var n = 0, r = t.length; r > n;) {
                    if (!t[n].apply(this, arguments)) return !1;
                    n += 1
                }
                return !0
            })
        }),
        qe = F(function(t) {
            return vt(me(on, 0, ge("length", t)), function() {
                for (var n = 0, r = t.length; r > n;) {
                    if (t[n].apply(this, arguments)) return !0;
                    n += 1
                }
                return !1
            })
        }),
        We = B(function(t, n) {
            return "function" == typeof t.ap ? t.ap(n) : "function" == typeof t ? function(r) {
                return t(r)(n(r))
            } : Ur(function(t, r) {
                return o(t, ae(r, n))
            }, [], t)
        }),
        Ce = F(function $u(t) {
            return t = ae(function(t) {
                return "function" == typeof t ? t : $u(t)
            }, t), vt(me(on, 0, ge("length", Ar(t))), function() {
                var n = arguments;
                return ae(function(t) {
                    return lt(t, n)
                }, t)
            })
        }),
        Pe = Vr(function(t) {
            return t.apply(this, Array.prototype.slice.call(arguments, 1))
        }),
        Te = B(M(["chain"], Ne, function(t, n) {
            return "function" == typeof n ? function(r) {
                return t(n(r))(r)
            } : Br(!1)(ae(t, n))
        })),
        Fe = F(function(t) {
            var n = me(on, 0, ae(function(t) {
                return t[0].length
            }, t));
            return r(n, function() {
                for (var n = 0; n < t.length;) {
                    if (t[n][0].apply(this, arguments)) return t[n][1].apply(this, arguments);
                    n += 1
                }
            })
        }),
        Be = B(function(t, n) {
            if (t > 10) throw new Error("Constructor with greater than ten arguments");
            return 0 === t ? function() {
                return new n
            } : Vr(yn(t, function(t, r, e, u, i, o, c, a, s, f) {
                switch (arguments.length) {
                    case 1:
                        return new n(t);
                    case 2:
                        return new n(t, r);
                    case 3:
                        return new n(t, r, e);
                    case 4:
                        return new n(t, r, e, u);
                    case 5:
                        return new n(t, r, e, u, i);
                    case 6:
                        return new n(t, r, e, u, i, o);
                    case 7:
                        return new n(t, r, e, u, i, o, c);
                    case 8:
                        return new n(t, r, e, u, i, o, c, a);
                    case 9:
                        return new n(t, r, e, u, i, o, c, a, s);
                    case 10:
                        return new n(t, r, e, u, i, o, c, a, s, f)
                }
            }))
        }),
        Ue = B(function(t, n) {
            return vt(me(on, 0, ge("length", n)), function() {
                var r = arguments,
                    e = this;
                return t.apply(e, O(function(t) {
                    return t.apply(e, r)
                }, n))
            })
        }),
        Re = ve(function(t, n) {
            return t + 1
        }, 0),
        Me = B(M([], $, function(t, n) {
            var r = [],
                e = 1,
                u = n.length;
            if (0 !== u)
                for (r[0] = n[0]; u > e;) t(oe(r), n[e]) || (r[r.length] = n[e]), e += 1;
            return r
        })),
        Le = U(function(t, n, r) {
            return Xr(t(n), t(r))
        }),
        De = U(function(t, n, r) {
            return Xr(n[t], r[t])
        }),
        ze = B(T("groupBy", ve(function(t, n) {
            return null == t && (t = []), t.push(n), t
        }, null))),
        Ve = ve(function(t, n) {
            return n
        }, null),
        Ke = B(function(t, n) {
            return "function" != typeof n.indexOf || y(n) ? ke(n, t, 0) : n.indexOf(t)
        }),
        $e = F(function(t) {
            return Ue(function() {
                return Array.prototype.slice.call(arguments, 0)
            }, t)
        }),
        He = B(function(t, n) {
            return function(r) {
                return function(e) {
                    return ae(function(t) {
                        return n(t, e)
                    }, r(t(e)))
                }
            }
        }),
        Xe = F(function(t) {
            return He(wn(t), br(t))
        }),
        Ye = F(function(t) {
            return He(_n(t), gt(t))
        }),
        Ze = F(function(t) {
            return He(Pn(t), ht(t))
        }),
        Ge = B(function(t, n) {
            var r = vt(t, n);
            return vt(t, function() {
                return Ur(We, ae(r, arguments[0]), Array.prototype.slice.call(arguments, 1))
            })
        }),
        Je = F(function(t) {
            return Ae(t) / t.length
        }),
        Qe = F(function(t) {
            var n = t.length;
            if (0 === n) return NaN;
            var r = 2 - n % 2,
                e = (n - r) / 2;
            return Je(Array.prototype.slice.call(t, 0).sort(function(t, n) {
                return n > t ? -1 : t > n ? 1 : 0
            }).slice(e, e + r))
        }),
        tu = $e([Yr, be]),
        nu = function() {
            if (0 === arguments.length) throw new Error("pipe requires at least one argument");
            return r(arguments[0].length, me(_, arguments[0], nr(arguments)))
        },
        ru = function() {
            if (0 === arguments.length) throw new Error("pipeP requires at least one argument");
            return r(arguments[0].length, me(k, arguments[0], nr(arguments)))
        },
        eu = me(gn, 1),
        uu = B(function(t, n) {
            return "function" == typeof n.sequence ? n.sequence(t) : Mn(function(t, n) {
                return We(ae(Cn, t), n)
            }, t([]), n)
        }),
        iu = U(function(t, n, r) {
            return uu(t, ae(n, r))
        }),
        ou = Te(h),
        cu = function(t, n) {
            return ke(n, t, 0) >= 0
        },
        au = function Hu(t, n) {
            var r = function(r) {
                    var e = n.concat([t]);
                    return cu(r, e) ? "<Circular>" : Hu(r, e)
                },
                e = function(t, n) {
                    return O(function(n) {
                        return N(n) + ": " + r(t[n])
                    }, n.slice().sort())
                };
            switch (Object.prototype.toString.call(t)) {
                case "[object Arguments]":
                    return "(function() { return arguments; }(" + O(r, t).join(", ") + "))";
                case "[object Array]":
                    return "[" + O(r, t).concat(e(t, be(function(t) {
                        return /^\d+$/.test(t)
                    }, Zt(t)))).join(", ") + "]";
                case "[object Boolean]":
                    return "object" == typeof t ? "new Boolean(" + r(t.valueOf()) + ")" : t.toString();
                case "[object Date]":
                    return "new Date(" + (isNaN(t.valueOf()) ? r(NaN) : N(q(t))) + ")";
                case "[object Null]":
                    return "null";
                case "[object Number]":
                    return "object" == typeof t ? "new Number(" + r(t.valueOf()) + ")" : 1 / t === -(1 / 0) ? "-0" : t.toString(10);
                case "[object String]":
                    return "object" == typeof t ? "new String(" + r(t.valueOf()) + ")" : N(t);
                case "[object Undefined]":
                    return "undefined";
                default:
                    if ("function" == typeof t.toString) {
                        var u = t.toString();
                        if ("[object Object]" !== u) return u
                    }
                    return "{" + e(t, Zt(t)).join(", ") + "}"
            }
        },
        su = function() {
            if (0 === arguments.length) throw new Error("compose requires at least one argument");
            return nu.apply(this, Vn(arguments))
        },
        fu = function() {
            if (0 === arguments.length) throw new Error("composeK requires at least one argument");
            var t = Array.prototype.slice.call(arguments),
                n = t.pop();
            return su(su.apply(this, ae(Te, t)), n)
        },
        lu = function() {
            if (0 === arguments.length) throw new Error("composeP requires at least one argument");
            return ru.apply(this, Vn(arguments))
        },
        pu = F(function(t) {
            return Be(t.length, t)
        }),
        hu = B(cu),
        gu = B(function(t, n) {
            for (var r = [], e = 0, u = t.length; u > e;) cu(t[e], n) || cu(t[e], r) || (r[r.length] = t[e]), e += 1;
            return r
        }),
        yu = F(M([], $(Xr), Me(Xr))),
        du = F(function(t) {
            return Ge(t.length, t)
        }),
        mu = B(function(t, n) {
            var r = {};
            for (var e in n) cu(e, t) || (r[e] = n[e]);
            return r
        }),
        vu = function() {
            if (0 === arguments.length) throw new Error("pipeK requires at least one argument");
            return fu.apply(this, Vn(arguments))
        },
        wu = F(function(t) {
            return au(t, [])
        }),
        bu = B(function(t, n) {
            return be(Gr(cu)(t), n)
        }),
        xu = function() {
            function t() {
                this._nativeSet = "function" == typeof Set ? new Set : null, this._items = {}
            }

            function n(t, n, r) {
                var e, u, i = typeof t;
                switch (i) {
                    case "string":
                    case "number":
                        return 0 === t && 1 / t === -(1 / 0) ? r._items["-0"] ? !0 : (n && (r._items["-0"] = !0), !1) : null !== r._nativeSet ? n ? (e = r._nativeSet.size, r._nativeSet.add(t), u = r._nativeSet.size, u === e) : r._nativeSet.has(t) : i in r._items ? t in r._items[i] ? !0 : (n && (r._items[i][t] = !0), !1) : (n && (r._items[i] = {}, r._items[i][t] = !0), !1);
                    case "boolean":
                        if (i in r._items) {
                            var o = t ? 1 : 0;
                            return r._items[i][o] ? !0 : (n && (r._items[i][o] = !0), !1)
                        }
                        return n && (r._items[i] = t ? [!1, !0] : [!0, !1]), !1;
                    case "function":
                        return null !== r._nativeSet ? n ? (e = r._nativeSet.size, r._nativeSet.add(t), u = r._nativeSet.size, u === e) : r._nativeSet.has(t) : i in r._items ? cu(t, r._items[i]) ? !0 : (n && r._items[i].push(t), !1) : (n && (r._items[i] = [t]), !1);
                    case "undefined":
                        return r._items[i] ? !0 : (n && (r._items[i] = !0), !1);
                    case "object":
                        if (null === t) return r._items["null"] ? !0 : (n && (r._items["null"] = !0), !1);
                    default:
                        return i = Object.prototype.toString.call(t), i in r._items ? cu(t, r._items[i]) ? !0 : (n && r._items[i].push(t), !1) : (n && (r._items[i] = [t]), !1)
                }
            }
            return t.prototype.add = function(t) {
                return !n(t, !0, this)
            }, t.prototype.has = function(t) {
                return n(t, !1, this)
            }, t
        }(),
        Au = B(function(t, n) {
            return d(t) ? function() {
                return t.apply(this, arguments) && n.apply(this, arguments)
            } : du(ct)(t, n)
        }),
        ju = du(vn),
        Ou = B(function(t, n) {
            if (null == t || !d(t.concat)) throw new TypeError(wu(t) + ' does not have a method named "concat"');
            if (y(t) && !y(n)) throw new TypeError(wu(n) + " is not an array");
            return t.concat(n)
        }),
        Su = B(function(t, n) {
            return d(t) ? function() {
                return t.apply(this, arguments) || n.apply(this, arguments)
            } : du(On)(t, n)
        }),
        Eu = B(function(t, n) {
            return vt(t + 1, function() {
                var r = arguments[t];
                if (null != r && d(r[n])) return r[n].apply(r, Array.prototype.slice.call(arguments, 0, t));
                throw new TypeError(wu(r) + ' does not have a method named "' + n + '"')
            })
        }),
        _u = Eu(1, "join"),
        ku = F(function(t) {
            var n = {};
            return r(t.length, function() {
                var r = wu(arguments);
                return p(r, n) || (n[r] = t.apply(this, arguments)), n[r]
            })
        }),
        Nu = Eu(1, "split"),
        Iu = B(function(t, n) {
            return Ou(gu(t, n), gu(n, t))
        }),
        qu = U(function(t, n, r) {
            return Ou(At(t, n, r), At(t, r, n))
        }),
        Wu = B(function(t, n) {
            if (!x(t)) throw new TypeError("???test??? requires a value of type RegExp as its first argument; received " + wu(t));
            return u(t).test(n)
        }),
        Cu = Eu(0, "toLowerCase"),
        Pu = Eu(0, "toUpperCase"),
        Tu = B(function(t, n) {
            for (var r, e, u = new xu, i = [], o = 0; o < n.length;) e = n[o], r = t(e), u.add(r) && i.push(e), o += 1;
            return i
        }),
        Fu = Tu(Lt),
        Bu = B(function(t, n) {
            var r, e;
            return t.length > n.length ? (r = t, e = n) : (r = n, e = t), Fu(s(Gr(cu)(r), e))
        }),
        Uu = B(su(Fu, o)),
        Ru = {
            F: qr,
            T: Wr,
            __: t,
            add: et,
            addIndex: Lr,
            adjust: ut,
            all: it,
            allPass: Ie,
            always: ot,
            and: ct,
            any: at,
            anyPass: qe,
            ap: We,
            aperture: st,
            append: ft,
            apply: lt,
            applySpec: Ce,
            ascend: pt,
            assoc: ht,
            assocPath: gt,
            binary: Dr,
            bind: yt,
            both: Au,
            call: Pe,
            chain: Te,
            clamp: dt,
            clone: zr,
            comparator: mt,
            complement: ju,
            compose: su,
            composeK: fu,
            composeP: lu,
            concat: Ou,
            cond: Fe,
            construct: pu,
            constructN: Be,
            contains: hu,
            converge: Ue,
            countBy: Re,
            curry: Vr,
            curryN: vt,
            dec: wt,
            defaultTo: bt,
            descend: xt,
            difference: gu,
            differenceWith: At,
            dissoc: jt,
            dissocPath: Ot,
            divide: St,
            drop: Kr,
            dropLast: $r,
            dropLastWhile: Hr,
            dropRepeats: yu,
            dropRepeatsWith: Me,
            dropWhile: Et,
            either: Su,
            empty: _t,
            eqBy: Le,
            eqProps: De,
            equals: Xr,
            evolve: kt,
            filter: Yr,
            find: Nt,
            findIndex: It,
            findLast: qt,
            findLastIndex: Wt,
            flatten: Zr,
            flip: Gr,
            forEach: Ct,
            forEachObjIndexed: Jr,
            fromPairs: Pt,
            groupBy: ze,
            groupWith: Tt,
            gt: Ft,
            gte: Bt,
            has: Ut,
            hasIn: Rt,
            head: Qr,
            identical: Mt,
            identity: Lt,
            ifElse: Dt,
            inc: zt,
            indexBy: Ve,
            indexOf: Ke,
            init: te,
            insert: Vt,
            insertAll: Kt,
            intersection: Bu,
            intersectionWith: ne,
            intersperse: $t,
            into: re,
            invert: ee,
            invertObj: ue,
            invoker: Eu,
            is: Ht,
            isArrayLike: Xt,
            isEmpty: ie,
            isNil: Yt,
            join: _u,
            juxt: $e,
            keys: Zt,
            keysIn: Gt,
            last: oe,
            lastIndexOf: ce,
            length: Jt,
            lens: He,
            lensIndex: Xe,
            lensPath: Ye,
            lensProp: Ze,
            lift: du,
            liftN: Ge,
            lt: Qt,
            lte: tn,
            map: ae,
            mapAccum: nn,
            mapAccumRight: rn,
            mapObjIndexed: se,
            match: en,
            mathMod: un,
            max: on,
            maxBy: cn,
            mean: Je,
            median: Qe,
            memoize: ku,
            merge: an,
            mergeAll: sn,
            mergeWith: fe,
            mergeWithKey: fn,
            min: ln,
            minBy: pn,
            modulo: hn,
            multiply: gn,
            nAry: yn,
            negate: dn,
            none: mn,
            not: vn,
            nth: wn,
            nthArg: bn,
            objOf: xn,
            of: An,
            omit: mu,
            once: jn,
            or: On,
            over: Sn,
            pair: En,
            partial: le,
            partialRight: pe,
            partition: tu,
            path: _n,
            pathEq: he,
            pathOr: kn,
            pathSatisfies: Nn,
            pick: In,
            pickAll: qn,
            pickBy: Wn,
            pipe: nu,
            pipeK: vu,
            pipeP: ru,
            pluck: ge,
            prepend: Cn,
            product: eu,
            project: ye,
            prop: Pn,
            propEq: de,
            propIs: Tn,
            propOr: Fn,
            propSatisfies: Bn,
            props: Un,
            range: Rn,
            reduce: me,
            reduceBy: ve,
            reduceRight: Mn,
            reduceWhile: we,
            reduced: Ln,
            reject: be,
            remove: Dn,
            repeat: xe,
            replace: zn,
            reverse: Vn,
            scan: Kn,
            sequence: uu,
            set: $n,
            slice: Hn,
            sort: Xn,
            sortBy: Yn,
            sortWith: Zn,
            split: Nu,
            splitAt: Gn,
            splitEvery: Jn,
            splitWhen: Qn,
            subtract: tr,
            sum: Ae,
            symmetricDifference: Iu,
            symmetricDifferenceWith: qu,
            tail: nr,
            take: rr,
            takeLast: je,
            takeLastWhile: er,
            takeWhile: ur,
            tap: ir,
            test: Wu,
            times: or,
            toLower: Cu,
            toPairs: cr,
            toPairsIn: ar,
            toString: wu,
            toUpper: Pu,
            transduce: Oe,
            transpose: sr,
            traverse: iu,
            trim: fr,
            tryCatch: lr,
            type: pr,
            unapply: hr,
            unary: gr,
            uncurryN: yr,
            unfold: dr,
            union: Uu,
            unionWith: Se,
            uniq: Fu,
            uniqBy: Tu,
            uniqWith: mr,
            unless: vr,
            unnest: ou,
            until: wr,
            update: br,
            useWith: xr,
            values: Ar,
            valuesIn: jr,
            view: Or,
            when: Sr,
            where: Er,
            whereEq: Ee,
            without: bu,
            xprod: _r,
            zip: kr,
            zipObj: Nr,
            zipWith: Ir
        };
    "object" == typeof exports ? module.exports = Ru : "function" == typeof define && define.amd ? define(function() {
        return Ru
    }) : this.R = Ru
}).call(this);