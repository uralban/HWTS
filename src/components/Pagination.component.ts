import {ServerInteractionService} from "../services/ServerInteraction.service";
import {CURRENT_PAGE_DEFAULT, PERSON_PER_PAGE_DEFAULT} from "../core/const";
import {dataService} from "../main";

interface Info {
    count: number
}

interface ReceiveData {
    info: Info,
    results: object
}

export class PaginationComponent {

    public personOnListCounter: number = PERSON_PER_PAGE_DEFAULT;
    public currentPage: number = CURRENT_PAGE_DEFAULT;

    private paginationSection: HTMLElement;
    private data: ReceiveData;
    private personCounter: number;
    private pageCounter: number;

    constructor() {
        this.paginationSection = document.querySelector('.pagination-section');
        this.renderPagination();
    }

    public renderPagination(): void {
        ServerInteractionService.read({type: 'character', number: ''}).then(resp => {
            this.paginationSection.innerHTML = '';

            this.data = JSON.parse(resp);
            this.personCounter = this.data.info.count;

            this.pageCounter = Math.ceil(this.personCounter / this.personOnListCounter);

            const paginationWrapper: HTMLElement = document.createElement('div');
            paginationWrapper.classList.add('d-flex');
            paginationWrapper.classList.add('justify-content-end');

            const paginationElements: Array<HTMLElement> = [];

            for (let i=1; i<=this.pageCounter; i++){
                const paginationSection: HTMLElement = document.createElement('div');
                paginationSection.classList.add('me-2');
                if ((3 - i) >= 0
                    || (this.pageCounter - i) < 3
                    || (i > 3
                        && (Math.abs(this.currentPage - i) <= 1))
                    || (this.currentPage === i
                        && (this.currentPage === 4
                            || this.currentPage === 5
                            || this.currentPage === this.pageCounter - 3
                            || this.currentPage === this.pageCounter - 4))
                    || (this.currentPage === (i - 1)
                        && i === (this.pageCounter - 3)))  {
                    paginationSection.innerHTML = `
                        <a href="#" class="pagination-link ${this.currentPage === i ? 'disabled' : ''}">${i}</a>
                    `;
                    if (paginationElements.length > 0) {
                        if (i - Number((<HTMLElement> paginationElements[paginationElements.length - 1]).children[0].innerHTML) > 1) {
                            const dotedWrapper: HTMLElement = document.createElement('div');
                            dotedWrapper.classList.add('me-2');
                            dotedWrapper.innerHTML = "...";
                            paginationElements.push(dotedWrapper);
                        }
                    }
                    paginationElements.push(paginationSection);
                }
            }
            paginationWrapper.append(...paginationElements);
            this.paginationSection.append(paginationWrapper);

            this.linksEvent();
        });
    }

    private linksEvent(): void {
        const paginationLinksArr = document.querySelectorAll('.pagination-link');
        paginationLinksArr.forEach(paginationLink => {
            paginationLink.addEventListener('click', e => {
                e.preventDefault();
                if (!(<HTMLElement> e.target).classList.contains('disabled')) {
                    dataService.setCurrentPage(Number((<HTMLElement> e.target).innerHTML));
                }
            });
        });
    }
}