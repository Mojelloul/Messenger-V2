import React,{useEffect, useState} from 'react'
import './Chat.css'
import MicNoneIcon from '@material-ui/icons/MicNone';
import { auth } from "./firebase"
import { IconButton } from '@material-ui/core';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from './features/chatSlice';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { selectUser } from './features/userSlice';
function Chat() {
    const user = useSelector(selectUser)
    const [input,setInput] = useState('');
    const [messages, setMessages]=useState([])
    const chatName = useSelector(selectChatName)
    const chatId = useSelector(selectChatId)
    
    useEffect(()=>{
        if(chatId){
            db.collection('chat')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot)=>
            setMessages(
                snapshot.docs.map(doc=>({
                    id: doc.id,
                    data:doc.data()
                }))
            ))
        }
        console.log(chatId)
    },[chatId])

    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection("chat").doc(chatId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            uid:user.uid,
            photo:user.photo,
            email:user.email,
            displayName:user.displayName
        })
        setInput("");
    }
    return (
        <div className="chat">
            <div className="chat__header">
                {chatName ? <h4>To : <span className="chat__name">{chatName}</span></h4>: <strong>Hi</strong>}
                <ExitToAppIcon className="chat__logout" onClick={()=>auth.signOut()} />
            </div>
            <div className="chat__messages">
            {chatName? <FlipMove>
                    {messages.map(({id,data}) => (
                        <Message key={id} contents={data}/>
                    ))}
                </FlipMove>
                :
                <img className="chat__image" src="https://scontent-cdg2-1.xx.fbcdn.net/v/t1.15752-9/126167534_740676419856190_3486960298321950913_n.png?_nc_cat=100&ccb=2&_nc_sid=ae9488&_nc_ohc=bJs-_S17Tf0AX-6MawR&_nc_ht=scontent-cdg2-1.xx&oh=3cab67b24293bd5f4e5b21b710543518&oe=5FDE2512"/>
                }
            </div>
             {chatName &&  
                <div className="chat__input">
                 
                                <form>
                                    <input value={input}
                                    onChange={(e)=> setInput(e.target.value)}
                                    placeholder="Message" type="text"/>
                                    <button onClick={sendMessage}>Send Message</button>
                                </form>
                                <IconButton>
                                <MicNoneIcon className="chat__mic" />
                                </IconButton>
           </div>
                 }
               
            
        </div>
    )
}

export default Chat
