import React, { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import { uuid } from "short-uuid";
import { twMerge } from "tailwind-merge";
import { Icon } from "zmp-ui";
import {
  dataHistorys,
  isLoadingChat,
  questionChat,
  imageQuestion,
  isChonseImages,
  imagesShowList,
  converstionId,
  popupVisibles,
  valieUpgrades,
  dataHistorysState,
} from "../state";
import { createSSE } from "../storeSEE";
import ChonseImageVideo from "./chonse-image-camera";
import { setStorage, getStorage } from "zmp-sdk/apis";
import {
  filterAndRemoveDuplicates,
  filterAndRemoveDuplicatesList,
} from "../utils";

const InputChatApp = () => {
  const [value, setValue] = useRecoilState(questionChat);

  const [urlImage, setUrlImage] = useRecoilState(imageQuestion);
  const [dataHistory, setDataHistory] = useRecoilState(dataHistorys);
  const [loading, setLoading] = useRecoilState(isLoadingChat);
  const [isChonseImage, setIsChonseImage] = useRecoilState(isChonseImages);
  const [images, setImages] = useRecoilState(imagesShowList);
  const [conversationId, setConversationId] = useRecoilState(converstionId);
  const [fileImage, setFileImage] = useState(null);
  const [popupVisible, setPopupVisible] = useRecoilState(popupVisibles);
  const valieUpgrade = useRecoilValue(valieUpgrades);
  const [imageTest, setImageTest] = useState("");
  // const historyData = useRecoilValue(dataHistorysState);

  const handleUpdateHistory = (property, value) => {
    setDataHistory((prev) => {
      if (prev.length === 0) {
        return [{ [property]: value }];
      }
      if (property === "question") {
        const newObject = {
          id: uuid(),
          question: value,
          answer: "",
          source: [],
          image_question: "",
          images: [],
          videos: [],
        };
        return [...prev, newObject];
      }
      return prev.map((data, index) => {
        if (index === prev.length - 1) {
          return { ...data, [property]: value };
        }
        return data;
      });
    });
  };

  const updateImages = async (images) => {
    setDataHistory((prev) => {
      return prev.map((item, index) => {
        if (index === prev.length - 1) {
          return { ...item, images: images };
        }
        return item;
      });
    });
  };

  const updateVideo = async (video) => {
    setDataHistory((prev) => {
      return prev.map((item, index) => {
        if (index === prev.length - 1) {
          return { ...item, videos: video };
        }
        return item;
      });
    });
  };

  const updateSoucres = async (source) => {
    setDataHistory((prev) => {
      return prev.map((item, index) => {
        if (index === prev.length - 1) {
          return { ...item, source: source };
        }
        return item;
      });
    });
  };

  const onchangeInput = (value) => {
    setValue(value);
  };

  const setDataToStorage = async () => {
    try {
      const { errorKeys } = await setStorage({
        data: {
          key1: { countChat: dataHistory.length, isPackageUpgrade: false },
          ...(!conversationId && { key2: conversationId }),
        },
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    let textArea = document.getElementById("textarea-chat");
    if ((loading || !value) && !urlImage) return textArea.focus();

    handleUpdateHistory("question", value);
    handleUpdateHistory("image_question", urlImage);

    questionAnswer(value, urlImage);
    setValue("");
    setUrlImage(null);
    setIsChonseImage(false);
    textArea.value = "";
  };

  const handleKeyDown = ({ event }) => {
    let textArea = document.getElementById("textarea-chat");

    if (event?.key === "Enter" && value.trim().length > 0) {
      if (
        event.shiftKey ||
        (event.key === "Enter" &&
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ))
      ) {
        // Handle Shift + Enter to add a newline
      } else {
        handleSubmit();
        event.preventDefault();
      }
    }
    if (event?.key === "Enter" && value.trim().length === 0) {
      textArea.focus();
    }
  };

  const questionAnswer = async (question, image) => {
    if (loading) return textarea.focus();

    setLoading(true);

    const payload = {
      question: question ? question : " ",
      // bot_id: "5a6972c4-7171-482a-8a64-5c3fb14499c7",
      bot_id: "a0c936cb-b5a4-4f17-8a80-397397b4e63a",
      is_sse: true,
      ...(fileImage && { image: fileImage }),
      ...(conversationId && { conversation_id: conversationId }),
    };

    const source = createSSE(payload);
    let resultData = null;

    try {
      // get answer
      const handleMessage = async (e) => {
        try {
          if (e.data !== "[DONE]" && e.data !== "ping") {
            resultData = JSON.parse(e.data);
            if (resultData) {
              const { answer, conversation_id, image, video, source } =
                resultData;
              handleUpdateHistory("answer", answer);
              if (conversation_id) setConversationId(conversation_id);
              if (image && image?.length !== 0) updateImages(image);
              if (video && video?.length !== 0) updateVideo(video);
              if (source && source?.length !== 0) updateSoucres(source);
            }
            return resultData;
          } else {
            source.close();
          }
        } catch (error) {
          source.addEventListener("message", handleMessage);
        }
      };

      source.addEventListener("message", handleMessage);
      // done
      source.addEventListener("readystatechange", (e) => {
        if (e.readyState >= 2) {
          setLoading(false);
        }
      });

      // error
      source.addEventListener("error", (e) => {
        const resError = JSON.parse(e.data);
        if (resError.error) {
          handleUpdateHistory("answer", resError.error);
        } else {
          handleUpdateHistory("answer", "Xin vui lòng thử lại");
        }
        setLoading(false);
      });

      // đóng  streaming
      source.stream();
    } catch (error) {
      handleUpdateHistory("answer", "Xin vui lòng thử lại");
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white  px-3 pt-2 sm:mb-0 pb-2">
      <div className="relative flex">
        <div className="absolute z-50 ">
          <button
            onClick={() => {
              if (!loading) {
                setDataHistory([]);
                setConversationId(null);
              }
            }}
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out focus:outline-none"
          >
            <Icon
              size={32}
              icon="zi-wallpaper"
              className={twMerge(
                "rotate-180 text-gray-500",
                dataHistory.length > 0 && "text-blue-400"
              )}
            />
          </button>
        </div>
        <textarea
          onChange={(e) => onchangeInput(e.target.value)}
          onKeyDown={(event) => handleKeyDown({ event })}
          type="text"
          onMouseDown={() => !urlImage && setIsChonseImage(false)}
          id="textarea-chat"
          placeholder="Nội dung hỏi..."
          className="w-full focus:outline-none h-12 text-lg pr-14 pl-12 resize-none focus:placeholder-gray-400 placeholder-gray-400 text-gray-600  rounded-md py-3 pt-2"
        />
        <div className="absolute right-0 items-center inset-y-0 sm:flex">
          {!value && (
            <button
              onClick={() => {
                setIsChonseImage(!isChonseImage);
              }}
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 focus:outline-none"
            >
              <Icon
                size={35}
                className={twMerge(
                  "text-orange-400",
                  isChonseImage && "text-blue-600"
                )}
                icon="zi-photo-solid"
              />
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSubmit()}
            className={twMerge(
              "text-blue-500  h-10 w-0 inline-flex items-center justify-center rounded-full transition-all duration-200 ease-in-out focus:outline-none",
              (value || urlImage) && "w-10"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-7 w-8 ml-2 transform rotate-90"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
      <ChonseImageVideo
        setFileImage={setFileImage}
        isChonseImage={isChonseImage}
      />
    </div>
  );
};
export default InputChatApp;
