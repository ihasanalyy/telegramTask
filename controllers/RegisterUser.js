

// import { text } from "body-parser";
import { sendPhoto, sendMessage, sendButtons } from "../utils/messageHelper.js";



export async function registerUser(chatId, payload, chat) {
    console.log("we are in registerUSer foo")
    // console.log(currentStep, "currentStep")
    console.log(payload, "payload aya kia")

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
        await sendButtons(chatId, buttons, "How can we help you today? Let's get started!🚀👇", "register000");
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

        await sendButtons(chatId, buttons, buttonText, "register_0");
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
        const buttons = [
            [{ text: "📒 Wallet Overview", callback_data: "wallet_overview" }],
            [{ text: "💰 Initiate Payment", callback_data: "initiate_payment" }],
            [{ text: "📑 My Transactions", callback_data: "my_transactions" }],
            [{ text: "🔢 QR QuickPay", callback_data: "qr_quickpay" }],
            [{ text: "🏷️ My QR Code", callback_data: "my_qr_code" }],
            [{ text: "🔍 Explore More", callback_data: "explore_more" }],
            [{ text: "🌍 Change Language", callback_data: "language_change" }],
            [{ text: "💬 Chat with us", callback_data: "chat_with_us" }],
        ];
        await sendButtons(chatId, buttons, message, "wallets_0");
    }
    
    else if ((chat.last_message?.startsWith("wallet_overview")) || (payload?.startsWith("wallet_overview")) || (payload === "wallet_overview")) {
        console.log("we are in wallet overview");
        const message = "🇵🇰 Wallet Currency: PKR\n💳 Wallet ID: 5RMIOSO7\n💰 Wallet Balance: Rs0.00";
        const buttons = [
            [{ text: "Add Funds", callback_data: "add_funds" }],
            [{ text: "Convert Funds", callback_data: "convert_funds" }],
            [{ text: "Add Currency", callback_data: "add_currency" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    // Wallet Overview options
    else if ((chat.last_message?.startsWith("add_funds")) || (payload?.startsWith("add_funds")) || (payload === "add_funds")) {
        console.log("we are in add funds");
        const message = "Select your top-up channel:";
        const buttons = [
            [{ text: "PayPal", callback_data: "pay_pal" }],
            [{ text: "Google Pay", callback_data: "google_pay" }],
            [{ text: "Apple Pay", callback_data: "apple_pay" }],
            [{ text: "Other payment method", callback_data: "other_payment_method" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("pay_pal")) || (payload?.startsWith("pay_pal")) || (payload === "pay_pal")) {
        console.log("we are in paypal");
        const message = "This payout channel is not available at the moment.";
        const buttons = [
            [{ text: "Change Method", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu"}],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("google_pay")) || (payload?.startsWith("google_pay")) || (payload === "google_pay")) {
        console.log("we are in google pay");
        const message = "This payout channel is not available at the moment.";
        const buttons = [
            [{ text: "Change Method", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu"}],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("apple_pay")) || (payload?.startsWith("apple_pay")) || (payload === "apple_pay")) {
        console.log("we are in apple pay");
        const message = "This payout channel is not available at the moment.";
        const buttons = [
            [{ text: "Change Method", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu"}],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("other_payment_method")) || (payload?.startsWith("other_payment_method")) || (payload === "other_payment_method")) {
        console.log("we are in change method");
        const messageLogin = 'To add funds, please follow the below steps.\n\n 1⃣ Login to InstaPay web portal.\n 2⃣ Go to wallets page and select "Add funds" option from Wallet Management menu.';
        const messageMain = "Click below to log in now.";
        const buttons = [
            [{ text: "Login", callback_data: "log_in" }],
            [{ text: "Main Menu", callback_data: "main_menu"}],
        ];
        await sendMessage(chatId, messageLogin, "register_0");
        await sendButtons(chatId, buttons, messageMain, "register_0");
    }

    else if ((chat.last_message?.startsWith("convert_funds")) || (payload?.startsWith("convert_funds")) || (payload === "convert_funds")) {
        console.log("we are in convert funds");
        const message = "You do not have multiple currencies available for conversion!\nPlease add your desired currency by clicking below.";
        const buttons = [
            [{ text: "Add Currency", callback_data: "add_currency" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }else if ((chat.last_message?.startsWith("add_currency")) || (payload?.startsWith("add_currency")) || (payload === "add_currency")) {
        console.log("we are in add currency");
        const message = "Select your preferred Wallet";
        const buttons = [
            [{ text: "USD", callback_data: "usd" }],
            [{ text: "EUR", callback_data: "eur" }],
            [{ text: "GBP", callback_data: "gbp" }],
            [{ text: "INR", callback_data: "inr" }],
            [{ text: "AED", callback_data: "aed" }],
            [{ text: "PHP", callback_data: "php" }],
            [{ text: "ALL", callback_data: "all" }],
            [{ text: "ARS", callback_data: "ars" }],
            [{ text: "XOF", callback_data: "xof" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    // different currencies logics
    else if ((chat.last_message?.startsWith("usd")) || (payload?.startsWith("usd")) || (payload === "usd")) {
        console.log("we are in usd");
        const message = "Please write below the reason for requesting a new USD Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("eur")) || (payload?.startsWith("eur")) || (payload === "eur")) {
        console.log("we are in eur");
        const message = "Please write below the reason for requesting a new EUR Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("gbp")) || (payload?.startsWith("gbp")) || (payload === "gbp")) {
        console.log("we are in gbp");
        const message = "Please write below the reason for requesting a new GBP Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("inr")) || (payload?.startsWith("inr")) || (payload === "inr")) {
        console.log("we are in ind");
        const message = "Please write below the reason for requesting a new INR Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("aed")) || (payload?.startsWith("aed")) || (payload === "aed")) {
        console.log("we are in aed");
        const message = "Please write below the reason for requesting a new AED Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("php")) || (payload?.startsWith("php")) || (payload === "php")) {
        console.log("we are in php");
        const message = "Please write below the reason for requesting a new PHP Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("all")) || (payload?.startsWith("all")) || (payload === "all")) {
        console.log("we are in sar");
        const message = "Please write below the reason for requesting a new ALL Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("ars")) || (payload?.startsWith("ars")) || (payload === "ars")) {
        console.log("we are in ars");
        const message = "Please write below the reason for requesting a new ARS Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("xof")) || (payload?.startsWith("xof")) || (payload === "xof")) {
        console.log("we are in xof");
        const message = "Please write below the reason for requesting a new XOF Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }

}  

