# Dev.to Clone

This is a MERN stack application with hook and redux. Just a simple clone version of dev.to.
Link demo: [starryNight](https://mydevcomm.herokuapp.com/)

---

# 1. Functionality

### Feed

- Get all posts filter by latest, date, month, year.

### Post

- Write post with markdown editor.
- Add tags.
- Share post.
- Like post, save post.
- Manage post: edit or delete.
- Add image/cover image use firebase storage.
- Comment on post and reply on comment.

### Notifications

- Simple notifications use Create and FindOneAndDelete(Mongoose).
- Get notifications: like, save, comment, reply comment, follow and post(if user follow another users).
- Auto mark notifications.
- React toastify for some notifications(register, validation,...)

### Auth

- Use Nodemailer for send mail.
- JWT for auth.
- Register user(send mail to active).
- Forgot password(send mail to change password).
- Login with mail registered.
- Require login to like, bookmark, follow, comment, write a post.

### Profile

- Build profile with: website, bio, skills, education, location, employment title, social network and brand color.
- Change avatar.
- Get information user, get posts of user in user pages.
- Reset password(if user loged in).
- Change mail(if user loged in, send mail to verify new mail).
- Delete account(send mail to confirm).

### Search

- Simple search use regex mongoDB, search for post, comment, people.

### Tags

- Get posts by tag.
- Popular tags.
- Follow tag.

### User

- Dashboard: posts published(filter by recently public, comment, reaction), followers, following users, following tags and reading list(search by title).

---

# 2. How to run locally

#### a/ Install dependencies

_For server_

```js
npm install
```

_For client_

```js
cd client
npm install
```

#### b/ Add a default.json file in **config** folder with the following:

```json
{
  "mongoURI": "<your mongo uri>",
  "JWT_SECRET": "<your jwt secret>",
  "NODEMAILER_EMAIL": "<your nodemailer email>",
  "NODEMAILER_PASS": "<your nodemailer password>",
  "JWT_ACCOUNT_ACTIVATION": "<your jwt account activation>",
  "JWT_EMAIL_ACTIVATION": "<your jwt email verification>",
  "JWT_RESET_PASSWORD": "<your jwt reset password>",
  "JWT_DELETE_ACCOUNT": "<your jwt delete account>",
  "CLIENT_URL": "<your client url>"
}
```

#### c/ config.js for firebase

- Add folder name **firebase** to _client/src/utils_, and add a file name **config.js** to firebase folder with the following:

```js
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'API_KEY',
  authDomain: 'PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://PROJECT_ID.firebaseio.com',
  projectId: 'PROJECT_ID',
  storageBucket: 'PROJECT_ID.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { projectStorage, projectFireStore, timestamp };
```

**Suggestion** : you can visit this [link](https://www.youtube.com/watch?v=vUe91uOx7R0) to create gallery app with firebase.

#### d/ Run app

```js
npm run dev
```

# 3. Some image about project

#### Sign in/up

![image](https://dev-to-uploads.s3.amazonaws.com/i/k15b9qe170gjlkdtm76h.PNG)

![image](https://dev-to-uploads.s3.amazonaws.com/i/sxyu361z1gz8clytpnns.PNG)

#### Write post

![image](https://dev-to-uploads.s3.amazonaws.com/i/o7b5ho0jrd5j659ef959.PNG)

![image](https://dev-to-uploads.s3.amazonaws.com/i/1h3aobnfqi41drs4xhga.PNG)

![image](https://dev-to-uploads.s3.amazonaws.com/i/zdaz3hqc0s9143xvwkfv.PNG)

#### Home pages

![image](https://dev-to-uploads.s3.amazonaws.com/i/mb3e13m1fz96ou6j6ly1.PNG)

#### Dashboard

![image](https://dev-to-uploads.s3.amazonaws.com/i/twda4eylzggrgrcwi5i7.PNG)

#### Post

![image](https://dev-to-uploads.s3.amazonaws.com/i/zset1kpb3yq20kmbrx6x.PNG)

#### Comments

![image](https://dev-to-uploads.s3.amazonaws.com/i/k1zjwajskuyg2psepnej.PNG)

#### Notifications

![image](https://dev-to-uploads.s3.amazonaws.com/i/91gr4rulv72rw07oobbb.PNG)

#### User pages

![image](https://dev-to-uploads.s3.amazonaws.com/i/49urs5mrntltq8wcv3uf.PNG)

#### Tags

![image](https://dev-to-uploads.s3.amazonaws.com/i/aaezirvmvk39zxib2ivt.PNG)

#### Search

![image](https://dev-to-uploads.s3.amazonaws.com/i/50dacitpyez3u0w88mxb.PNG)

#### Settings

![image](https://dev-to-uploads.s3.amazonaws.com/i/i7i5yqt6sihl1qmklrml.PNG)

#### Responsive

![image](https://dev-to-uploads.s3.amazonaws.com/i/se4npipj2grihzh6q3nl.PNG)
![image](https://dev-to-uploads.s3.amazonaws.com/i/j0bfr3b98xuy4u863pwa.PNG)
