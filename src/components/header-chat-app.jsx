import React from "react";
import { useRecoilValue } from "recoil";
import { Avatar, Icon, useNavigate } from "zmp-ui";
import { userState } from "../state";

const HeaderChatApp = () => {
  // const { userInfo: user } = useRecoilValue(userState);

  const router = useNavigate();

  return (
    <div className="relative  flex items-center space-x-4 bg-[#2483ff] shadow-md text-white p-4 pb-2 border-none pt-14 w-full">
      <div className="flex justify-start items-center w-full">
        <button className="" onClick={() => router("/user")}>
          <Icon icon="zi-list-1" size={35} />
        </button>
      </div>
    </div>
  );
};

export default HeaderChatApp;
