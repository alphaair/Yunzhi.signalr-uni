var _a;
/**
 * 兼容 Uni app 平台的 WebSocket 连接实现。
 * @author Fred Yuan
 * @see uni-doc https://uniapp.dcloud.io/api/request/websocket
 *              https://github.com/dcloudio/uni-app/blob/master/src/core/service/api/network/socket.js
 */
export const UniWebSocket = (_a = class UniSocket {
        get url() { return this._url; }
        get bufferedAmount() { return 0; }
        get extensions() { return ""; }
        get protocol() { return ""; }
        get readyState() {
            return this._socket.readyState;
        }
        constructor(url, protocols, options) {
            this.binaryType = "blob";
            this.onclose = null;
            this.onerror = null;
            this.onmessage = null;
            this.onopen = null;
            this.CLOSED = 3;
            this.CLOSING = 2;
            this.OPEN = 1;
            this.CONNECTING = 0;
            this._url = url;
            // tslint:disable-next-line:variable-name
            let _protocols;
            if (typeof protocols === "string") {
                _protocols = [protocols];
            }
            else if (Array.isArray(protocols)) {
                _protocols = protocols;
            }
            const header = { "Content-Type": "application/json" };
            const connectOption = {
                url,
                header,
                method: "GET",
                protocols: _protocols,
                success(res) {
                    console.log("[UniWebSocket] uni.connectSocket invoke success.", res);
                },
                fail(err) {
                    console.error("[UniWebSocket] uni.connectSocket invoke faild.", err);
                },
            };
            if (typeof options === "object") {
                if (typeof options.header === "object") {
                    connectOption.header = { ...header, ...options.header };
                }
                else if (typeof options.headers === "object") {
                    connectOption.header = { ...header, ...options.headers };
                }
                if (typeof options.method === "string") {
                    connectOption.method = options.method.toUpperCase();
                }
                if (typeof options.protocols === "string") {
                    if (!connectOption.protocols) {
                        connectOption.protocols = [options.protocols];
                    }
                    else {
                        connectOption.protocols.push(options.protocols);
                    }
                }
                else if (Array.isArray(options.protocols)) {
                    if (!connectOption.protocols) {
                        connectOption.protocols = options.protocols;
                    }
                    else {
                        connectOption.protocols.push(...options.protocols);
                    }
                }
            }
            const socket = uni.connectSocket(connectOption);
            this._socket = socket;
            socket.onOpen(() => {
                if (this.onopen) {
                    const ev = { type: "open" };
                    this.onopen(ev);
                    // this.onopen(new Event("open"));
                }
            });
            socket.onClose((reason) => {
                if (this.onclose) {
                    if (typeof reason === "object") {
                        reason.type = "close";
                    }
                    this.onclose(reason);
                    // this.onclose(new CloseEvent("close", {
                    //     /** Warn: incorrect */
                    //     wasClean: true,
                    //     code: 1000,
                    // }));
                }
            });
            socket.onError(() => {
                if (this.onerror) {
                    const ev = { type: "error" };
                    this.onerror(ev);
                    // this.onerror(new Event("error"));
                }
            });
            socket.onMessage((result) => {
                if (this.onmessage) {
                    const ev = { type: "message", data: result.data };
                    this.onmessage(ev);
                }
            });
        }
        // tslint:disable-next-line:variable-name
        addEventListener(_type, _listener, _options) {
            /** empty-implements */
            throw new Error("UniWebSocket do not implement 'addEventListener' method.");
        }
        // public addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        // tslint:disable-next-line:variable-name
        removeEventListener(_type, _listener, _options) {
            /** empty-implements */
            throw new Error("UniWebSocket do not implement 'removeEventListener' method.");
        }
        // public removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        // tslint:disable-next-line:variable-name
        dispatchEvent(_event) {
            /** empty-implements */
            throw new Error("UniWebSocket do not implement 'dispatchEvent' method.");
            // return false;
        }
        close(code, reason) {
            this._socket.close({ code, reason });
        }
        send(data) {
            data = data;
            this._socket.send({ data });
        }
    },
    _a.CLOSED = 3,
    _a.CLOSING = 2,
    _a.OPEN = 1,
    _a.CONNECTING = 0,
    _a);
//# sourceMappingURL=UniWebSocket.js.map