const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const getNotifieableUsers = async (currentUserId) =>
  await db.collection("users").where("uid", "!=", currentUserId).get();

const getUserPreference = async (user, post) => {
  return db
    .collection(`users/${user.uid}/preference_post`)
    .doc(post.pId)
    .get()
    .then((snapshot) => {
      if (snapshot.data().preference === "All") {
        addToInbox(user, post);
      }
      if (
        !snapshot.data() ||
        post.mentions.includes(`@${user.userName}`) ||
        post.mentions.includes(`@@@${user.userName}`)
      ) {
        return post.mentions.forEach((mention) => {
          functions.logger.info("atss => ", mention);
          functions.logger.info("atss len => ", mention.split("@").length);
          if (mention.split("@").length - 1 === 4) {
            post.replyRequest = true;
            addToInbox(user, post);
          } else {
            post.replyRequest = false;
            addToInbox(user, post);
          }
        });
      }
    })
    .catch((reason) => {
      functions.logger.info("error => ", reason);
    });
};

const addToInbox = (user, post) => {
  db.collection(`users/${user.uid}/inbox`)
    .doc(post.pId)
    .set(post)
    .then((doc) => {});
};

exports.onPostCreated = functions.firestore
  .document("posts/{pId}")
  .onCreate(async (snap, context) => {
    const post = snap.data();

    const users = await getNotifieableUsers(post.AuthorId);

    functions.logger.info("Posts => ", post, "users => ", users);

    return users.forEach((doc) => {
      db.collection(`users/${doc.data().uid}/preference_channel`)
        .doc(post.chId)
        .get()
        .then((snapshot) => {
          functions.logger.info("channel pref => ", snapshot.data());
          if (snapshot.data().preference === "All") {
            addToInbox(doc.data(), post);
          } else {
            getUserPreference(doc.data(), post);
          }
        })
        .catch((reason) => {
          functions.logger.info("error => ", reason);
        });
      getUserPreference(doc.data(), post);
    });
  });
