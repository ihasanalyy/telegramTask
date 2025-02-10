import axios from "axios";
import { teleGramAPI } from "../config/botConfig.js";

export const sendMessage = async (chatId, text, Buttons = null, userFlow = null, req = null) => {
    const payload = {
        chat_id: chatId,
        text,
        parse_mode: "Markdown", // Optional for better formatting
    };

    // Buttons ko sahi format me bhejna
    if (Buttons) {
        payload.reply_markup = {
            inline_keyboard: Buttons, // Telegram expects buttons inside `reply_markup`
        };
    }

    try {
        const response = await axios.post(`${teleGramAPI}/sendMessage`, payload);
        console.log("Message sent successfully:", response.data);

        // Agar userFlow diya gaya hai, to next step ko update karo
        if (userFlow && req) {
            req.app.locals.currentStep = userFlow;
            console.log(`User flow updated to: ${userFlow}`);
        }

    } catch (error) {
        console.error("Error sending message:", error.response?.data || error.message);
    }
};



export const sendPhoto = async (chatId, photoUrl, caption, options) => {
    const payload = {
        chat_id: chatId,
        photo: photoUrl,
        caption,
        ...(options && { reply_markup: options }),
    };
    try {
        await axios.post(`${teleGramAPI}/sendPhoto`, payload);
    } catch (error) {
        console.error("Error sending photo:", error.response?.data || error.message);
    }
};
