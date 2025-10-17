import { useEffect } from "react";

const BODY_LOCK_CLASS = "overflow-hidden";

const scrollLockState: {
  count: number;
  htmlHadClass: boolean;
  bodyHadClass: boolean;
  bodyPaddingRight: string;
} = {
  count: 0,
  htmlHadClass: false,
  bodyHadClass: false,
  bodyPaddingRight: "",
};

const isBrowser = () => typeof window !== "undefined";

const addLockClass = () => {
  if (!isBrowser()) {
    return;
  }

  if (scrollLockState.count === 0) {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const scrollbarWidth = window.innerWidth - htmlElement.clientWidth;

    scrollLockState.htmlHadClass = htmlElement.classList.contains(
      BODY_LOCK_CLASS
    );
    scrollLockState.bodyHadClass = bodyElement.classList.contains(
      BODY_LOCK_CLASS
    );

    if (!scrollLockState.htmlHadClass) {
      htmlElement.classList.add(BODY_LOCK_CLASS);
    }
    if (!scrollLockState.bodyHadClass) {
      bodyElement.classList.add(BODY_LOCK_CLASS);
    }

    scrollLockState.bodyPaddingRight = bodyElement.style.paddingRight;

    if (scrollbarWidth > 0) {
      bodyElement.style.paddingRight = `calc(${scrollLockState.bodyPaddingRight || "0px"} + ${scrollbarWidth}px)`;
    }
  }

  scrollLockState.count += 1;
};

const removeLockClass = () => {
  if (!isBrowser() || scrollLockState.count === 0) {
    return;
  }

  scrollLockState.count -= 1;

  if (scrollLockState.count > 0) {
    return;
  }

  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  if (!scrollLockState.htmlHadClass) {
    htmlElement.classList.remove(BODY_LOCK_CLASS);
  }
  if (!scrollLockState.bodyHadClass) {
    bodyElement.classList.remove(BODY_LOCK_CLASS);
  }
  bodyElement.style.paddingRight = scrollLockState.bodyPaddingRight;

  scrollLockState.htmlHadClass = false;
  scrollLockState.bodyHadClass = false;
  scrollLockState.bodyPaddingRight = "";
};

export const useBodyScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active) {
      return;
    }

    addLockClass();

    return () => {
      removeLockClass();
    };
  }, [active]);
};
