const autoHeightTextArena = (value, idTextArea) => {
  const textarea = inputRef.current;
  textarea.style.height = "24px";

  // Ensure that the scrollHeight is not greater than 200px
  if (
    textarea.scrollHeight <= 150 &&
    textarea.scrollHeight > 40 &&
    value?.length > 0
  ) {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  } else if (textarea.scrollHeight > 150) {
    textarea.style.height = "150px";
  }
};
