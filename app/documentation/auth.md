# Authentication

## Initialization and Functions

### _initialize()_

No need to use this directly; the auth state will be initialized in index.tsx which is used to keep track of the logged-in user. Then in AppNavigator.tsx if the user is logged in it will switch the stack to an authenticated stack, if they are not logged in then they will only have access to the authentication stack used to log in.

The Realm should be initialized immediately when the app is launched, along with the authentication. All you will need to use are the functions found in `authHooks.ts`, which include:

### _signUp(username: string, password: string)_

As the name suggests, use `signUp` to register a user to the database. It requires a `username` and `password` and handles hashing.

### _login(username: string, password: string)_

Use `login` when a user requests to log in to the app. It requires a `username` and `password` and then sets the current user to the `user` object. To check if a user is signed in, simply check if `currentUser` is `null` or not.

### _logout()_

Use `logout` to sign a user out, which will set `currentUser` to `null`.

### _changePassword(user: User, currentPassword: string, newPassword: string)_

To call this function, make sure to pass in the username, old password and new password, which will confirm the old password is correct for the username that was inputted, and then change the password in the backend to the new password.

## Usage

To use these functions, simply import `useAuth` and use whichever function is needed.
