import {redirect} from "react-router-dom";

export const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    ///남은 토큰 유효시간 반환
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export const getAuthToken = () => {
    const token = localStorage.getItem('token');

    if(!token) return null;

    const tokenDuration = getTokenDuration();

    if(tokenDuration < 0) return 'EXPIRED';

    return token;
};

export const tokenLoader = () => {
    return getAuthToken();
}

//주소창으로 직접 입력해서 들어갈 수 없도록 authtoken 여부 확인하기
export const checkAuthLoader = () => {
    const token = getAuthToken();
    return !token ? redirect('/auth') : null;
}