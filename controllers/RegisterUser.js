// export async function registerUser(chatId, message, callback_query, text, currentStep, req, res) {
//     if (callback_query === "cancel_registration") {
//         Buttons = [
//             [{ text: "Connect Account", callback_data: "connect_account" }], // Provide Connect button
//             [{ text: "Register", callback_data: "register" }], // Provide Register button
//             [{ text: "Change Language", callback_data: "language_change" }], // Provide Change Language button
//         ],
//             await sendMessage(chatId, "Registration Cancelled", Buttons, "connect");
//     } else if (callback_query === "register") {
//         Buttons = [
//             [{ text: "Individual", callback_data: "register_individual" }], // Provide Individual button
//             [{ text: "Business", callback_data: "register_business" }], // Provide Business button
//             [{ text: "Back", callback_data: "back" }], // Provide Back button
//         ],
//             await sendPhoto(chatId, "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705350_640.jpg");
//             await sendMessage(chatId, "Great! Are you signing up as an individual or a business?", Buttons, "registerFlow");
//     } else if (callback_query === "resgister_template") {
//         // Handle template registration
//         Buttons = [
//             [{ text: "Connect Account", callback_data: "connect_account" }], // Provide Connect button
//             [{ text: "Register", callback_data: "register" }], // Provide Register button
//             [{ text: "Change Language", callback_data: "language_change" }], // Provide Change Language button
//         ],
//     } else if (callback_query === "register_individual" || chat) {
//         req.app.locals.flows = req.app.locals.flows || {};
//         req.app.locals.flows[chatId] = { step: 1, userType: "individual" };
//         await sendMessage(chatId, "Please enter your first name:");
//     }

import { sendPhoto,sendMessage, sendButtons } from "../utils/messageHelper.js";

// }

export async function registerUser(chatId,  payload, chat) {
    console.log("we are in registerUSer foo")
    // console.log(currentStep, "currentStep")
    console.log(payload, "payload aya kia")
    // console.log(message, "message")
    // console.log(chatId, "chatId")
    // console.log(text, "text")
    // console.log(req.body.callback_query, "req")
    // if (callback_query === "cancel_registration" || chat.last_message?.startsWith("step1")) {
    //     const Buttons = [
    //         [{ text: "Connect Account", callback_data: "connect_account" }], // Provide Connect button
    //         [{ text: "Register", callback_data: "register" }], // Provide Register button
    //         [{ text: "Change Language", callback_data: "language_change" }], // Provide Change Language button
    //     ];
    //     // await sendMessage(chatId, "Registration Cancelled", Buttons, "connect");
    //     await sendButtons(chatId, "Registration Cancelled", Buttons, "connect");
    // } else if (callback_query === "template_registration" || chat.last_message?.startsWith("connect")){
    //     const Buttons = [
    //         [{ text: "Connect Account", callback_data: "connect_account" }], // Provide Connect button
    //         [{ text: "Register", callback_data: "register" }], // Provide Register button
    //         [{ text: "Change Language", callback_data: "language_change" }], // Provide Change Language button
    //     ];
    //     // await sendMessage(chatId, "Registration Cancelled", Buttons, "connect");
    //     await sendButtons(chatId, "Registration Cancelled", Buttons, "register00");
    // }
    // else if (callback_query === "register" || chat.last_message === "register00") {
    //     console.log("hum register main hain")
    //     const Buttons = [
    //         [{ text: "Individual", callback_data: "register_individual" }], // Provide Individual button
    //         [{ text: "Business", callback_data: "register_business" }], // Provide Business button
    //         [{ text: "Back", callback_data: "back" }], // Provide Back button
    //     ];
    //     await sendPhoto(chatId, "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705350_640.jpg", "Great! Are you signing up as an individual or a business?");
    //     // await sendMessage(chatId, "Please select an option:", "registerFlow0");
    //     await sendButtons(chatId, "Please select an option:", Buttons, "registerFlow0");
    // } 
    // else if (callback_query === "register_template") {
    //     // Handle template registration
    //     const Buttons = [
    //         [{ text: "Connect Account", callback_data: "connect_account" }], // Provide Connect button
    //         [{ text: "Register", callback_data: "register" }], // Provide Register button
    //         [{ text: "Change Language", callback_data: "language_change" }], // Provide Change Language button
    //     ];
    //     await sendMessage(chatId, "Template registration is not available at the moment.", Buttons, "templateFlow");
    // } 
    // else if (callback_query === "register_individual") {
    //     console.log("we are in register individual")
    //     req.app.locals.flows = req.app.locals.flows || {};
    //     req.app.locals.flows[chatId] = { step: 1, userType: "individual" };
    //     const Buttons = [
    //         [{ text: "Cancel Registration", callback_data: "cancel_registration" }],
    //      ] // Provide Back button
    //     await sendPhoto(chatId, "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705350_640.jpg");
    //     await sendMessage(chatId, "Please enter your first name:", Buttons, "registerFlow1");
    // }
    if (payload === "register_cancel" && chat.last_message?.startsWith("register")) {
        console.log("we are in register cancel")
        const buttonText = "Registration Cancelled";
        const buttons = [
            [{ text: "Connect Account", callback_data: "connect_account" }],
            [{ text: "Register", callback_data: "register" }],
            [{ text: "Change Language", callback_data: "language_change" }],
        ];
        await sendButtons(chatId, buttons, buttonText, "connect");
    }
    else if (payload === "register_template" && chat.last_message?.startsWith("connect")) {
        console.log("we are in register template") 
        const buttons = [
            [{ text: "Connect Account", callback_data: "connect_account" }],
            [{ text: "Register", callback_data: "register" }],
            [{ text: "Change Language", callback_data: "language_change" }],
        ];
        await sendButtons(chatId, buttons,"How can we help you today? Let's get started!🚀👇",  "register000");
    }
    else if (payload === "register" && chat.last_message === "register") {
        console.log("we are in register")
        const buttonText = "Great! Are you signing up as an individual or a business?";
        const buttons = [
            [{ text: "Account Register Ind", callback_data: "register_acc_ind" }],
            [{ text: "Account Register Bus", callback_data: "register_acc_bus" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Select.png");

        await sendButtons(chatId,buttons, buttonText,  "register_0");
    } else if (payload === "register_acc_ind" && chat.last_message === "register_0") {
        console.log("we are in register individual")
        const buttons = [
            [{ text: "Cancel Registration", callback_data: "register_cancel" }],
        ];
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Individual.png");
        await sendMessage(chatId, "Please enter your first name:", buttons, "register_1");
    } else if (payload === "register_acc_bus" && chat.last_message === "register_1") {
        console.log("we are in register business")
        const buttons = [
            [{ text: "Cancel Registration", callback_data: "register_cancel" }],
        ];
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Business.png");
        await sendMessage(chatId, "Business account registration will come soon.", buttons, "register_2");
    } else if (payload === "main_menu" || chat.last_message === "register_0") {
        console.log("Going to main menu");
        const message = "Welcome back! Need to make a transaction? Select from the options below🚀👇";
        await sendMessage(chatId, message);
        
        // wallet overview
        const walletMessage = "View your balance and recent activity";
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Select.png");
        const buttons = [
            [{ text: "Wallet Overview", callback_data: "wallet_overview" }],
        ];
        await sendButtons(chatId,buttons,walletMessage,"wallet_overview");

        // Initiate Payment
        const paymentMessage = "Send money quickly and securely";
        await sendPhoto(chatId, "https://media.istockphoto.com/id/1030875166/photo/sending-money.jpg?s=1024x1024&w=is&k=20&c=jMo8Sy1X7lhpGv9IMLTFxZvdTIfQ_ftiggwcNhg5nOQ=");
        const paymentButtons = [
            [{ text: "Initiate Payment", callback_data: "initiate_payment" }],
        ];
        await sendButtons(chatId,paymentButtons,paymentMessage,"initiate_payment");

        // My Transactions
        const transactionMessage = "Review your past transaction";
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Select.png");
        const transactionButtons = [
            [{ text: "My Transactions", callback_data: "my_transactions" }],
        ];
        await sendButtons(chatId,transactionButtons,transactionMessage,"my_transactions");

        // QR Quick Pay
        const qrMessage = "Pay using a QR code instantly";
        await sendPhoto(chatId, "https://cdn.vectorstock.com/i/500p/26/70/qr-code-sample-for-smartphone-scanning-3d-web-vector-43412670.jpg");
        const qrButtons = [
            [{ text: "QR Quick Pay", callback_data: "qr_quick_pay" }],
        ]
        await sendButtons(chatId,qrButtons,qrMessage,"qr_quick_pay");
    }
    
}
