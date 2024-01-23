import CryptoJS from 'crypto-js';
const secretPass = "L2PJ65Uns6MSJdPXWqGwQQZ9n5RjSWFJcoYo2pqWsBcoScyQNh4v";

export function getAuthorizationHeader() {
    const authToken = localStorage.getItem('token'); // Replace with your authentication logic
    if (authToken) {
        const data = getDecryptedData(authToken);
        return { Authorization: data.token };
        // return { Authorization: `Bearer ${authToken}` };
    }
    return {};
}

export function getEncryptedData(data: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretPass).toString();
}

export function getDecryptedData(data: any) {
    const bytes = CryptoJS.AES.decrypt(data, secretPass);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}