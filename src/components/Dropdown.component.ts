import {dataService} from "../main";
import {PERSON_PER_PAGE_DEFAULT} from "../core/const";

export class DropdownComponent {

    private dropdownNode: HTMLElement;
    private dropdownCounterNode: HTMLElement;
    private personCount: number = PERSON_PER_PAGE_DEFAULT;

    constructor() {
        this.dropdownNode = document.querySelector('.dropdownNode');
        this.dropdownCounterNode = document.querySelector('.personCount');
        this.dropdownCounterNode.innerHTML = String(this.personCount);

        this.addEvent();
    }

    private addEvent() :void{
        this.dropdownNode.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdownElement: HTMLElement = <HTMLElement> e.target;
            if (dropdownElement.tagName === 'A') {
                this.personCount = Number(dropdownElement.innerHTML);
                this.dropdownCounterNode.innerHTML = String(this.personCount);
                dataService.setPersonCounter(this.personCount);
            }
        })
    }
}