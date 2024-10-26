// import bcrypt from "bcryptjs";
// import Realm from "realm";

// const SALT_ROUNDS = 10;

// async function hashPassword(password) {
//   const salt = await bcrypt.genSalt(SALT_ROUNDS);
//   return await bcrypt.hash(password, salt);
// }

// async function verifyPassword(plainPassword, hashedPassword) {
//   return await bcrypt.compare(plainPassword, hashedPassword);
// }

// const realm = new Realm({ schema: [UserSchema] });

// async function saveUser(username, password) {
//   const hashedPassword = await hashPassword(password);
//   realm.write(() => {
//     realm.create("User", { username, passwordHash: hashedPassword });
//   });
// }

// function deriveEncryptionKey(password) {
//   const key = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
//   // Only take the first 64 bytes of the hash
//   return new TextEncoder().encode(key).slice(0, 64);
// }

// async function openEncryptedRealm(password) {
//   const encryptionKey = deriveEncryptionKey(password);

//   const realm = new Realm({
//     schema: [UserSchema],
//     encryptionKey: encryptionKey,
//   });

//   return realm;
// }

// async function login(username, password) {
//   const user = realm.objects("User").filtered("username == $0", username)[0];

//   if (user && (await verifyPassword(password, user.passwordHash))) {
//     // Password is correct, open the encrypted Realm
//     const realm = await openEncryptedRealm(password);
//     return realm;
//   } else {
//     throw new Error("Invalid credentials");
//   }
// }
