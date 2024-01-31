import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";
import { Avatar, Button } from "zmp-react";
import { chooseImage } from "zmp-sdk";
import { Icon } from "zmp-ui";
import { imageQuestion } from "../state";
import { fetchImageFromLink } from "../utils";

const ChonseImageVideo = (props) => {
  const { isChonseImage, setFileImage } = props;
  const [image, setImage] = useRecoilState(imageQuestion);

  // async function convertImageLink(link) {
  //   if (link.startsWith("blob")) {
  //     try {
  //       // Sử dụng fetch để tải nội dung từ đường link
  //       const response = await fetch(link);
  //       const blob = await response.blob();

  //       // Tạo đối tượng File từ Blob đã tải về
  //       const file = new File([blob], "image.jpg", { type: "image/jpeg" });
  //       return file;
  //     } catch (error) {
  //       console.error("Lỗi khi tải ảnh từ đường link:", error);
  //       return null;
  //     }
  //   } else {
  //     console.error("Đường link không hợp lệ");
  //     return null;
  //   }
  // }
  async function convertBlobLinkToImageFile(blobLink) {
    if (blobLink.startsWith("blob:")) {
      try {
        // Tạo đối tượng Blob từ đường link blob
        const blob = await fetch(blobLink).then((response) => response.blob());

        // Lấy type của ảnh từ đối tượng Blob
        const imageType = blob.type;
        const imageName = blobLink.split("/").pop();
        // Tạo đối tượng File từ Blob, sử dụng tên "image" và type của ảnh
        const file = new File(
          [blob],
          `${imageName}.${imageType.split("/").pop()}`,
          {
            type: imageType,
          }
        );

        return file;
      } catch (error) {
        console.error("Lỗi khi chuyển đổi đường link blob thành File:", error);
        return null;
      }
    } else {
      console.error("Đường link không hợp lệ");
      return null;
    }
  }

  const handleChooseImage = async (type) => {
    let isType = null;

    type === "album"
      ? (isType = {
          sourceType: ["album"],
        })
      : (isType = {
          sourceType: ["camera"],
          cameraType: "back",
        });

    try {
      const { filePaths } = await chooseImage(isType);
      const fileImage = await convertBlobLinkToImageFile(filePaths[0]);
      console.log("fileImage", fileImage);
      setFileImage(fileImage);
      setImage(filePaths[0]);
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  return (
    <div
      className={twMerge(
        "ease-in-out border-t opacity-100 transition-all duration-300 overflow-hidden h-[120px]",
        !isChonseImage && "opacity-0 h-0"
      )}
    >
      <div className="flex justify-center p-5 px-2">
        {image && (
          <div className={twMerge("w-1/3 border-r")}>
            <div className="relative w-full">
              <img
                className="w-full  object-cover rounded-lg border-2 shadow h-[90px]"
                role="presentation"
                onClick={() => {
                  setActiveIndex(index);
                  setVisible(true);
                }}
                src={image}
                alt="send"
              />
              <button className="absolute -top-2 -right-2 shadow bg-white rounded-full">
                <Icon
                  onClick={() => setImage(null)}
                  icon="zi-close-circle-solid"
                  size={35}
                  className="text-red-600"
                />
              </button>
            </div>
          </div>
        )}
        <div
          onClick={() => handleChooseImage("camera")}
          className={twMerge(
            "flex w-1/2 p-1 justify-center flex-col text-center cursor-pointer border-r",
            image && "w-1/3"
          )}
        >
          <div className="mb-2">
            <Icon size={40} icon="zi-camera" />
          </div>
          <p className="text-sm">Chụp ảnh</p>
        </div>
        <div
          onClick={() => handleChooseImage("album")}
          className={twMerge(
            "flex w-1/2 p-1 justify-center flex-col text-center cursor-pointer",
            image && "w-1/3"
          )}
        >
          <div className="mb-2">
            <Icon size={40} icon="zi-photo" />
          </div>
          <p className="text-sm">Ảnh album</p>
        </div>
      </div>
    </div>
  );
};
export default ChonseImageVideo;
