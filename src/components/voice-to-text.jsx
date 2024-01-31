import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";
import { Sheet, Box, Button } from "zmp-ui";
import { isCheckVoiceToText, questionChat } from "../state";

const VoiceToText = (props) => {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [value, setValue] = useRecoilState(questionChat);

  const { isVoice } = props;

  return (
    <div
      className={twMerge(
        "ease-in-out border-t opacity-100 transition-all duration-300 overflow-hidden h-[170px]",
        !isVoice && "opacity-0 h-0",
      )}
    >
      <div className="flex justify-center  p-5">
        <div className="flex  p-5 justify-center flex-col text-center cursor-pointer">
          <span className="font-light mb-2 text-center">Bấm để ghi âm</span>

          <div className="flex justify-center">
            <div
              onClick={() => {
                setSheetVisible(true);
                listenContinuously();
              }}
              className="mb-2 w-20 h-20 flex bg-blue-500 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-9 text-white m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Sheet
        visible={sheetVisible}
        onClose={() => {
          setSheetVisible(false);
          setValue("");
        }}
        autoHeight
        mask
        handler
        swipeToClose
      >
        <Box p={4} className="custom-bottom-sheet" flex flexDirection="column">
          <Box
            className="bottom-sheet-body min-h-[200px]"
            style={{ overflowY: "auto" }}
          >
            <p
              className={twMerge(
                "text-lg border-l-2 border-blue-500 pl-2",
                value && "border-l-0",
              )}
            >
              {value ? value : "Đang ghi âm..."}
            </p>
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
                Huỷ
              </Button>
            </Box>
            <Box style={{ flex: 1 }} pl={1}>
              <Button
                fullWidth
                onClick={() => {
                  setSheetVisible(false);
                }}
              >
                Dừng
              </Button>
            </Box>
          </Box>
        </Box>
      </Sheet>
    </div>
  );
};

export default VoiceToText;
