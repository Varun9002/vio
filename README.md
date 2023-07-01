# Vio

## Node API repository =>[Vio-API](https://github.com/Varun9002/Vio-API)

This is a video sharing website built using Angular, Node.js, Express and MongoDB. Users can upload, view and comment on videos.

## Requirements

-   Node.js (version 14 or higher)
-   Angular CLI (version 14 or higher)
-   MongoDB

## Getting Started

1. Front End
    1. Clone the repository:
        ```shell
        git clone https://github.com/Varun9002/vio.git
        ```
    2. Install dependencies:
        ```shell
        cd vio
        npm install
        ```
    3. Start the server:
        ```shell
        npm start
        ```
    4. Set the node backend url in the `.env` file (default: http://localhost:5000)
    5. Open a web browser and go to `http://localhost:4200` to access the website.
1. BackEnd End
    1. Clone the repository:
        ```shell
        git clone https://github.com/Varun9002/Vio-API
        ```
    2. Install dependencies:
        ```shell
        cd Vio-API
        npm install
        ```
    3. Start the server:
        ```shell
        npm start
        ```
        This will start the server to listen for requests on port specified in the `.env` file (default: 5000)

## Features

### User Authentication

Users can create an account and log in to the website. Passwords are hashed using bcrypt to ensure security.

### Video Uploading

Users can upload videos in MP4 format. Videos are saved to the server and metadata is stored in MongoDB.

### Video Viewing

Users can view videos on the website. Videos are displayed in a responsive player that supports all screen sizes.

### Video Commenting

Users can like and comment on videos. Likes are stored in MongoDB and displayed alongside the video. Comments are stored in MongoDB and displayed below the video.

## Dependencies

-   Utilizes MongoDb Atlas for Database connectivity
-   Angular
-   Ngrx
-   Node.js
-   Express
-   Monogoose (for MongoDB)
-   bcrypt
-   multer
-   uuid
-   Json Web Token (JWT)
