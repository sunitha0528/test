import CryptoJS from 'crypto-js';
const secretPass = "L2PJ65Uns6MSJdPXWqGwQQZ9n5RjSWFJcoYo2pqWsBcoScyQNh4v";

const useDataConverter = () => {

    const encrypt = (val: any) => {
        let stringifiedVal = val;
        if (typeof (val) === 'object') {
            stringifiedVal = JSON.stringify(val)
        }

        const encrData = CryptoJS.AES.encrypt(stringifiedVal, secretPass).toString();
        return encrData;
    }

    const decrypt = (val: string) => {
        const bytes = CryptoJS.AES.decrypt(val, secretPass);
        const decrData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decrData;
    };

    const decryptString = (val: string) => {
        const bytes = CryptoJS.AES.decrypt(val, secretPass);
        const decrData = bytes.toString(CryptoJS.enc.Utf8);
        return decrData;
    }


    return { encrypt, decrypt, decryptString }
}

export default useDataConverter