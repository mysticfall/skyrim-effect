import {RuntimeFiber} from "effect/Fiber"
import {
    defaultScheduler,
    PriorityBuckets,
    Scheduler,
    Task
} from "effect/Scheduler"

export class EventLoopScheduler implements Scheduler {
    private tasks = new PriorityBuckets<Task>()

    scheduleTask(task: Task, priority: number): void {
        this.tasks.scheduleTask(task, priority)
    }

    shouldYield(fiber: RuntimeFiber<unknown, unknown>): number | false {
        return defaultScheduler.shouldYield(fiber)
    }

    tick(): void {
        if (this.tasks.buckets.length == 0) return

        const tasksToRun = this.tasks.buckets

        this.tasks.buckets = []

        for (const [, taskList] of tasksToRun) {
            for (const task of taskList) {
                task()
            }
        }
    }
}
