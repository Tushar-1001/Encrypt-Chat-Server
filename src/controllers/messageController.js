const userModel = require("../models/userModel");
// const msgModel = require("../models/messageModel");
const messagesModel = require("../models/messagesModel");
const validator = require("../validator/validator");

const createMessage = async (req, res) => {
  try {
    const requestBody = req.body;
    const userIdFromToken = req.userId;
    let { sender, text, recipient } = requestBody;

    if (!validator.isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "Empty body not accepted." });
    }

    if (!validator.isValid(sender)) {
      return res
        .status(400)
        .send({ status: false, message: "sender is required" });
    }
    if (!validator.isValid(text)) {
      return res
        .status(400)
        .send({ status: false, message: "text is required" });
    }
    if (!validator.isValid(recipient)) {
      return res
        .status(400)
        .send({ status: false, message: "recipient is required" });
    }


    const findSender = await userModel.findOne({name : sender})

    if(findSender._id != userIdFromToken){
      return res
      .status(401)
      .send({ status: false, message: "Not Authorized" });
    }

    if(!findSender){
      return res
      .status(400)
      .send({ status: false, message: "Sender not found" });
    }

    const findRecipient = await userModel.findOne({name : recipient})

    if(!findRecipient){
      return res
      .status(400)
      .send({ status: false, message: `${recipient} doesn't exist.` });
    }

    const senderContacts = findSender.contacts

    if(!senderContacts.includes(recipient)){
      return res
      .status(400)
      .send({ status: false, message: `${recipient} is not in your contact list.` });
    }

    //encrypt a string

    let encrypt = "";
    for (let i = 0; i < text.length; i++) {
      encrypt += String.fromCharCode(text.charCodeAt(i) + 25);
    }

    const saveMessage = await messagesModel.create({
      sender,
      text: encrypt,
      recipient,
    });

    return res
      .status(201)
      .send({ status: true, message: "Message sent", data: saveMessage });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};





const getMessage = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userIdFromToken = req.userId;
    const queryParams = req.query;

    if (!validator.isValidObjectId(userId)) {
      return res.status(400).send({ status: false, message: "Invalid ID." });
    }

    const findUser = await userModel.findById(userId);

    //   console.log(findUser)

    if (!findUser) {
      return res.status(404).send({ status: false, message: "User not found" });
    }

      if(userId != userIdFromToken){
        return res
        .status(401)
        .send({ status: false, message: "Not Authorized" });
      }

    if (validator.isValidRequestBody(queryParams)) {
      const { sender } = queryParams;

      const findMessage = await messagesModel
        .find({sender : sender})
        

      console.log(findMessage);

      let fetchText = findMessage.map((x) => x.text);

      console.log(fetchText);

      // let textMsg = findMessage.text

      // decrypt a string
      const decryptFetchText = fetchText.map(function decrypt(str) {
        let newStr = "";
        for (let i = 0; i < str.length; i++) {
          newStr += String.fromCharCode(str.charCodeAt(i) - 25);
        }
        return newStr;
      })

      const messageCount = decryptFetchText.length
     

      console.log(decryptFetchText);
      return res
      .status(200)
      .send({
        status: true,
        message: `${messageCount} messages from ${sender}`,
        data: { from: sender, msg: decryptFetchText },
      });
    }

    const allMessages = await messagesModel.find( {recipient : findUser.name}).select({sender : 1 , text : 1 , _id : 0})

    const allMessagesText = allMessages.map(x => x.text)

    console.log(allMessagesText)

    const decryptAllMessagesText =  allMessagesText.map(function decrypt(str) {
      let newStr = "";
      for (let i = 0; i < str.length; i++) {
        newStr += String.fromCharCode(str.charCodeAt(i) - 25);
      }
      return newStr;
    })

    console.log(decryptAllMessagesText)



    return res.status(200).send({
      status : true , message : 'All messages' , data : decryptAllMessagesText
    })
    
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = { createMessage, getMessage };
