"use client";
import { useRouter } from "next/navigation";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link href="/signin" style={{ marginRight: 10 }}>
      SignIn
    </Link>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const CreateExperimentButton = () => {
  return (
    <Link href="/create" style={{ marginRight: 10 }}>
      Create Experiment
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};


// export const DeleteUserButton = ({user, id}) => {
//   const func = async () => {

//     const router = useRouter();
//     var deletedUser = await fetch(
//       'http://localhost:3000/api/uncertifiedProfessor',
//       {
//         method: "DELETE",
//         headers: {
//           userId: id
//         }
//       }
//       )
//       console.log(deletedUser)
      // if(deletedUser.ok){
      //   router.refresh();
      //   return;
      // }
      // alert('user not deleted')
//     }
//     return <button onClick={func}>Delete User</button>
// };
