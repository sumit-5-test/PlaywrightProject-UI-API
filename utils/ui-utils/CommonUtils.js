import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();
export default class CryptoUtil {
    constructor() {
        this.secretKey = process.env.SECRET_KEY;
        if (!this.secretKey) {
            throw new Error("SECRET_KEY is required");
        }
    }

    encryptData(data) {
        return CryptoJS.AES.encrypt(data, this.secretKey).toString();
    }

    decryptData(cipherText) {
        const decrypted = CryptoJS.AES.decrypt(cipherText, this.secretKey)
            .toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
            throw new Error("Invalid SECRET_KEY or corrupted data");
        }

        return decrypted;
    }
}
