import ky from '../core/ky';
import {API_URL} from '../core/const';

export class ServerInteractionService {

    constructor() {

    }

    public static async read(selector: { type: string, number: string }): Promise<string> {
        try {
            document.querySelector('.preloader').classList.remove('d-none');
            const resp = await ky(`${API_URL}/${selector.type}/${selector.number}`);
            const json = await resp.json();
            document.querySelector('.preloader').classList.add('d-none');
            return JSON.stringify(json);
        } catch (e) {
            console.error('ky read', e);
        }
    }
}