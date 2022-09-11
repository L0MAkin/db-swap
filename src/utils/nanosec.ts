/**
 * Nanoseconds to seconds.
 */
export function nanosec2sec(time: string | number) {
    return Number(time) / 10 ** 9;
}
