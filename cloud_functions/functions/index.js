const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const getNotifieableUsers = async (currentUserId) =>
  await db.collection("users").where("uid", "!=", currentUserId).get();

const getUserPreference = async (user, post) => {
  return db
    .collection(`users/${user.uid}/preference`)
    .doc(post.pId)
    .get()
    .then((snapshot) => {
      functions.logger.info("preference => ", snapshot.data().preference);
      if (snapshot.data().preference === "All") {
        addToInbox(user, post);
      }
      // return snapshot.data().preference;
    })
    .catch((reason) => {
      functions.logger.info("error => ", reason);
      // you should handle errors here
    });
};

const addToInbox = (user, post) => {
  db.collection(`users/${user.uid}/inbox`)
    .doc(post.pId)
    .set(post)
    .then((doc) => {
      functions.logger.info("inbox => ", doc.data());
    });
};

exports.onPostCreated = functions.firestore
  .document("posts/{pId}")
  .onCreate(async (snap, context) => {
    const post = snap.data();

    const users = await getNotifieableUsers(post.AuthorId);

    functions.logger.info("Posts => ", post, "users => ", users);
    return users.forEach(
      (doc) => getUserPreference(doc.data(), post)
      // addToInbox(doc.data(), post)
    );
  });
