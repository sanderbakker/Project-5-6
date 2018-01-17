const io = require('./index.js').io;
const { 
  COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT, 
  USER_CONNECTED, USER_DISCONNECTED, TYPING, 
  STOP_TYPING, VERIFY_USER, LOGOUT, PRIVATE_MESSAGE
        } = require('../chat-server/Events')

const { createUser, createChat, createMessage } = require('../chat-server/Factories')

let communityChat = createChat()
let connectedUsers = {}
let chats = [communityChat];

module.exports = function(socket){

  let sendMessageToChatFromUser;
  let sendTypingFromUser;
  
  //Verify User
  socket.on(VERIFY_USER, (nickname, callback)=>{
    if(isUser(connectedUsers, nickname)){
        callback({isUser:true, user:null})
    }
    else{
        callback({isUser:false, user:createUser({name:nickname, socketId:socket.id})})
    }
  })

  //User Connects with Name
  socket.on(USER_CONNECTED, (user)=>{
    user.socketId = socket.id
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user;
    sendMessageToChatFromUser = sendMessageToChat(user.name)
    sendTypingFromUser = sendTypingToChat(user.name)

    io.emit(USER_CONNECTED, connectedUsers)
    console.log(connectedUsers);

  })

    //User Disconnects
    socket.on('disconnect',  ()=>{
        if("user" in socket){
        connectedUsers = removeUser(connectedUsers, socket.user.name)
        io.emit(USER_DISCONNECTED, connectedUsers)
        } 
    })

    //User Logout
    socket.on(LOGOUT, ()=>{
        connectedUsers = removeUser(connectedUsers, socket.user.name)
        io.emit(USER_DISCONNECTED, connectedUsers)
    })

    //Get Community Chat
    socket.on(COMMUNITY_CHAT, (callback)=>{
        callback(communityChat)
    })

    //User Message Sender
    socket.on(MESSAGE_SENT, ({chatId, message})=>{
        sendMessageToChatFromUser(chatId, message)
    })

	//Add User To Typing Users
    socket.on(TYPING, ({chatId, isTyping})=>{
        sendTypingFromUser(chatId, isTyping)
    })
    
    socket.on(PRIVATE_MESSAGE, ({reciever, sender, activeChat})=>{
        if(reciever in connectedUsers){
            const recieverSocket = connectedUsers[reciever].socketId
            if( activeChat == null || activeChat.id === communityChat.id){
                const newChat = createChat({name:`${reciever}&${sender}`, users:[reciever, sender] })
                socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat)
                socket.emit(PRIVATE_MESSAGE, newChat)
            }else{
			socket.to(recieverSocket).emit(PRIVATE_MESSAGE, activeChat)}
        }
    })
}

function sendMessageToChat(sender){
   return (chatId, message)=>{
        io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
    }
} 

function sendTypingToChat(user){
  return (chatId, isTyping)=>{
        io.emit(`${TYPING}-${chatId}`, {user, isTyping})
    }
}

function addUser(userList, user){
  let newList = Object.assign({}, userList)
  newList[user.name] = user
  return newList
}

function removeUser(userList, username){
  let newList = Object.assign({}, userList)
  delete newList[username]
  return newList
}

function isUser(userList, username){
  return username in userList
}

function createError(message){
  return {
    error:{
      message
    }
  }
}