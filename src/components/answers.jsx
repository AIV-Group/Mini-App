import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { twMerge } from "tailwind-merge";
import { Icon } from "zmp-ui";
import logo from "../../assets-src/logo.jpeg";
import { imagesShowList, isChonseImageShow } from "../state";
import { getIdvideo, isLinkValid } from "../utils";
import RenderMarkdown from "./renderMarkdown";
import TypingLoading from "./typingLoader";
import YoutobePlay from "./youtobePlay";

const Answers = (props) => {
  const { answer, className, images, videos, sources, id, handleSetImage } =
    props;
  const [visibleSources, setVisibleSources] = useState([]);

  const handleSourcesToggle = (itemId) => {
    if (visibleSources.includes(itemId)) {
      setVisibleSources(visibleSources.filter((id) => id !== itemId));
    } else {
      setVisibleSources([...visibleSources, itemId]);
    }
  };

  return (
    <div
      className={twMerge(
        "flex items-start self-start justify-start",
        className
      )}
    >
      <div className="flex  items-end max-w-full">
        <div className="flex flex-col space-y-2 text-lg max-w-xs mx-2 order-2 items-start">
          <div>
            {answer ? (
              <div className="px-5 py-3 rounded-lg shadow inline-block rounded-bl-none bg-white text-gray-600">
                <RenderMarkdown childrenRender={answer} />
                {sources?.length > 0 && (
                  <div className="mt-2 border-t pt-1">
                    <button
                      onClick={() => handleSourcesToggle(id)}
                      className="text-[#505050] font-medium text-md  flex items-center gap-1 "
                    >
                      Nguồn
                      <Icon
                        size={20}
                        icon="zi-chevron-down"
                        className={`${
                          visibleSources?.includes(id) && " rotate-180 ease-out"
                        }`}
                      />
                    </button>
                    {visibleSources?.includes(id) && (
                      <div className="ml-[2px]">
                        {sources?.map((result, index) =>
                          isLinkValid(result) ? (
                            <a
                              target="_blank"
                              key={index}
                              href={result}
                              className="flex items-center gap-1 text-md text-[#3071FF] mb-[2px]"
                              rel="noreferrer"
                            >
                              <Icon size={18} icon="zi-share" />
                              <div className="mb-1 truncate w-full max-w-[250px]">
                                {result}
                              </div>
                            </a>
                          ) : (
                            <div className="mb-[2px] hidden-text-one w-full text-md max-w-[250px] flex gap-1 items-center">
                              <Icon size={18} icon="zi-share" />
                              <div>{result}</div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <TypingLoading />
            )}
          </div>
          {images?.length > 0 && (
            <div className="flex flex-wrap w-full">
              {images?.map((result, index) => (
                <div className="w-1/3" key={index}>
                  <img
                    onClick={() => handleSetImage(result)}
                    src={result}
                    alt="img"
                    className="border-4 shadow  w-full border-white rounded-md h-full"
                  />
                </div>
              ))}
            </div>
          )}
          {videos?.map((result, index) => (
            <div key={index} className="w-full">
              <div className="border-4 shadow  w-full border-white rounded-md h-full">
                <YoutobePlay videoId={getIdvideo(result)} />
              </div>
            </div>
          ))}
        </div>
        <img
          src={logo}
          alt="My profile"
          className="w-6 h-6 rounded-full order-1"
        />
      </div>
    </div>
  );
};
export default Answers;
