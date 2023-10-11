import './MyPosts.scss'
import Post from "./Post/Post"
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import MyPostCreator from './MyPostCreator'
import { PostType } from '../../../types/types'
import { getPostsSelector } from '../../../redux/selectors/profileSelectors'

type OwnProps = {
  userId: number
  profilePhoto: string | null
}

const MyPosts: FC<OwnProps> = React.memo((props) => {
  const posts = useSelector(getPostsSelector)  
  let postsElements = () => posts.map((post: PostType, index: number) => 
  <Post profilePhoto={props.profilePhoto} key={index} message={post.text} date={post.date} />)
  return (
    <div>
      <MyPostCreator postsId={posts[0].id} />
      <div className='posts'>
        {postsElements()}
      </div>
    </div>
  )
})

export default MyPosts