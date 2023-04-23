# Vio

This is a video sharing website built using Angular, Node.js, Express and MongoDB. Users can upload, view, like, and comment on videos.

## Requirements

-   Node.js (version 14 or higher)
-   Angular CLI (version 12 or higher)
-   MongoDB

## Getting Started

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
4. Open a web browser and go to `http://localhost:4200` to access the website.

## Features

### User Authentication

Users can create an account and log in to the website. Passwords are hashed using bcrypt to ensure security.

### Video Uploading

Users can upload videos in MP4 format. Videos are saved to the server and metadata is stored in MongoDB.

### Video Viewing

Users can view videos on the website. Videos are displayed in a responsive player that supports all screen sizes.

### Video Liking and Commenting

Users can like and comment on videos. Likes are stored in MongoDB and displayed alongside the video. Comments are stored in MongoDB and displayed below the video.

## Dependencies

-   Angular
-   Node.js
-   Express
-   MongoDB
-   bcrypt
-   multer
-   uuid
