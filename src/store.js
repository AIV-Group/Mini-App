// Đầu tiên cần import createStore từ zmp-framework core
import { useRecoilValue } from "recoil";
import { createStore } from "zmp-framework/core";
import { questionChat } from "./state";
import { createSSE } from "./storeSEE";

// tạo store
const store = createStore({
  // bắt đầu với state (dữ liệu sẽ lưu trong store)
  state: {
    jwt: null,
    users: null,
    isLoading: false,
    historyChat: [],
  },

  // actions sẽ thao tác với state và xử lý các bất đồng bộ
  actions: {
    // context object chứa state của store được truyền vào dưới dạng đối số
    setLoading({ state }, isLoading) {
      state.isLoading = isLoading;
    },

    historyChat({ state, dispatch }) {},
    getInforBot({ state }) {},
  },
  // getters cho phép lấy giá trị của state
  getters: {
    // context object chứa state của store được truyền vào dưới dạng đối số
    users({ state }) {
      return state.users;
    },
    historyChat({ state }) {
      return state.historyChat;
    },
  },
});

// export store
export default store;
