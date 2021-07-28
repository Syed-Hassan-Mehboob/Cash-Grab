import { COUNTER_CHANGE } from '../actionType';
export function changeCount(count) {
    return {
        type: COUNTER_CHANGE,
        payload: count
    }
}