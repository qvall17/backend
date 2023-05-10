export const isEmailValid = (email: string): boolean => {
    if (!email || containsBadCharactersOrTooLong(email)) return false;
    const emailRegex =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
};

/**
 * Check if an invalid character is on string or it's too long
 * @param text
 */
export const containsBadCharactersOrTooLong = (text: string): boolean => {
    // eslint-disable-next-line no-useless-escape
    return !text || !/^([À-ÿ]|[a-z]|[A-Z]|[0-9]|\!|\@|\#|\$|\%|\&|\/|\(|\)|\=|\?|\¿|\¿|\*|\-|\_|\.|\ç|\Ç|\ñ|\Ñ|\+|\ ){1,40}$/g.test(text);
};

/**
 * Check password
 * @param password
 */
export const isPasswordValid = (password: string): boolean => {
    if (!password || containsBadCharactersOrTooLong(password)) return false;
    return !(!password || password.length < 8 || password.length > 24);
};
