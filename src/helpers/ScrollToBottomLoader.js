var scrollHandler = null;
export function initializeScrollToBottomListener(divName, onReached) {
    var div = document.getElementById(divName);
    scrollHandler = function () {
      if (
        window.scrollY >=
        div.offsetTop + div.offsetHeight - window.innerHeight
      ) {
        if (onReached) onReached();
      }
    };
    window.addEventListener('scroll', scrollHandler);
}
export function removeScollToBottomListener() {
    window.removeEventListener('scroll', scrollHandler);
}