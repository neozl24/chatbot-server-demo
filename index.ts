import { ChatCompletion } from "@baiducloud/qianfan";
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import 'dotenv/config'

// load environment variables
const qianfanClient = new ChatCompletion({
  QIANFAN_ACCESS_KEY: process.env.QIANFAN_ACCESS_KEY,
  QIANFAN_SECRET_KEY: process.env.QIANFAN_SECRET_KEY,
});

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// app.get('/', (req: Request, res: Response) => {
//   res.send('Welcome to demo server!');
// });

app.post('/chat', async (req: Request, res: Response) => {
  const { messages } = req.body;

  if (!messages) {
    res.status(400).send({ error: 'messages is required' });
    return
  }

  try {
    // 下面的 any 应该是 ChatResp 类型，由于百度代码自己的问题，ts 没法自动推导类型
    const stream: AsyncIterableIterator<any> = await qianfanClient.chat(
      {
        messages,
        stream: true,
      },
      'ERNIE-Tiny-8K'
    );

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`)
    }
    res.end()

  } catch (error) {
    res.status(500).send({ errorMessage: 'Error communicating with Qianfan AI', error });
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
