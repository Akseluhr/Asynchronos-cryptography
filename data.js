// ======= DATA LAYER =======

// these variables act as the storage
// each message has a messageId, userName, and text
var messageCount = 2;
var messages = [{messageId: 0, userName:"Jakob", text: "Bra lärare"},
                {messageId: 1, userName:"Görkem", text: "Dålig lärare"}];

addMessage = function(userName, text)
{
  newMessageObject = { messageId:messageCount++,
                       userName:userName,
                       text:text };
  messages.push(newMessageObject);
}

getMessageById = function(messageId){
  for(i=0; i<messages.length; i++)
  {
    if (messages[i].messageId==messageId)
    {
      return messages[i];
    }
  }
  return null;
}

removeMessage = function(messageId)
{
  for(i=0; i<messages.length; i++)
  {
    if (messages[i].messageId==messageId)
    {
      messages.splice(i,1);
      return true;
    }
  }
  return null;
}

module.exports = {messages, addMessage, removeMessage, getMessageById};
