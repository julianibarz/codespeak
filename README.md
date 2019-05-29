# CodeSpeak

Live version: https://codespeak.julianibarz.com

This is an attempt at having a web-based terminal that is controlled by voice so that you can code
 anywhere (with your tablet, laptop), with your voice, and with just a web browser.

As a person who's been struggling with [RSI](https://www.nhs.uk/conditions/repetitive-strain-injury-rsi/),
I thought it may be a fun side-project.

## Technologies Used

1.  [webpack](https://webpack.js.org/) both for frontend and backend.
2.  [express.js](https://expressjs.com/) for backend development.
3.  [xterm.js](https://xtermjs.org/) for the terminal.
4.  [npm](https://www.npmjs.com/) for package management and scripting.
4.  [Google App Engine](https://cloud.google.com/appengine/docs/) for deployment.
5.  [Web Speech API](https://w3c.github.io/speech-api/) for voice recognition.
6.  [Google OAuth](https://developers.google.com/identity/sign-in/web/backend-auth) for identity management.

## Setup

        npm install

## Running locally

    # Pack all things with webpack.
    npm dev
    # Option #1: Start local nodejs server.
    npm start
    # Option #2: Start webpack-dev-server.
    npm server

## Deploying to App Engine

You will have to create an appengine project, and setup a bunch of things
(like enabling IAM APIs, setting up the right DNS redirect, etc.). Once
all of this is done, you can:

    npm run deploy

## Next Steps

Here are the next steps I am hoping to accomplish:
1.  **Support signed in Google users**: This will be important to allow users to connect to a VM, etc.
2.  **Store user info**: So that store safely their SSH credential, VM info, etc.
3.  **Connect terminal to a VM using ssh**: So that we can really code :)
4.  **Build Restricted Grammar Support**: Only a-z,A-Z,0-9 and special symbols useful for coding would be 
    accepted. This is useful when we want to code as it's hard to spell each letter with the current
    speech API and I want to make that mode work well.
5.  **Store User Voice**: With user's permission, store their interaction with the terminal to build
    a training set.
6.  **Integrate with Lipsurf**: For seamless switch between navigating tabs and coding as I'm planning to use [Lipsurf](https://lipsurf.com)
    for everything else (browsing, etc.). We will integrate the voice recognition piece of this project with Lipsurf
    to be able to run on any web-based terminal/code editor.
7.  **Train a neural network**: With the training set above generated by myself and potentially other users,
    try to replace the builtin speech recognition API with a custom one, running in the browser using 
    [tensorflow.js](https://www.tensorflow.org/js), which hopefully will work better than the builtin
    one as the grammar is so restricted.
8.  **Slowly Expand Grammar Support**: If the previous step is ever completed,
    slowly expand the grammar based on user's feedback/interaction with the website/plugin to make
    coding **much, much more** efficient.

## Help Needed

- **Better UI**: If you have skills to make things pretty, please don't hesitate to reach out to me or send a PR with better assets.
- **Any Help**: The project is big, feel free to take a thread in the "Next Steps" section above if you're interested in helping
  and I can work on the other ones. I also welcome any PR.

## Contributing

Feel free to clone, and propose PRs! I'm new to web development so any suggestions for improvements are welcome as well.
Note that this is really a side-project, and thus I don't guarantee any support for this project. I would consider myself successful
if someone else at some point takes over or builds a software that allows me to code efficiently in the browser using my voice.

## Related Work

This is a parallel effort to this one which I didn't realize use the same name:

https://github.com/sethwilsonUS/codespeak

If you can do with projects that require a local installation, likely the best project
is Talon:

https://talonvoice.com

I've also found this blog post to have quite a lot of relevant information:

https://blog.logrocket.com/programming-by-voice-in-2019-3e1855f5add9