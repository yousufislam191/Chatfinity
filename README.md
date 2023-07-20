<h1 align="center">About this repository</h1>
<h2><strong>Chatfinity</strong> is a server side rendering Chat Application System.</h2>
<div style="display: flex; flex-direction: row;">

### 🌐 Visit Website :

### https://chatfinity.onrender.com/

</div>

<h2>How to use this</h2>

- Visit this website [Chatfinity](https://chatfinity.onrender.com)
- Create an account
- Login to chatfinity with your email and password
- After login you will be able to send messages


<h2>How to run this repository on your local server</h2>

**Before running this repository in your local server or computer you must have install :**

- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://nodejs.org/en/download/package-manager/)

**If you have already install this then you can follow this step.**

1. **Clone the repository using your terminal**

```terminal
git clone https://github.com/yousufislam191/Chatfinity.git
```
2. **Open this folder using vs code**
3. **Add `.env` file in your root folder**
4. **Setup your `.env` file following this table:**

| env variable name | env variable value |
| --- | --- |
| APP_NAME | Chatfinity |
| APP_URL | Keep your localhost server url. `Exp: APP_URL = http://localhost:5000` |
| PORT | Keep any port number.  `Exp: PORT = 5000` |
| DB_URL | Keep your mongodb database url. `Exp: mongodb://x.x.x.x:xxxxx/database_name` |
| COOKIE_SECRET | Set any text and number and special characters. `Exp: sijh*uwe36%4723g23` |
| JWT_TOKEN | Set any text and number and special characters. `Exp: i3hiuySTY&^87s6dt8s` |
| COOKIE_NAME | Set any name. `Exp: Chat_Web_App` |
| JWT_TOKEN_EXPIRY | Set a millisecond time for how long you will keep your cookie active. `Exp: 43200000 (that means your token will be expire after half day)` |

5. **Run this command in your vs code terminal for installing dependencies**
```terminal
npm install
```
6. **Run this command in your vs code terminal for running server**
```terminal
npm start
```
7. **You will be see a url in your vs code terminal. That means your website is running in this url. So open this url using your browser. Then enjoy it ✌️**

<h1 align="center">Author</h1>

[Yousuf](https://yousufislam191.github.io/resume/)
