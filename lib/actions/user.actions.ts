// **Create account flow**
// 1. User enters full name and email
// 2. Check if the user already exist using the email (we will use to identify if we still need to create a user document or not)
// 3. Send OTP to user’s email
// 1. This will send a secret key for creating a session. The secret key
// 4. Create a new user document if the user is a new user
// 5. Return the user’s accountId that will be used to complete the log
// 6. Verify OTP and authenticate to login
