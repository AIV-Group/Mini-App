import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "zmp-ui";
import { imagesShowList, isChonseImageShow } from "../state";

const ZoomImages = () => {
  const isImageShow = useRecoilValue(isChonseImageShow);

  // const handleShowList = (key) => {
  //   if (images.includes(key)) {
  //     setIsImageshow(images[key]);
  //   }
  // };
  console.log("isImageShow", isImageShow);

  return (
    <div>
      <img
        className="w-full h-full rounded-md mt-2"
        src={isImageShow}
        alt="view"
      />
      {/* <div className="mt-4 flex gap-2">
        <Button
          fullWidth
          onClick={() => handleShowList(setIsImageshow.key - 1)}
        >
          Trước
        </Button>
        <Button
          fullWidth
          onClick={() => handleShowList(setIsImageshow.key + 1)}
        >
          Sau
        </Button>
      </div> */}
    </div>
  );
};

export default ZoomImages;
