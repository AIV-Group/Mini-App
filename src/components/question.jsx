import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";
import { Icon } from "zmp-ui";
import { isShowImageList } from "../state";

const Question = (props) => {
  const { question, className, image_question, index, handleSetImage } = props;

  return (
    <div className={twMerge("flex items-end self-end justify-end", className)}>
      <div className="flex items-end justify-end max-w-full">
        <div className="flex flex-col space-y-2 text-lg max-w-xs mx-2 order-1 items-end relative">
          <div>
            {image_question && (
              <div className="mb-2 max-w-[120px]">
                <img
                  role="presentation"
                  onClick={() => handleSetImage(image_question)}
                  src={image_question}
                  alt="image question"
                  className="border-4 shadow  w-full border-white rounded-md object-cover h-[100px]"
                />
              </div>
            )}
            {question && (
              <div className="px-5 py-3 w-full shadow rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                {question}
              </div>
            )}
          </div>
        </div>

        {/* {userInfo?.avatar ? (
          <img
            src={userInfo?.avatar}
            alt="avatar"
            className="w-6 h-6 rounded-full order-2"
          />
        ) : ( */}
        {/* <Icon icon="zi-user-circle" className="w-6 h-6 rounded-full order-2" /> */}
        {/* )} */}
      </div>
    </div>
  );
};
export default Question;
