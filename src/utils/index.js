export const ErrorChatStreaming = () => {
  return "hihi";
};

export const getIdvideo = (link) => {
  let videoId;
  if (link.includes("youtu.be")) {
    videoId = link.split("youtu.be/")[1].split("?")[0];
  } else if (link.includes("watch?v=")) {
    videoId = link.split("watch?v=")[1].split("&")[0];
  }
  return videoId;
};
export const isLinkValid = (link) => {
  // Kiểm tra xem chuỗi có đúng là một đường link không
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  if (!urlPattern.test(link)) {
    return false;
  }
  // Kiểm tra xem đường link có thể sử dụng được không
  const url = new URL(link);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return false;
  }
  // Nếu tất cả điều kiện đều đúng, đường link được coi là hợp lệ và có thể sử dụng.

  return true;
};

export const fetchImageFromLink = async (link) => {
  if (!link.startsWith("blob")) {
    console.error("Đường link không hợp lệ");
    return null;
  }
  try {
    const response = await fetch(link);
    const blob = await response.blob();
    return new File([blob], "image.jpg", { type: "image/jpeg" });
  } catch (error) {
    console.error("Lỗi khi tải ảnh từ đường link:", error);
    return null;
  }
};
// sort and remove duplicate images
export async function filterAndRemoveDuplicates(arr) {
  let data = [];
  if (arr && arr?.length !== 0) {
    const filteredArr = arr?.filter(
      (item) => item !== null && !Number.isNaN(item) && item !== "nan"
    );
    const uniqueArr = [...new Set(filteredArr)];

    // Sử dụng Promise.all
    await Promise.all(
      uniqueArr.map(async (link) => {
        const result = await isImageValid(link);
        if (result) data.push(result);
      })
    );
  }
  return data;
}
// sort and remove duplicate

export function filterAndRemoveDuplicatesList(arr) {
  if (arr && arr?.length !== 0) {
    const filteredArrs = arr?.filter(
      (item) =>
        item !== null && item !== "" && !Number.isNaN(item) && item !== "nan"
    );
    const uniqueArr = [...new Set(filteredArrs)];
    return uniqueArr;
  }
}
