import usersReducer, { InitialStateType, actionsUsers } from "../reducers/usersReducer";

let state: InitialStateType

beforeEach(() => {
  state = {
    users: [
      {
        id: 0, followed: false, name: 'test 0', photos: { small: null, large: null }, status: '123'
      },
      {
        id: 1, followed: false, name: 'test 1', photos: { small: null, large: null }, status: '123'
      },
      {
        id: 2, followed: true, name: 'test 2', photos: { small: null, large: null }, status: '123'
      },
      {
        id: 3, followed: true, name: 'test 3', photos: { small: null, large: null }, status: '123'
      }
    ],
    pageSize: 6,
    filter: { term: '', friend: '' },
    totalItemsCount: 0,
    currentPage: 1,
  }
})

test('follow success', () => {
  const newState = usersReducer(state, actionsUsers.followSuccess(1))
  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
}) 