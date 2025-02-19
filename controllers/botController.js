
// import TelegramBot from '../models/User.js';
import User, { TelegramBot } from "../models/User.js"; // Import User model
// import { registerUserCallback } from './authController.js';
import { sendPhoto, sendMessage, sendButtons } from "../utils/messageHelper.js";
// import axios from 'axios';
// import { teleGramAPI } from '../config/botConfig.js';
import { registerUser } from './RegisterUser.js';





export const handleUpdates = async (req, res) => {
    console.log("Received update:", JSON.stringify(req.body, null, 2));

    const data = req.body;
    let chatId;
    const currentTime = new Date();

    let text_message = null;
    let callback_query = null;
    let image_payloads = [];
    let video_payloads = [];

    if (data.message) {
        text_message = data.message.text || null;
        chatId = data.message.chat.id.toString();
        if (data.message.photo) {
            image_payloads = data.message.photo.map(photo => ({
                file_id: photo.file_id,
                caption: data.message.caption || null
            }));
            // image_payloads = [{ file_id: data.message.photo[0].file_id }];
            console.log('Image Payloads:', image_payloads);
        }
        if (data.message.video) {
            video_payloads = [{
                file_id: data.message.video.file_id,
                caption: data.message.caption || null,
                mime_type: data.message.video.mime_type
            }];
            console.log('Video Payloads:', video_payloads);
        }
        
    } else if (data.callback_query) {
        callback_query = data.callback_query.data;
        chatId = data.callback_query.message.chat.id.toString();
        console.log("Callback Query received:", callback_query);
    }

    //  Find chat data in MongoDB
    let chat = await TelegramBot.findOne({ recipient: chatId });

    //  If last message is the same, avoid duplicate processing
    if (chat && chat.last_message === text_message) {
        console.log("Duplicate message detected, ignoring:", text_message);
        return res.sendStatus(200); //  Early exit
    }

    //  Save new last_message to prevent repeat responses
    if (chat) {
        console.log(text_message, "text chat wala")
        chat.last_message = text_message || callback_query || "unknown";
        chat.last_message_time = currentTime;
        console.log(chat.last_message,"last message")
        await chat.save();
    } else {
        chat = new TelegramBot({
            recipient: chatId,
            last_message_time: currentTime,
            last_message: text_message || callback_query || "unknown",
        });
        await chat.save();
    }

    // ✅ Proceed with responses
    if (text_message === "hello") {
        console.log("Processing 'hello' message for", chatId);
        const buttons = [
            [{ text: "Connect Account", callback_data: "connect_account" }],
            [{ text: "Register", callback_data: "register" }],
            [{ text: "Change Language", callback_data: "language_change" }],
        ];
        await sendPhoto(chatId, "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705350_640.jpg");
        await sendButtons(chatId, buttons, "Welcome onboard!");
    } else if (callback_query) {
        console.log("Handling callback query:", callback_query);
        registerUser(chatId, callback_query, chat);
    }

    // these logic are for the user input
    // // phone number received from user logics here 
    else if (chat.text?.trim().startsWith("+923001234567") || chat.last_message?.trim().includes("+923001234567") || (chat.last_message === "+923001234567")) {

        console.log("we are in phone number received");
        const message = `Hey, I thought you might be interested in using InstaPay! Here's my invite link.\n\n invitation_link_here`;
        const buttons = [
            [{ text: "Send Invitation", callback_data: "send_invitation" }],
            [{ text: "Personalize Message", callback_data: "personalize_message" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if (chat.last_message?.startsWith("abc@gmail.com") && chat.last_message?.includes("abc@gmail.com")) {

        console.log("we are in email received");
        const message = `Hey, I thought you might be interested in using InstaPay! Here's my invite link.\n\n invitation_link_here`;
        const buttons = [
            [{ text: "Send Invitation", callback_data: "send_invitation" }],
            [{ text: "Personalize Message", callback_data: "personalize_message" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if (chat.last_message?.startsWith("ibilalansari") && chat.last_message?.includes("ibilalansari") || (chat.last_message === "ibilalansari") || (chat.last_message === "ibilalansari@gmail.com") || (chat.last_message === "+923112047859")) {

        console.log("we are in email received");
        const message = `(profile URL) M Bilal Ansari\n Username: ibilalansari\n Country: Pakistan`;
        const buttons = [
            [{ text: "Continue", callback_data: "continue_with_user" }],
            [{ text: "View profile", callback_data: "view_profile" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
        const messageOption = `Or select preferred option below`;
        const buttonsOption = [
            [{ text: "Choose another", callback_data: "request_money" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttonsOption, messageOption, "register_0")
    }
    else if ((chat.last_message?.startsWith("150") || chat.last_message?.includes("150")) && chat.last_message >= 150) {
        console.log("we are in currency send money");
        const message = "Completing this transaction will exceed your balance limit of 13,505.30 PKR. Please enter an amount within your balance limit or complete KYC verification to increase your balance limit.";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
            [{ text: "Identity Verification", callback_data: "identity_verification" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("10") || chat.last_message?.includes("10")) && chat.last_message < 150 ) {
        console.log("we are in currency send money");
        const message = "What's your transaction today? Choose the type of payment request that works for you:";
       
        await sendMessage(chatId, message, "register_0");
       const message1 = "Simple, immediate, and secure daily transactions.";
       const message2 = "Stop chasing payments,opt for automatic debiting!";
       const message3 = "Receive your payments on time, no more waiting!";

        const buttons1 = [
            [{ text: "Instant", callback_data: "instant" }],
            [{ text: "Back", callback_data: "request_money" }],
        ];
        const buttons2 = [
            [{ text: "Subscription", callback_data: "subscription" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        const buttons3 = [
            [{ text: "Schedule", callback_data: "schedule" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons1, message1, "register_0");
        await sendButtons(chatId, buttons2, message2, "register_0");
        await sendButtons(chatId, buttons3, message3, "register_0");
    }
    else if (chat.last_message?.startsWith("test")  || chat.last_message?.includes("test") || chat.last_message === "test") {
        console.log("we are in test");
        const message = "Would you like to attach a document? It can add more context to your transaction. Supported formats: JPEG, PNG, MP4. You can attach up to 5 files in total, including one video file.";
        const buttons = [
            [{ text: "Yes", callback_data: "yes_attach_a_document_req" }],
            [{ text: "No", callback_data: "confirm" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    // else if ((image_payloads.length < 2)) {
    //     console.log("we are in iniating request");
    //     const message = "You're initiating a request for 10.00 PKR to M Bilal Ansari\n\nProceed?";
    //     const buttons = [
    //         [{ text: "Confirm", callback_data: "confirm" }],
    //         [{ text: "Main Menu", callback_data: "main_menu" }],
    //     ];
    //     await sendButtons(chatId, buttons, message, "register_0")
    // }
    
    else if ((image_payloads.length > 0)) {
        console.log("we are in instant payment");
        const message = "Do you wish to attach a note to this payment request?";
        const buttons = [
            [{ text: "Yes", callback_data: "add_a_note" }],
            [{ text: "No", callback_data: "skip" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("hi") && chat.last_message?.includes("hi")) || (chat.last_message === "hi")) {
        console.log("we are in skip");
        const message = "You're initiating a request for 10.00 PKR to M Bilal Ansari\n\nProceed?";
        const buttons = [
            [{ text: "Confirm", callback_data: "confirm" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
// OTP logic static
    else if (chat.last_message?.startsWith("123456") || chat.last_message?.includes("123456") || (chat.last_message === "123456")) {
        console.log("we are in OTP received");
        const message = "You have accepted the payment request.\nTransaction ID: tr_123456789";
        const buttons = [
            [{ text: "Leave a comment", callback_data: "leave_a_comment" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    
    return res.sendStatus(200); // ✅ Respond with 200 OK to prevent Telegram retries
};