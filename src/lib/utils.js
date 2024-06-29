export const isValidDBUrl = (urlString) => {
	const specificUrlPattern = /^https:\/\/digitalbenin\.org\/catalogue\/[^/]+/;
	return !!specificUrlPattern.test(urlString);
};

export const truncate = (str, n, useWordBoundary) => {
	if (str.length <= n) {
		return str;
	}
	const subString = str.slice(0, n - 1); // the original check
	return (useWordBoundary ? subString.slice(0, subString.lastIndexOf(' ')) : subString) + '…';
};

export const getObjectUrl = (id) => {
	return `https://digitalbenin.org/catalogue/${id}`;
};
