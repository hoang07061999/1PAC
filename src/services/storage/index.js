let listBookmark = window.localStorage.getItem("listBookmark");

export const getListBookmarkStorage = () => JSON.parse(listBookmark);

export const setListBookmarkStorage = (data) => window.localStorage.setItem("listBookmark", JSON.stringify(data));
