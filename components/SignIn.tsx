// "use client";
// import { SignInButton } from "@clerk/nextjs";
// import React from "react";

// const SignIn = () => {
//   return (
//     <SignInButton mode="modal">
//       <button className="text-sm font-semibold hover:text-darkColor text-lightColor hover:cursor-pointer hoverEffect">
//         Login
//       </button>
//     </SignInButton>
//   );
// };

// export default SignIn;

import React from "react";

const SignIn = () => {
  return (
    <button
      className="text-sm font-semibold hover:text-darkColor
       text-lightColor hover:cursor-pointer hoverEffect"
    >
      Login
    </button>
  );
};

export default SignIn;
