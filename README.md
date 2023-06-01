# 18 NoSQL: Social Network API

## Description

In this assignment, I was challenged to build an API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. This is a even week meaning that I was given no starter code. To do this, I use Express.js and Mongoose to start my server. This assignment uses a NoSQL database, previous assignments uses sequelize to handle large amounts of structured data. This application wasn't deployed meaning that a walkthrough video demonstrates the functionality. I inserted data by using MongoDB Compass, it allows me to create and post data that I will be using for the demonstration.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Installations

These downloads are needed in order to run this application!

- Visual Studio Code
- Node.js
- Insomnia
- MongoDB Compass

These Node Package Manager is what is needed to run the application!

- Express
- Mongoose

## Walkthrough Video

[Link to video](https://drive.google.com/file/d/1XXJC5uF7yyi5Ckn0IT8zQEfDfv4fb9d3/view)

Description for video

1. GET routes for all users and all thoughts being tested in Insomnia.

2. GET routes for a single user and a single thought being tested in Insomnia.

3. POST, PUT, and DELETE routes for users and thoughts being tested in Insomnia.

4. POST and DELETE routes for a user’s friend list being tested in Insomnia.

5. POST and DELETE routes for reactions to thoughts being tested in Insomnia.

## Credits

Contact and connection with me at my [Github](https://github.com/tigergiangnguyen)