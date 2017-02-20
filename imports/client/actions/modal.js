export function toggleModal({modalType, data}) {
	return dispatch => {
		dispatch({
			type: "TOGGLE_MODAL",
			modalType,
			data
		});
	}
}
