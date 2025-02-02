const {on, Debug} = require("@skyrim-platform/skyrim-platform")
const {createTimer} = require("./Timer")

if (typeof console === "undefined") {
    global.console = {
        log: function (msg) {
            Debug.trace(msg, 0)
        },
        debug: function (msg) {
            Debug.trace(msg, 0)
        },
        info: function (msg) {
            Debug.trace(msg, 0)
        },
        warn: function (msg) {
            Debug.trace(msg, 1)
        },
        error: function (msg) {
            Debug.trace(msg, 2)
        }
    }
}

const timer = createTimer()

global.setTimeout = timer.setTimeout.bind(timer)
global.setInterval = timer.setInterval.bind(timer)
global.clearTimeout = timer.clearTimeout.bind(timer)
global.clearInterval = timer.clearInterval.bind(timer)

on("update", () => timer.tick())
