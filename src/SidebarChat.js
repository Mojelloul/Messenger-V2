import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { setChat } from './features/chatSlice';
import db from './firebase';
import * as timeago from 'timeago.js';
import './SidebarChat.css'
function SidebarChat({id,chatName}) {
  const dispatch = useDispatch();
  const [chatInfo,setChatInfo] = useState([])
  useEffect(()=>{
    db.collection('chat')
    .doc(id)
    .collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(snap=>setChatInfo(snap.docs.map(doc=>doc.data())))
    console.log(chatInfo)
  },[id])
  const changeChat =()=>{
        dispatch(
            setChat({
                chatId:id,
                chatName:chatName
            })
        )
    }
    return (
        <div className="sidebarChat" onClick={changeChat}>
            <Avatar src={chatInfo[0]?.photo}/>
            <div className="sidebarChat__info">
                <h3>{chatName}</h3>
                <p>{chatInfo[0]?.message}</p>
                <small>{timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}</small>
            </div>
        </div>
    )
}

export default SidebarChat
