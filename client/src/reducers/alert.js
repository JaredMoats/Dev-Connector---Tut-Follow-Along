/* A function that takes in a piece of state
and sends out an action */
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		/* Add alert to the app's state */
		case SET_ALERT:
			/* Spread operator includes any state
            that's already present. So if there's
            already an alert, it's included now */
			return [...state, payload];
		case REMOVE_ALERT:
			/* Remove a specific alert by its id */
			return state.filter(alert => alert.id !== payload);
		default:
			return state;
	}
}
