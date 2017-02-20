import { assign } from 'lodash';

export const InitialState = {
  isModal: false,
  modalData: null,
  modalType: ""
};

export default function(state = InitialState, action) {
  const { type, modalType, data } = action;

  switch (type) {
    case "TOGGLE_MODAL":
      return assign({}, state, {
          isModal: !state.isModal,
          modalData: data,
          modalType: modalType
      });

    default:
      return state;
  }
}
