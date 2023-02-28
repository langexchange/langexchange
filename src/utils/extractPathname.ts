const getElementInPathnameAt = (position: number) => {
  return window.location.pathname.split("/")[position];
};

export { getElementInPathnameAt };
