# 📝 Marisela Fierro Blog API

This is the backend API for the **Marisela Fierro Blog & Website**. The API is built using the MERN stack (MongoDB, Express, React, Node.js) and provides the functionality for handling blog posts, user authentication, and media management for Marisela Fierro’s personal blog and portfolio site.

## 📝 About the Project

### This API supports the following features:

- **User Authentication**: Allows for user signup and login with hashed password storage using bcrypt.
- **Post Management**: Full CRUD functionality for managing blog posts — creating, reading, updating, and deleting posts.
- **Media Hosting**: Cloudinary is used for storing and rendering images and videos attached to posts.
- **Likes**: Users can like posts, and the like count will be updated.
- **Error Handling**: Proper error messages and status codes are returned for various actions.

### The API was built as part of the **Marisela Fierro Blog** project, designed and developed to manage all the data for the blog. It integrates seamlessly with the front-end React app.

### 🔗 The client side can be visited [here](https://mariselafierro.netlify.app)

## ⚙️ Technologies & Libraries Used

- **Node.js + Express.js**: Server-side JavaScript and framework.
- **MongoDB**: NoSQL database for storing user and post data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **bcrypt**: Password hashing for secure user authentication.
- **Cloudinary**: Cloud storage service for media files (images, videos).
- **dotenv**: For environment variable management.
- **multer**: Middleware for handling file uploads.
- **Cloudinary Node SDK**: For interacting with Cloudinary for media file management.

## 💼 Real Client Collaboration

The API was developed as part of a full-stack project in collaboration with a real client, **Marisela Fierro**, an artist and academic. The functionality was built according to her specific needs, including authentication, post management, and media handling.

## Endpoints

### User Routes

- **POST** `/signup`: Create a new user.
  - Body: `{ "username": "user", "password": "password" }`
- **POST** `/login`: Log in with an existing user.
  - Body: `{ "username": "user", "password": "password" }`

### Post Routes

- **GET** `/posts/allposts`: Retrieve all posts.
- **GET** `/posts/:id`: Retrieve a single post by ID.
- **POST** `/posts`: Create a new post.
  - Body: `{ "title": "Post Title", "description": "Post description", "text": "Post content", "likes": 0, "video": "url-to-video", "reference": "post-reference" }`
  - Optionally, attach media files (images/videos).
- **DELETE** `/posts/:id`: Delete a post by ID.
- **PUT** `/posts/:id`: Edit an existing post by ID.
  - Body: `{ "title": "Updated Title", "description": "Updated description" }`
- **PATCH** `/posts/:id`: Edit an existing post by ID (Adding likes).

## Deployment

This API was deployed using Vercel

---

Made with ❤️ by [Manuel H Hinojosa](https://manuelhinojosa.netlify.app).
