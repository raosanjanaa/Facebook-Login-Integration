# Facebook Login Integration App

A web application demonstrating Facebook Login authentication using Meta JavaScript SDK and Graph API.

---

## Live Demo

https://facebook-login-integration.vercel.app/

---

## Features

- Facebook Login (OAuth 2.0 authentication)
- Fetch user profile data using Graph API
- Displays user details:
  - Full Name
  - First Name
  - Last Name
  - Profile Picture
  - Email (if available)
  - Gender (if available)
  - Birthday (if available)
  - Location (if available)
- Displays granted permissions
- Logout functionality
- Responsive user interface

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Facebook JavaScript SDK
- Meta Graph API
- Vercel (deployment)

---

## Meta APIs Used

This project uses Facebook Login and Graph API endpoints:

- /me
- /me/permissions

---

## Permissions Used

- public_profile
- email (if available)
- user_gender (if available)
- user_birthday (if available)
- user_location (if available)

---

## Working Flow

1. User clicks "Continue with Facebook"
2. Facebook login dialog opens
3. User authenticates and grants permissions
4. Application fetches user data using Graph API
5. Data is displayed in the profile dashboard

---

## Important Note

This application runs in Facebook Development Mode.

Only test users added in the Facebook Developer Dashboard can access login functionality.

Full public access requires:
- Business verification
- App Review approval from Meta
