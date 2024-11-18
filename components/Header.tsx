import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  console.log("User ID passed to Header:", userId);
  console.log("Account ID passed to Header:", accountId);

  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
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
