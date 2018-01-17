const uuidv4 = require('uuid/v4');

//Creates User Object
const createUser = ({name="", socketId = null} = {})=>(
	 {
		id: uuidv4(),
        name,
        socketId
	}
)

//Creates Message Object
const createMessage = ({message, sender} = {})=>{
	return {
		id: uuidv4(),
		time: getTime(new Date(Date.now())),
		message,
		sender
	}
} 

//Creates Chat Object
const createChat = ({messages = [], name="Community", users=[]} = {})=>(
	{
		id: uuidv4(),
		name,
		messages,
		users,
		typingUsers:[]
	}
)

//Sets time to a string like '12:00', '12:31'
const getTime = (date)=>{
		return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
	}

module.exports = {
	createMessage,
	createChat,
	createUser
}