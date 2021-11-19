import {PersonComponent} from "../components/Person.component";
import {PersonListComponent} from "../components/PersonList.component";
import {PaginationComponent} from "../components/Pagination.component";
import {CURRENT_PAGE_DEFAULT} from "../core/const";

export class DataService {
    private personCounter: number;
    private currentPage: number;
    private personListComponent: PersonListComponent;
    private paginationComponent: PaginationComponent;

    constructor(personListComponent: PersonListComponent, paginationComponent: PaginationComponent) {
        this.personListComponent = personListComponent;
        this.paginationComponent = paginationComponent;
    }

    public setPersonCounter(personCounter: number) :void {
        this.personCounter = personCounter;
        this.personListComponent.personOnListCounter = this.personCounter;
        this.personListComponent.currentPage = CURRENT_PAGE_DEFAULT;
        this.personListComponent.renderPersonList();
        this.paginationComponent.currentPage = CURRENT_PAGE_DEFAULT;
        this.paginationComponent.personOnListCounter = this.personCounter;
        this.paginationComponent.renderPagination();
    }

    public static showModal(id: number): void {
        const personComponent: PersonComponent = new PersonComponent;
        personComponent.openModal(id);
    }

    public setCurrentPage(currentPage: number): void {
        this.currentPage = currentPage;
        this.personListComponent.currentPage = this.currentPage;
        this.personListComponent.renderPersonList();
        this.paginationComponent.currentPage = this.currentPage;
        this.paginationComponent.renderPagination();
    }
}