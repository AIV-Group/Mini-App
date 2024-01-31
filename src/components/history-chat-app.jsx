import React, { useEffect, useRef } from "react";
import Answers from "./answers";
import Question from "./question";
import { List } from "zmp-ui";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  dataHistorys,
  imagesShowList,
  isChonseImages,
  isChonseImageShow,
  popupVisibles,
  userState,
} from "../state";
import InforApp from "./infor-app";

const HistoryChatApp = () => {
  const dataHistory = useRecoilValue(dataHistorys);
  const [isChonseImage, setIsChonseImage] = useRecoilState(isChonseImages);
  const [isImageShow, setIsImageshow] = useRecoilState(isChonseImageShow);
  const [popupVisible, setPopupVisible] = useRecoilState(popupVisibles);

  const handleSetImage = (url_image) => {
    setPopupVisible(true);
    setIsImageshow(url_image);
  };

  const messagesEndRef = useRef();

  useEffect(() => {
    if (messagesEndRef?.current)
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
  }, [dataHistory]);

  return (
    <List
      loading
      onMouseDown={() => setIsChonseImage(false)}
      id="messages"
      ref={messagesEndRef}
      style={{ margin: 0, paddingBottom: "15px" }}
      className="space-y-3 overflow-y-auto h-full scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch scrollbar-hidden"
    >
      <List.Item
        style={{ marginTop: "0px", marginBottom: "0px", padding: "1rem" }}
      >
        <InforApp />
      </List.Item>
      {dataHistory.map((history, index) => (
        <List.Item
          key={index}
          style={{ marginTop: "0px", marginBottom: "0px", padding: "0.5rem" }}
        >
          <Question
            handleSetImage={handleSetImage}
            className="mb-4 "
            index={index}
            {...history}
          />
          <Answers handleSetImage={handleSetImage} index={index} {...history} />
        </List.Item>
      ))}
    </List>
  );
};
export default HistoryChatApp;
