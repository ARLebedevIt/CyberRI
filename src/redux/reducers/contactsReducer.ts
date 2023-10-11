import { InferActionTypes } from '../../types/types';
import { mailAPI } from "../../api/mailAPI";
import { CommonThunkType, ResultCodesOther } from "../../types/types";

type InitialStateType = {
  status: string | null
}

let initialState: InitialStateType = {
  status: null,
}

type ActionType = InferActionTypes<typeof actionsContacts>

type ThunkType = CommonThunkType<ActionType>

const contactsReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case 'CRI/CONTACTS/SET_MESSAGE_STATUS':
      return {
        ...state,
        status: action.status,
      }
    default:
      return state
  }
}

const actionsContacts = {
  messageStatus: (status: string) => ({ type: 'CRI/CONTACTS/SET_MESSAGE_STATUS', status: status } as const)
}

export const sendMailMessage = (subject: string, name: string, mailAddress: string, text: string,
  setSubmitting: (isSubmitting: boolean) => void): ThunkType =>
  async (dispatch) => {
    let response = await mailAPI.sendMail(subject, name, mailAddress, text);
    if (response.status === ResultCodesOther.Success) {
      dispatch(actionsContacts.messageStatus('delivered'))
      setSubmitting(false)
    }
  }

export default contactsReducer