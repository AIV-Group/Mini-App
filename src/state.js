import { atom, selector } from "recoil";
import { getUserInfo } from "zmp-sdk";
import { apiUrl } from "./utils/getEnv";

export const userState = selector({
  key: "user",
  get: () =>
    getUserInfo({
      avatarType: "normal",
    }),
});

export const dataHistorysState = selector({
  key: "dataHistorysState",
  get: async ({ get }) => {
    const conversation_id = get(converstionId);
    if (conversation_id) {
      const params = new URLSearchParams({
        conversation_id,
      }).toString();
      const response = await fetch(
        `${apiUrl}/api/conversations/history?${params}`
      );
      const data = await response.json();
      return data.messages;
    }
    return [];
  },
});

export const displayNameState = atom({
  key: "displayName",
  default: "",
});

export const sheetPageState = atom({
  key: "sheetPageState",
  default: "",
});

export const profileChat = atom({
  key: "profileChat",
  default: null,
});

export const questionChat = atom({
  key: "questionChat",
  default: "",
});

export const dataHistorys = atom({
  key: "dataHistorys",
  default: [],
});

export const isLoadingChat = atom({
  key: "isLoadingChat",
  default: false,
});
export const imageQuestion = atom({
  key: "imageQuestion",
  default: null,
});

export const isCheckVoiceToText = atom({
  key: "isCheckVoiceToText",
  default: false,
});
export const isChonseImageShow = atom({
  key: "isChonseImageShow",
  default: null,
});
export const imagesShowList = atom({
  key: "imagesShowList",
  default: [],
});

export const isShowImageList = atom({
  key: "isShowImageList",
  default: { isOpen: false, activeIndex: 0 },
});

export const converstionId = atom({
  key: "converstionId",
  default: null,
});

export const sheetLayoutState = atom({
  key: "sheetLayout",
  default: "",
});

export const sheetVisibles = atom({
  key: "sheetVisibles",
  default: false,
});

export const popupVisibles = atom({
  key: "popupVisibles",
  default: false,
});

export const valieUpgrades = atom({
  key: "valieUpgrades",
  default: null,
});

export const isChonseImages = atom({
  key: "isChonseImage",
  default: false,
});
