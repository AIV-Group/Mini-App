import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Header,
  ImageViewer,
  Page,
  Sheet,
  Box,
  Button,
  Modal,
  Icon,
} from "zmp-ui";
import HistoryChatApp from "../components/history-chat-app";
import InputChatApp from "../components/input-chat-app";
import HeaderChatApp from "../components/header-chat-app";
import {
  converstionId,
  imagesShowList,
  isShowImageList,
  popupVisibles,
  sheetLayoutState,
  sheetVisibles,
  userState,
  valieUpgrades,
} from "../state";
import { setStorage, getStorage } from "zmp-sdk/apis";
import PaymentLayout from "../components/payment";
import ZoomImages from "../components/imageViewCustomer";

const ChatApp = () => {
  const images = useRecoilValue(imagesShowList);
  const [isShowImage, setIsShowImage] = useRecoilState(isShowImageList);
  const [sheetVisible, setSheetVisible] = useRecoilState(sheetVisibles);
  const [sheetPage, setSheetPage] = useRecoilState(sheetLayoutState);
  const [popupVisible, setPopupVisible] = useRecoilState(popupVisibles);
  const [conversationId, setConversationId] = useRecoilState(converstionId);
  // const { userInfo: user } = useRecoilValue(userState);

  // const getStorages = async () => {
  //   try {
  //     const { key1, key2 } = await getStorage({
  //       keys: ["key1", "key2"],
  //     });
  //     setConversationId(key2);
  //     key1?.countChat > 0 && !key1?.isPackageUpgrade && setPopupVisible(true);
  //     return { key1, key2 };
  //   } catch (error) {
  //     // xử lý khi gọi api thất bại
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getStorages();
  // }, []);

  const handelTitle = () => {
    const data = {
      title: "Đã hết lượt hỏi đáp",
      description: "Vui lòng nâng cấp gói để tiếp tục sử dụng dịch vụ",
    };
    return {};
  };

  return (
    <Page hideScrollbar={true}>
      {/* list answers quesiton */}
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        <HistoryChatApp />
        <InputChatApp />
      </div>

      {/* show list image view */}
      {/* <ImageViewer
        onClose={() => setIsShowImage({ isOpen: false, activeIndex: 0 })}
        activeIndex={isShowImage.activeIndex}
        images={images}
        visible={isShowImage.isOpen}
      /> */}

      {/* popup comomn */}
      <Modal
        visible={popupVisible}
        title={handelTitle().title}
        onClose={() => {
          setPopupVisible(false);
        }}
        verticalActions
        description={handelTitle().description}
      >
        <div className="absolute right-2 top-2">
          <Icon
            size={30}
            onClick={() => setPopupVisible(false)}
            className="cursor-pointer"
            icon="zi-close"
          />
        </div>

        <ZoomImages />
        {/* <Box p={6}>
          <Button
            onClick={() => {
              setPopupVisible(false);
              setSheetVisible(true);
              setSheetPage("payment");
            }}
            fullWidth
          >
            Nâng cấp
          </Button>
        </Box> */}
      </Modal>

      {/* sheet common */}
      <Sheet
        visible={sheetVisible}
        onClose={() => {
          setSheetVisible(false);
        }}
        autoHeight
        mask
        handler
        swipeToClose
      >
        <Box p={4} className="custom-bottom-sheet" flex flexDirection="column">
          <Box className="min-h-[150px]">
            {sheetPage === "payment" && <PaymentLayout />}
          </Box>
          <Box flex flexDirection="row" mt={1}>
            <Box style={{ flex: 1 }} pr={1}>
              <Button
                fullWidth
                variant="secondary"
                onClick={() => {
                  setSheetVisible(false);
                }}
              >
                Huỷ bỏ
              </Button>
            </Box>
            <Box style={{ flex: 1 }} pl={1}>
              <Button
                fullWidth
                onClick={() => {
                  setSheetVisible(false);
                }}
              >
                Xác nhận
              </Button>
            </Box>
          </Box>
        </Box>
      </Sheet>
    </Page>
  );
};
export default ChatApp;
