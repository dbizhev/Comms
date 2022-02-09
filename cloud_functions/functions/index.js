const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const getNotifieableUsers = async (currentUserId) =>
  await db.collection("users").where("uid", "!=", currentUserId).get();

// `users/${auth.currentUser?.providerData[0].uid}/preference`,

const getUserPreference = async (currentUserId, chId) =>
  await db.collection(`users/${currentUserId}/preference`).doc(chId).get();

const addToInbox = (user, post) => {
  db.collection(`users/${user.uid}/inbox`)
    .doc(post.pId)
    .set(post)
    .then((doc) => {});
};

const checkNotificationPreference = (user, post) => {
  const preference = getNotifieableUsers(user.uid, post.chId);
  functions.logger.info("preference => ", preference);

  // const channelPreference = preferences[post.channelId];
  // If there is no valid channel preference, notify only if the user is mentioned in the post
  // if (!channelPreference && post.mentions.includes(user.uid)) {
  //   return addToInbox(user, post);
  // }
  // If preference is `all`, notify for every post
  // if (channelPreference === "all") {
  //   return addToInbox(user, post);
  // }
};

exports.onPostCreated = functions.firestore
  .document("posts/{pId}")
  .onCreate(async (snap, context) => {
    const post = snap.data();

    const users = await getNotifieableUsers(post.AuthorId);

    functions.logger.info("Posts => ", post, "users => ", users);
    return users.forEach((doc) =>
      // checkNotificationPreference(doc.data(), post)
      addToInbox(doc.data(), post)
    );
  });
