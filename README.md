# React / Node Ethersparks Landing page

## Getting Started

```bash
# clone repo
git clone https://github.com/Ethersparks/Presale PresaleSite

# navigate to repo
cd Presale Site

# install deps
npm install
```

**Backend**

```bash
# Run in terminal
npm run serve
```
Instead you can also debug in Visual Studio Code with pressing the <kbd>f5</kbd> key.

**Frontend**

```bash
# run in terminal
npm run dev
```

Run from Visual Studio Code by executing command (with <kbd>f1</kbd> to open command palette) 
`Run Task` and selecting `dev`.

**AWS S3**
Will be used s3 for file storage

**AWS Database**
need to configure for aws access. Please read link below to setup credentials in ~/.aws
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html

Json sent to server will have the following format for a single user
```json
{
    "user": {
        "email" : "",
        "ethAddress": "",
        "timeStamp": "",
    }
}
```

## Missing steps for production
There are a couple of issues to fix before this code base should
be used as a model for a production ready application.
* Add Front End
* Swap out the file based data model for a real data backend.
* Replace webpack dev server with an application server or serve up the app with the Node server.
* Encrypt everything.
* Add Metamask

## Technologies
* [Visual Studio Code](https://code.visualstudio.com)
* [node](https://nodejs.org/en/)
* [express](http://expressjs.com/)
* [webpack](https://webpack.github.io/)
* [react](https://facebook.github.io/react/)
* [material-ui](http://www.material-ui.com/#/)
* [babel](https://babeljs.io/)
* [eslint](http://eslint.org/)
* [aws](https://aws.amazon.com/sdk-for-node-js/)
* [web3](https://github.com/ethereum/web3.js/)