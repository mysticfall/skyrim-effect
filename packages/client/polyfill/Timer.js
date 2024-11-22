export function createTimer() {
    const timers = new Map()

    let nextId = 0

    return {
        setTimeout: function (callback, delay) {
            const id = nextId++
            const timeoutAt = Date.now() + delay

            timers.set(id, {callback, timeoutAt, interval: false})

            return id
        },
        clearTimeout: function (id) {
            timers.delete(id)
        },
        setInterval: function (callback, delay) {
            const id = nextId++
            const timeoutAt = Date.now() + delay

            timers.set(id, {callback, timeoutAt, interval: delay})

            return id
        },
        clearInterval: function (id) {
            timers.delete(id)
        },
        tick: function () {
            const now = Date.now()

            for (const [id, timer] of timers) {
                if (timer.timeoutAt <= now) {
                    timer.callback()

                    if (timer.interval) {
                        timer.timeoutAt = now + timer.interval
                    } else {
                        timers.delete(id);
                    }
                }
            }
        }
    }
}
