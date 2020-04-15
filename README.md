This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Thea Final Year Project Marc Murphy React App

## Description

The following describes how to setup the project to be run locally. 

## Requirements:
In order for the application to run, make sure you have Node.js installed.

### Note:
Due to the complexity of getting a valid certificate working for https locally, the 2D visualization (which uses Neovis.js) does not work on a local server.
In the case where observing the 2D functionality is needed, it is available on the published website: https://thea-bbf01.web.app/

## Installation
- Clone the repo in your terminal by clicking the _green_ clone or download button at the top right and copyin the url
- In your terminal, type ```git clone URL```
  - replace URL with the url you copied
  - hit enter
- This will copy all the files from this repo down to your computer
- In your terminal, cd into the directory you just created
- Type ```npm install``` to install all dependencies
- If there are vulnerabilities, running ```npm audit fix``` will fix this
- Last, but not least, type ```npm start``` to run the app locally.
- If there are any errors, running ```npm remove react-dev-utils && npm i react-dev-utils@10.0.0``` should fix the problem. Then execute Command+C on mac or Ctr+C on Windows to exit and  run ```npm start``` again.
- To look at the code, just open up the project in a code editor
