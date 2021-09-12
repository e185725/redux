import React, { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
//import { nanoid } from  "@reduxjs/toolkit"
import { selectAllUsers } from "../users/usersSlice"
import { addNewPost } from "./postsSlice"
//import { unwrapResult } from "@reduxjs/toolkit"
//import { set } from "date-fns"

export const AddPostForm = () => {
    const [title, setTitle] = useState("")
    const [content,setContent] = useState("")
    const [userId, setUserId] = useState("")
    const [addRequsetStatus, setAddRequestStatus] = useState("idle")

    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)


    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const canSave = [title,content,userId].every(Boolean) 
        && addRequsetStatus === "idle"

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus("pending")
                await dispatch(addNewPost({title,content,user: userId})).unwrap()
                setTitle("")
                setContent("")
                setUserId("")
            } catch (err) {
                console.log("user:",userId)
                console.error("Failed to save the post:", err)

            } finally {
                setAddRequestStatus("idle")
            }
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} vallue = {user.id} >
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type = "text"
                    id = "postTitle"
                    name = "postTitle"
                    value = {title}
                    onChange = {onTitleChanged}
                />

                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea
                    id = "postContent"
                    name = "postContent"
                    value = {content}
                    onChange = {onContentChanged}
                />

                <button type = "button" onClick={onSavePostClicked} disabled={!canSave}>Save Post </button>

            </form>
        </section>
    )
}