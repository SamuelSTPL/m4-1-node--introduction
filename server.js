'use strict';
const PORT = process.env.PORT || 8000;

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');
const app = express();
// express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  app.use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  app.use(express.static('public'))


  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  app.get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow'};
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message})
    }, randomTime)
  })

  app.get('/monkey-message', (req, res) => {
    const option =["Don’t monkey around with me.", "If you pay peanuts, you get monkeys.", "I fling 💩 at you!", "🙊", "🙈", "🙉"];
    const chosen = option[Math.floor(Math.random() * option.length)]
    const message = {author: "monkey", text: chosen}
    const randomTime = Math.floor(Math.random() * 2000);
    setTimeout(() => {
      res.status(200).json({status: 200, message})
    }, randomTime)
  })

  app.get('/parrot-message', (req, res) => {
    const message = {author: "parrot", text: req.query.message}
    const randomTime = Math.floor(Math.random() * 2000);
    // console.log(req.query)
    setTimeout(() => {
      res.status(200).json({status: 200, message})
    }, randomTime)
  })

app.get('/bot-message', (req, res) => {

  const getBotMessage = ((text) =>{
    const jokesArray = ["What’s the best thing about Switzerland? I don’t know, but the flag is a big plus.", "Why do we tell actors to “break a leg? Because every play has a cast.", "Yesterday I saw a guy spill all his Scrabble letters on the road. I asked him, 'What’s the word on the street?'"]
    const theJoke = jokesArray[Math.floor(Math.random() * jokesArray.length)]
    let botMsg = "";
    if (text.toLowerCase().match(/^hi|hello|howdy/gi)){
      botMsg = "Hello";
    } else if (text.toLowerCase().match(/bye|peace|later/gi) || text === "NO"){
      botMsg = "Goodbye Human";
    } else if (text.toLowerCase() === "something funny"){
      botMsg = "Would you like to hear a joke, Human? Write YES for jokes, or NO for no jokes (me sad and leave)";
    } else if (text === "YES"){
      botMsg = `${theJoke}`;
    }else {
      botMsg = text;
    }
    return botMsg;
  })

  const message = {author: "bot", text: `Bzzt ${getBotMessage(req.query.message)}`}
    const randomTime = Math.floor(Math.random() * 2000);
    setTimeout(() => {
      res.status(200).json({status: 200, message})
    }, randomTime)
  })

  // add new endpoints here ☝️
  
  // this serves up the homepage
  app.get('/', (req, res) => {
    res
    .status(200)
    .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  app.get('*', (req, res) => {
    res
    .status(404)
    .json({
      status: 404,
      message: 'This is obviously not the page you are looking for.',
    });
  })
  
  // ---------------------------------
  // Nothing to modify below this line
  // Node spins up our server and sets it to listen on port 8000.
  const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

