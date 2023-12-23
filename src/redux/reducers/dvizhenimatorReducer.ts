import { CommonThunkType, InferActionTypes } from '../../types/types'
import { dvizhenimatorAPI } from '../../api/dvizhenimatorAPI'

type InitialStateType = {
  image: string | null
  error: string | null
}

let initialState: InitialStateType = {
  image: null,
  error: null
}

type ActionTypes = InferActionTypes<typeof actionsDvizhenimator>

type ThunkType = CommonThunkType<ActionTypes>

const dvizhenimatorReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'CRI/DVIZHENIMATOR/SET_PICTURE':
      return {
        ...state,
        image: action.image,
        error: action.error
      }
    case 'CRI/DVIZHENIMATOR/SET_PICTURE_ERROR':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

const actionsDvizhenimator = {
  setPicture: (image: string, err: null) => ({ type: 'CRI/DVIZHENIMATOR/SET_PICTURE', image: image, error: err } as const),
  setPictureError: (err: string) => ({ type: 'CRI/DVIZHENIMATOR/SET_PICTURE_ERROR', error: err } as const)
}

export const getPictureDV =
  (input: string, offset: number, disabled: (param: boolean) => void): ThunkType =>
  async (dispatch) => {
    disabled(true)
    let timeoutId = setTimeout(() => {
      dispatch(actionsDvizhenimator.setPictureError('Проблема на стороне сервера, пожалуйста, попробуйте позже. КиберНИИ.'))
    }, 20000)
    let response = await dvizhenimatorAPI.getPicture(input, offset)
    if (response) clearTimeout(timeoutId)
    let responseArray = response.data.data
    if (responseArray.length === 0) {
      dispatch(actionsDvizhenimator.setPictureError('Движениматор не справился с вашим запросом'))
    } else {
      let arrayRandom = Math.floor(Math.random() * (responseArray.length - 1))
      let result = responseArray[arrayRandom].images?.original?.url
      dispatch(actionsDvizhenimator.setPicture(result, null))
    }
    disabled(false)
  }

export default dvizhenimatorReducer
