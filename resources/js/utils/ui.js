function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection != 'undefined' &&
      typeof document.createRange != 'undefined') {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != 'undefined') {
    const textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

function getCaretPosition(element) {
  let caretOffset = 0;
  if (typeof window.getSelection != "undefined") {
    const range = window.getSelection().getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
    const textRange = document.selection.createRange();
    const preCaretTextRange = document.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
}

function setCaretPosition(elem, pos) {
  elem.focus();
  const textNode = elem.firstChild;
  if (textNode != null) {
    const caret = pos;
    const range = document.createRange();
    range.setStart(textNode, caret);
    range.setEnd(textNode, caret);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

module.exports = {
  placeCaretAtEnd: placeCaretAtEnd,
  getCaretPosition: getCaretPosition,
  setCaretPosition: setCaretPosition,
};
