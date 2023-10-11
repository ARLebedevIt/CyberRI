import profileReducer, { actionsProfile } from "../reducers/profileReducer";

it('new post should be added', () => {
  let action = actionsProfile.addPost('it-123')
  let state = {
    posts: [
      { id: 1, text: "Hi, how are you", likesCount: 10 },
      { id: 2, text: "Learn React", likesCount: 15 },
      { id: 3, text: "It's my first post", likesCount: 22 },
    ],
  }
  let newState = profileReducer(state, action)
  expect(newState.posts.length).toBe(4)
});