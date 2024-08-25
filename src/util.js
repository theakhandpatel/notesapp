export const setNewOffset = (card, mouseeMoveDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseeMoveDir.x;
  const offsetTop = card.offsetTop - mouseeMoveDir.y;

  return {
    x: Math.max(offsetLeft, 0),
    y: Math.max(offsetTop, 0),
  };
};

export function autoGrow(textAreaRef) {
  const { current } = textAreaRef;
  current.style.height = "auto";
  current.style.height = current.scrollHeight + "px";
}

export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 999;
  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};
