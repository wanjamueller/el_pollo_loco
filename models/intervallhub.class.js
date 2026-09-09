/**
 * collects every interval of the game so they can all be stopped at once
 * @class
 */
export class IntervalHub {
    static allIntervals = [];

    /**
     * starts a new interval and registers its id so it can be cleared later
     * @param {Function} func - The function to run repeatedly.
     * @param {number} timer - Delay between calls in milliseconds.
     * @returns {number} The interval id, so single objects can clear their own intervals. to reduce resources on mobile device
     */
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
        return newInterval;
    }

    /**
     * clears every registered interval and empties the registry, used at game over
     */
    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
}
