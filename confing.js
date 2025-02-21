const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0pWdko5dWd0SjhveXdXT3ZFVU9IaTc4a29yVjZlMi85SU1qTWtvUXEzQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiajFESjI5WU9POFBSQ01qOTNpdFJTMm5xSzNlQ0E1Z2VmbUQ0WXUzeEF6WT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZSE5LNHBJUnJ6a1NIU2V1RzBCSkVnYmpRQ1U5U3JWZGZqNFYwT3RNdjNFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyMnIyZm52ZE13dU1RU3ZtQjAxWnhpUmJhR3dhRUJGbmVrV2ZjU3QwV1RvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNJbk9vR0Q1bk1IenE4WlM4eGhhK1ZScDZpNzZ1U1FITEZ0MGJWMWRKMGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlYxRFF1UVl0QlZ0NHBNejUzWXVoOGd6YUxNMkplSnFlWGxHd3RXdGJWaGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ05PMmFONkJ6V215VUNEZlhFbTNHNWVtL3Flekh5RVFKUmIwcitFNk9Vbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNUhOdGl6WXVWTzFUeFhTWXY0S29ScUtjMzV1dnJGOHV1TnloWUpSZmpBRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9ZS3lnWGxiQmFMUVRVT0RzR044UEVwdVdTNEZtMXBpc2V5MnZNbVh6aVhVN29ERlBsUlhUS3VUdktnZm1la0lwWEVRdTBmWnE1QXE2SHNQL2IyK2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEwLCJhZHZTZWNyZXRLZXkiOiJPc0F1SXF0MFhrV0l6eHcvWm1HVlVQQTZGYWoyZUl5QnNoZ0swbTlheDBRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJpVi1kUjBzN1R5VzNqazVZRGhOYURBIiwicGhvbmVJZCI6IjBhMGZjZTFiLTU3OGEtNDgyYy1iMGQ1LTZiZGNiZGMxNmJmNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzUisybUN1ak5WUm8rVmN6WVZjZ3BoUjlycFU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMjN3bzhZc3NodjhWblhWYUl5bUZlTFJEOTl3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjM1SDNLTEFEIiwibWUiOnsiaWQiOiI0MDc3MTA0ODE4NTo2MkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSTJYOE5BR0VKZTU0TDBHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWUV1ZEFOY1psT1EycUh6Ry9LZFZnUytDS0dNVVl0SWpyeFgyaUFNOW94WT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYjFzSEQ4MmdoZFdKYW8vT2dYanNvWWR4M0dwcXFqYW96TXEyM1RqQ0d0TDFIZjI3NVhJUEs1dWIxTDQwdCswUW9RNnJYaSt1UHZoUW9YL3BNNFNBQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6Ijcya0NyRTRCMTFYbTJycElCMnJkc1VJd0g3dnp3b3RwK1FYWlJFckJVczZWZ0dwTTZVTVZNNGtHbTFjVWs5ckZGTWpiVllnNFY0VUxCc1pZSzJyYmh3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3NzEwNDgxODU6NjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV0JMblFEWEdaVGtOcWg4eHZ5blZZRXZnaWhqRkdMU0k2OFY5b2dEUGFNVyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MDExOTIwNX0=',
    PREFIXE: process.env.PREFIX || "+",
    CHAT_BOT : process.env.CHAT_BOT|| "non",
    OWNER_NAME : process.env.OWNER_NAME || "james",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254758755663",
    ANTICALL: process.env.ANTICALL || "non",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "non",
    AUTO_BIO: process.env.AUTO_BIO || "non",
    ANTIDELETEDM: process.env.ANTIDELETEDM|| "non", 
    ANTIVV: process.env.ANTIVV|| "non", 
    ADMGROUP: process.env.ADMGROUP || "non", 
    AUTO_SAVE_CONTACTS: process.env.AUTO_SAVE_CONTACTS || "non", 
    AUTO_REPLY: process.env.AUTO_REPLY || "non",              
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    ANTILINK :process.env.ANTILINK || "non", 
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaogSY74IBhJWe8b472H",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaogSY74IBhJWe8b472H",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ JAMES",
    BOT : process.env.BOT_NAME || 'JAMES',
    URL : process.env.BOT_MENU_LINKS || 'https://whatsapp.com/channel/0029VaogSY74IBhJWe8b472H',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
