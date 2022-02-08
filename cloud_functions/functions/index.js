const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const getNotifieableUsers = async (currentUserId) =>
  await db.collection("users").where("uid", "!=", currentUserId).get();

const addToInbox = (user, post) => {
  db.collection(`users/${user.uid}/inbox`)
    .doc(post.pId)
    .set(post)
    .then((doc) => {});
};

// // Check the notification preference for the specific channel of that post, and notify/(not notify) in inbox
// const checkNotificationPreference = (user, post) => {
//   const preferences = user.notifyPreferences || {};

//   const channelPreference = preferences[post.channelId];

//   // If there is no valid channel preference, notify only if the user is mentioned in the post
//   if (!channelPreference && post.mentions.includes(user.uid)) {
//     return addToInbox(user, post);
//   }

//   // If preference is `all`, notify for every post
//   if (channelPreference === "all") {
//     return addToInbox(user, post);
//   }
// };

exports.onPostCreated = functions.firestore
  .document("posts/{pId}")
  .onCreate(async (snap, context) => {
    const post = snap.data();

    const users = await getNotifieableUsers(post.AuthorId);

    functions.logger.info("Posts => ", post, "users => ", users);
    return users.forEach((doc) => addToInbox(doc.data(), post));
  });
