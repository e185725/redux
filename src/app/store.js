import { configureStore } from '@reduxjs/toolkit'

import postsReducer from "../features/posts/postsSlice"
import usersReducer from "../features/users/usersSlice"
import notificationsSlice from '../features/notifications/notificationsSlice'
export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications:notificationsSlice  }
})
