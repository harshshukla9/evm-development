(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/node_modules/@coinbase/wallet-sdk/dist/sign/walletlink/relay/connection/HeartbeatWorker.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Copyright (c) 2018-2025 Coinbase, Inc. <https://www.coinbase.com/>
/**
 * This worker is used to send heartbeat messages to the main thread.
 * It is used to keep the websocket connection alive when the webpage is backgrounded.
 *
 */ __turbopack_context__.s({});
const HEARTBEAT_INTERVAL = 10000; // 10 seconds
let heartbeatInterval;
// Listen for messages from the main thread
self.addEventListener('message', (event)=>{
    const { type } = event.data;
    switch(type){
        case 'start':
            startHeartbeat();
            break;
        case 'stop':
            stopHeartbeat();
            break;
        default:
            console.warn('Unknown message type received by HeartbeatWorker:', type);
    }
});
function startHeartbeat() {
    // Clear any existing interval
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
    }
    // Start the heartbeat interval
    heartbeatInterval = setInterval(()=>{
        // Send heartbeat message to main thread
        const response = {
            type: 'heartbeat'
        };
        self.postMessage(response);
    }, HEARTBEAT_INTERVAL);
    // Send confirmation that heartbeat started
    const response = {
        type: 'started'
    };
    self.postMessage(response);
}
function stopHeartbeat() {
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = undefined;
    }
    // Send confirmation that heartbeat stopped
    const response = {
        type: 'stopped'
    };
    self.postMessage(response);
}
// Handle worker termination
self.addEventListener('beforeunload', ()=>{
    stopHeartbeat();
});
;
 //# sourceMappingURL=HeartbeatWorker.js.map
}}),
}]);

//# sourceMappingURL=4ad0e_wallet-sdk_dist_sign_walletlink_relay_connection_HeartbeatWorker_9ff12194.js.map