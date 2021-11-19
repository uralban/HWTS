import {PersonCartComponent} from './PersonCart.component';
import {ServerInteractionService} from "../services/ServerInteraction.service";
import {CURRENT_PAGE_DEFAULT, PERSON_PER_PAGE_DEFAULT} from "../core/const";

interface PersonCart {
    id: number,
    name: string,
    status: string,
    image: string
}

export class PersonListComponent {

    private personsData: Array<PersonCart>;
    private mainSection: HTMLElement;

    public personOnListCounter: number = PERSON_PER_PAGE_DEFAULT;
    public currentPage: number = CURRENT_PAGE_DEFAULT;

    constructor() {
        this.mainSection = document.querySelector('.main-section');
        this.renderPersonList();
    }

    public renderPersonList(): void {
        let personsNumber: string = '';
        for (let i=1; i<=this.personOnListCounter; i++){
            personsNumber += String(i + this.personOnListCounter * (this.currentPage - 1));
            if (i !== this.personOnListCounter) personsNumber += ',';
        }

        ServerInteractionService.read({type: 'character', number: personsNumber}).then(resp => {
            this.mainSection.innerHTML = '';

            this.personsData = JSON.parse(resp);

            for (const person of this.personsData){
                const personCartWrapper = document.createElement('div');
                personCartWrapper.classList.add('col-3');
                personCartWrapper.classList.add('person-'+String(person.id));
                personCartWrapper.classList.add('mb-3');
                personCartWrapper.classList.add('cursor-hover-pointer');
                personCartWrapper.classList.add('p-1');

                this.mainSection.append(personCartWrapper);
                new PersonCartComponent(person, '.person-'+String(person.id));
            }
        });
    }
}