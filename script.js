var request = require('request');
const { Wechaty, Room } = require('wechaty'); // import { Wechaty } from 'wechaty'
Wechaty.instance() // Singleton
.on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`))
.on('login',       user => console.log(`User ${user} logined`))
.on('message',  message => {
  const contact = message.from();
  const content = message.content();
  const room = message.room();
  if (room){
    console.log(`Room: ${room.topic()} Contact: ${contact.name()} Content: ${content}`)
  }else {
    console.log(`Contact: ${contact.name()} Content: ${content}`);

  }
  if(message.self()){
    return
  }

  if(!room){
    request.post(
        'http://www.tuling123.com/openapi/api',
        { json: {     "key": "683f602e1a9143099935c1bd961f5a55",
                      "info": content,
                }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var messageLen = body.text.length;
                message.say(body.text);
                console.log(body)
            }
        }
    );

  }

  if((/hello/i).test(content)){
    message.say("Hello 我是雷军！");
  }

  if((/美丽/).test(content)){
    message.say("美丽个屁");
  }



})

.init()
