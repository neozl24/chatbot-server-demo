This is a demo server to provide chat api, which supports the use of [Kanas Chatbot](https://github.com/neozl24/kanas-chatbot).

1. Follow the instructions of [Baidu Cloud Page](https://cloud.baidu.com/doc/WENXINWORKSHOP/s/7lte7zhab) to get your Access Key and Secret Key.

2. Create a file called `.env` and save your Access Key and Secret Key in it.
```
QIANFAN_ACCESS_KEY='<YOUR_ACCESS_KEY>'
QIANFAN_SECRET_KEY='<YOUR_SECRET_KEY>'
```

3. install dependencies and start the server (Recommend NodeJS version 18 or above)

```
npm install
npm start
```

4. Now you have **http://localhost:8080/chat** as your chat endpoint with POST method.
