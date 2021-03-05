import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import { auth } from "./firebase"
import SidebarChat from './SidebarChat'
import {useSelector} from 'react-redux'
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';import { IconButton } from '@material-ui/core';
import { selectUser } from './features/userSlice';
import db from './firebase'
function Sidebar() {
    const user = useSelector(selectUser)
    const [chats, setChats]= useState([])
    
    const addChat =()=>{
        const chatName = prompt("Please enter a chat name");
        if(chatName){
            db.collection('chat').add({
                chatName:chatName,
            })
            .then()
        }
        
    }

  useEffect(()=>{
    db.collection('chat').onSnapshot(snapshot=>
      setChats(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data(),
      })))
    );
  },[]);
  
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar onClick={()=>auth.signOut()} src={user.photo} className="sidebar__avatar"/>
                <div className="sidebar__input">
                    <SearchIcon/>
                    <input type="text" placeholder="Search"/>
                </div>
                <IconButton variant="outlined" className="sidebar__inputbutton">
                <RateReviewOutlinedIcon onClick={addChat} />
                </IconButton>
            </div>
            <div className="sidebar__chats">
                {chats.map(({id,data:{chatName}})=>(
                    <SidebarChat key={id}  id={id} chatName={chatName} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
