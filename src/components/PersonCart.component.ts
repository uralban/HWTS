import {PersonCartClass} from "./classes/PersonCart.class";
import {DataService} from "../services/Data.service";

interface PersonCart {
    id: number,
    name: string,
    status: string,
    image: string
}

export class PersonCartComponent extends PersonCartClass{
    protected status: 'Alive'|'Dead'|'unknown';
    protected imgLink: string;
    protected name: string;
    protected id: number;

    private readonly dead_status: boolean;
    private personCartWrapper: HTMLElement;

    constructor(person: PersonCart, selector: string) {
        super();

        this.personCartWrapper = document.querySelector(selector);
        this.dead_status = (person.status === 'Dead');
        this.imgLink = person.image;
        this.name = person.name;
        this.id = person.id;

        this.personCartWrapper.innerHTML = `
            ${this.name}
            <div class="position-relative">
                <div class="w-25 h-25 position-absolute ${this.dead_status ? "dead" : ""}"></div>
                <img src="${this.imgLink}" alt="avatar" class="w-100">
            </div>
        `;

        this.addEvent();
    }

    private addEvent() {
        this.personCartWrapper.addEventListener('click', () => {
            DataService.showModal(this.id);
        });
    }
}