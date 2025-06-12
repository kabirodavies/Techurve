import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import MobileMenu from "./MobileMenu";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignInButton, UserButton } from "@clerk/nextjs";

const Header = async () => {
  const user = await currentUser();
  console.log(user);

  return (
    <header className="bg-white py-5 border-b border-b-blue/20">
      <Container className="flex items-center justify-between text-lightColor">
        <div
          className="w-auto md:w-1/3 flex items-center 
        gap-2.5 justify-start md:gap-0"
        >
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />

          <ClerkLoaded>
            {user ? ( // If 'user' exists (they're logged in)
              <UserButton afterSignOutUrl="/" /> // Show the user's profile button
            ) : (
              // If 'user' does NOT exist (they're logged out)
              <SignInButton mode="modal">
                <button className="text-sm font-semibold hover:text-darkColor text-lightColor hover:cursor-pointer hoverEffect">
                  Login
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
