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

import { sendPhoto,sendMessage } from "../utils/messageHelper.js";

// }

export async function registerUser(chatId, message, callback_query, text, currentStep, req, res) {
    console.log("we are in register foo")
    console.log(currentStep, "currentStep")
    console.log(callback_query, "callback_query")
    console.log(message, "message")
    console.log(chatId, "chatId")
    console.log(text, "text")
    console.log(req.body.callback_query, "req")
    if (callback_query === "cancel_registration") {
        const Buttons = [
            [{ text: "Connect Account", callback_data: "connect_account" }], // Provide Connect button
            [{ text: "Register", callback_data: "register" }], // Provide Register button
            [{ text: "Change Language", callback_data: "language_change" }], // Provide Change Language button
        ];
        await sendMessage(chatId, "Registration Cancelled", Buttons, "connect");
    } 
    else if (callback_query === "register") {
        const Buttons = [
            [{ text: "Individual", callback_data: "register_individual" }], // Provide Individual button
            [{ text: "Business", callback_data: "register_business" }], // Provide Business button
            [{ text: "Back", callback_data: "back" }], // Provide Back button
        ];
        await sendPhoto(chatId, "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705350_640.jpg", "Great! Are you signing up as an individual or a business?");
        await sendMessage(chatId, "Please select an option:", Buttons, "registerFlow0");
    } 
    else if (callback_query === "register_template") {
        // Handle template registration
        const Buttons = [
            [{ text: "Connect Account", callback_data: "connect_account" }], // Provide Connect button
            [{ text: "Register", callback_data: "register" }], // Provide Register button
            [{ text: "Change Language", callback_data: "language_change" }], // Provide Change Language button
        ];
        await sendMessage(chatId, "Template registration is not available at the moment.", Buttons, "templateFlow");
    } 
    else if (callback_query === "register_individual") {
        console.log("we are in register individual")
        req.app.locals.flows = req.app.locals.flows || {};
        req.app.locals.flows[chatId] = { step: 1, userType: "individual" };
        const Buttons = [
            [{ text: "Cancel Registration", callback_data: "cancel_registration" }],
         ] // Provide Back button
        await sendPhoto(chatId, "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705350_640.jpg");
        await sendMessage(chatId, "Please enter your first name:", Buttons, "registerFlow1");
    }
}
