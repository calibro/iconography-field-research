export const isValidDBUrl = (urlString) => {
    const specificUrlPattern = /^https:\/\/digitalbenin\.org\/catalogue\/[^/]+/;
    return !!specificUrlPattern.test(urlString);
  };