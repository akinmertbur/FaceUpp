# Face App

**Face App** is a social media platform where users can share photos with friends, follow others, and interact through likes and comments. This project was developed with a focus on modular design, scalability, and user privacy.

## Features

- **User Authentication:** Secure login and registration using JWT tokens.
- **Photo Upload and Management:** Users can upload photos, edit captions, and hide photos by setting the caption to "hide."
- **Follow System:** Users can follow/unfollow others and view photos from those they follow on their home feed.
- **Comments and Likes:** Users can interact with photos by liking them and adding comments.
- **Profile Management:** Users can edit their bio, username, email, and profile picture.
- **Photo Hiding:** Photos with the caption "hide" are hidden from all users.
- **Add Content:** Users can upload new photos and share them on the platform.

## Tech Stack

- **Backend:** Node.js, Express.js, Sequelize (ORM)
- **Frontend:** EJS (Embedded JavaScript templates), HTML/CSS, JavaScript
- **Database:** PostgreSQL
- **Cloud Storage:** AWS S3 for photo storage
- **Authentication:** Passport.js with local strategy and bcrypt for password hashing

## Authentication

User authentication is handled using Passport.js with a local strategy for secure login. Passwords are hashed with bcrypt before storage to ensure security. The authentication flow includes:

- **Registration:** Users register with their email, username, and password. Passwords are hashed with bcrypt.
- **Login:** Uses Passport's local strategy to authenticate users by comparing the hashed password with the stored hash.
- **Logout:** Ends the user session securely.
- **Password Management:** Users can update their passwords, which are rehashed before being stored.

## Installation

**1. Clone the Repository:**
```bash
git clone https://github.com/akinmertbur/face-app.git
```

**2. Install Dependencies:**
```bash
cd face-app
npm install
```

**3. Set Up Environment Variables:**
Create a .env file in the root directory and add your configuration:
```bash
user=postgres
host=localhost
database=FaceApp
password=your_database_password
PORT=3000
DATABASE_URL=postgres://postgres:your_password@localhost:5432/FaceApp
SESSION_SECRET=your_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=your_aws_region
S3_BUCKET=your_s3_bucket_name
```

**4. Run Migrations:**
```bash
npx sequelize-cli --config src/config/config.js db:migrate
```

**5.Start the Application:**
```bash
nodemon src/index.js
```

The app will run on http://localhost:3000.

## Usage

- **Home:** Displays the photos of users you follow.
- **Profile:** Manage your photos, bio, and account settings.
- **User Profiles:** View other users' profiles and follow/unfollow them.
- **Search:** Find other users by username.
- **Add Content:** Upload and share your photos with others on the platform.

## Future Work

- **Real-Time Notifications:** Implement a system to notify users in real-time when they receive new followers, likes, or comments.
- **Direct Messaging:** Add a feature that allows users to send direct messages to each other.
- **Photo Tagging:** Allow users to tag other users in their photos.
- **Improved Search Functionality:** Enhance the search feature to include filtering by photo captions or hashtags.
- **Better Performance Optimization:** Implement lazy loading for photos and optimize image compression to improve load times.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact Information

For questions or feedback, please reach out to **akinmertbur@gmail.com**
