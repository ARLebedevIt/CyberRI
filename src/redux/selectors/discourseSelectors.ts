import { AppStateType } from '../reduxStore';

export const getMessageSelector = (state: AppStateType) => state.discourse.messages