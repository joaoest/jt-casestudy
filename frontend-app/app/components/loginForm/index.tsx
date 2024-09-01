"use client";

import React, {useContext} from "react";
import PocketBaseContext from "../PocketBaseContext";
import crypto  from 'crypto';
import { useRouter } from 'next/navigation'

interface USER_DATA {
  username: string;
  email: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
  name: string;
}

// Function to hash the session cookie
function hashSessionCookie(sessionCookie: string) {
  // Using the SHA-256 hashing algorithm
  const hash = crypto.createHash('sha256');
  
  // // Update the hash with the session cookie
  hash.update(sessionCookie);

  // // Return the hashed value in hexadecimal format
  return hash.digest('hex');
};

function createCookieSession(access_token: string) {
  let expires = new Date(new Date().setFullYear(new Date().getFullYear() + 1))

  document.cookie = `session=${access_token}; expires=${expires};`
}

async function fetchUser (pb: any, username: string) {
    // Get the all users registered on PB database
    const records = await pb.collection('users').getFullList({
      sort: '-created',
      filter: `username="${username}"`
    }); 
    return records;
};

async function createUser(userData: USER_DATA, pb: any) {
  const user = await pb.collection('users').create(userData);
  return user;
}

export const LoginForm = () =>  {
  const router = useRouter()
  const pb = useContext(PocketBaseContext);

   const handleLoginCallback = async () => {
      // Sample of facebook response because the I'm not able to publish the app on facebook developers without business verification.
      const facebookLoginResponse = {
        "name": "Syed M Ahmad",
        "email": "ssgcommando90@yahoo.com",
        "picture": {
            "data": {
                "height": 50,
                "is_silhouette": false,
                "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=7138203302951151&height=50&width=50&ext=1714730459&hash=AfplSQ-UxV9LeHd5wYnaKbeKEIfUjMN-pHFGZJaWwC-00g",
                "width": 50
            }
        },
        "id": "7138203302951151",
        "userID": "7138203302951151",
        "expiresIn": 7142,
        "accessToken": "EAANdCvUejTUBO3C5uZC",
        "signedRequest": "r3tHehW5aounQcMzalAtmiHR_lCmRHy0GSmrlD4w3zM.eyJ1c2VyX2lkIjoiNzEzODIwMzMwMjk1MTE1MSIsImNvZGUiOiJBUURUaEItZ3Z6RjViN09yV3VyM2tOai1FdDNQM1NGSHpheWVsMEYxSXc1NTNlTHBoZUs3M2RtTENFbVZTVjgySEZlUUFCQ0dPR19zME94RjU4LS14MFYxUWZIYkhCdDFTVl9FNG1scnh6Y2Z5RTVFNVozUy03SllRWUI2MEh1bW15b19mN3FKc3pLZENSbWFBbkE2c3JXenBCYnRfLXZIVTZjRTNYSjZnN19Db2xXNjk0Z1JDODd5eVVjT2R4NEszMHY4LXdrVlpVQWNvMXBkZGR1eTVqbFN4Yld0RkhGVlNpS282OGZxc09YdndYSXlDR0NOTjJrZEhDUDJSZElkT3VmSmRhbGs0dEo1TTRFUU9nWXJ3QllkeVlyUlY1ZlRuS3RvdGJyMF9ROHpQT21PTzQ2eXNBZmtJdGdjblFjOG5VaHQ5U0RMRlAzRVBhS0Q0dV9mY0YwbyIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNzEyMTM4NDU4fQ",
        "graphDomain": "facebook",
        "data_access_expiration_time": 1719914458
    };
    // Get the user based on username that the facebook userID
    const user = await fetchUser(pb, facebookLoginResponse.userID);
    
    if (user.length === 0) {
          //Create a new user
          const data = {
            "username": facebookLoginResponse.userID,
            "email": facebookLoginResponse.email,
            "emailVisibility": true,
            "password": facebookLoginResponse.accessToken,
            "passwordConfirm": facebookLoginResponse.accessToken,
            "name": facebookLoginResponse.name
        };
        const user = await createUser(data, pb);
        const access_token = hashSessionCookie(`${user.id} - ${user.username}`)
        createCookieSession(access_token);
        router.push('/')
        

    } else {
        // User is valid let's auth it.
        // cookies().set('session', )
        const access_token = hashSessionCookie(`${user[0]?.id} - ${user[0]?.username}`)
        createCookieSession(access_token);
        router.push('/');
    }
   };
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <button
        type="button"
        className="w-full mt-6 bg-blue-600 text-white p-2 rounded-lg font-semibold text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleLoginCallback}
      >
        Continue with Facebook
      </button>
    </div>
  );
}
