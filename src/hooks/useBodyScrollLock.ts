import { useEffect } from "react";

const scrollLockState: {
  count: number;
  scrollY: number;
  htmlOverflow: string;
  bodyOverflow: string;
  bodyPaddingRight: string;
} = {
  count: 0,
  scrollY: 0,
  htmlOverflow: "",
  bodyOverflow: "",
  bodyPaddingRight: "",
};

const isBrowser = typeof window !== "undefined";

const lockBodyScroll = () => {
  if (!isBrowser) {
    return;
  }

  if (scrollLockState.count === 0) {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    scrollLockState.scrollY = window.scrollY;
    scrollLockState.htmlOverflow = htmlEl.style.overflow;
    scrollLockState.bodyOverflow = bodyEl.style.overflow;
    scrollLockState.bodyPaddingRight = bodyEl.style.paddingRight;

    const scrollbarWidth = window.innerWidth - htmlEl.clientWidth;

    htmlEl.style.overflow = "hidden";
    bodyEl.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      bodyEl.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  scrollLockState.count += 1;
};

const unlockBodyScroll = () => {
  if (!isBrowser || scrollLockState.count === 0) {
    return;
  }

  scrollLockState.count -= 1;

  if (scrollLockState.count > 0) {
    return;
  }

  const htmlEl = document.documentElement;
  const bodyEl = document.body;

  htmlEl.style.overflow = scrollLockState.htmlOverflow;
  bodyEl.style.overflow = scrollLockState.bodyOverflow;
  bodyEl.style.paddingRight = scrollLockState.bodyPaddingRight;
  window.scrollTo({ top: scrollLockState.scrollY });
};

export const useBodyScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active) {
      return;
    }

    lockBodyScroll();

    return () => {
      unlockBodyScroll();
    };
  }, [active]);
};
