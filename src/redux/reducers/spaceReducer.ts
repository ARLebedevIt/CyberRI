import { CommonThunkType, InferActionTypes } from "../../types/types"
import { spaceAPI } from "../../api/spaceAPI"

let initialState = {
  title: '',
  img: null as string | null,
}

type InitialStateType = typeof initialState

type ActionTypes = InferActionTypes<typeof actionsSpace>

type ThunkType = CommonThunkType<ActionTypes>

const spaceReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "CRI/SPACE/SET_SPACE_ITEM":
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

const actionsSpace = {
  setSpaceItem: (title: string, img: string | null) =>
    ({ type: "CRI/SPACE/SET_SPACE_ITEM", payload: { title, img } } as const)
}

export const getSpaceItem = (disable: (param: boolean) => void): ThunkType => async (dispatch) => {
  disable(true)
  let timeoutId = setTimeout(() => dispatch(actionsSpace.setSpaceItem('Проблема на стороне сервера, пожалуйста, попробуйте позже. КиберНИИ.', '')) ,7000)
  let response = await spaceAPI.getItem()
  if (response) clearTimeout(timeoutId)
  let items = response.data
  //@ts-ignore
  const randomArray = Math.floor(Math.random() * items.length)
  //@ts-ignore
  let title = items[randomArray].title
  //@ts-ignore
  let img = items[randomArray].url
  dispatch(actionsSpace.setSpaceItem(title, img))
  disable(false)
}

export default spaceReducer