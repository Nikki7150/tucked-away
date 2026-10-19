export const cleanUrl = (url) => {
    if (!url) return null;
    const trimmedUrl = url.trim();
    if (trimmedUrl === '') return null;
    if (/\s/.test(trimmedUrl)) return null;
    const hasProtocol = /^https?:\/\//i.test(trimmedUrl);
    const fixedUrl = hasProtocol ? trimmedUrl : `https://${trimmedUrl}`;
    try {
        const parsedUrl = new URL(fixedUrl);
        if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
            return null;
        }
        if (!parsedUrl.hostname.includes('.')) {
            return null;
        }
        return parsedUrl.href;
    } catch (error) {
        return null;
    }
};