export const storeBlog = (payload) => ({
    type: 'STORE_BLOG',
    payload,
  });

  export const storeBanner = (payload) => ({
    type: 'STORE_BANNER',
    payload,
  });

  export const storeNews = (payload) => ({
    type: 'STORE_NEWS',
    payload,
  });

  export const storeGalleryCategory = (payload) => ({
    type: 'STORE_GALLARY_CATEGORY',
    payload,
  });
  
  export const storeGallery = (payload) => ({
    type: 'STORE_GALLARY',
    payload,
  });


  export const setCategory = (payload) => ({
    type: 'SET_CATEGORY',
    payload,
  });


  export const setNews = (payload) => ({
    type: 'SET_NEWS',
    payload,
  });

  export const storeDownloads = (payload) =>({
    type: 'SET_DOWNLOAD',
    payload,
  })

  export const storeDownloadForm = (payload) =>({
    type: 'SET_DOWNLOAD_FORM',
    payload,
  })