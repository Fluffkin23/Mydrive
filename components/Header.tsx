import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = () => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader />
      </div>
      <form
        action={async () => {
          "use server";
          await signOutUser();
        }}
      >
        <Button type="submit" className="sign-out-button">
          <Image
            className="w-6"
            src="/assets/icons/logout.svg"
            alt="logo"
            width={24}
            height={24}
          />
        </Button>
      </form>
    </header>
  );
};

export default Header;
