import {PersonClass} from "./classes/Person.class";
import {ServerInteractionService} from "../services/ServerInteraction.service";

export class PersonComponent extends PersonClass{
    protected status: 'Alive'|'Dead'|'unknown';
    protected gender: 'Female'|'Male'|'Genderless'|'unknown';
    protected imgLink: string;
    protected location: string;
    protected name: string;
    protected origin: string;
    protected species: string;
    protected type: string;
    protected dimension: string;
    protected id: number;
    protected episode: Array<string>;

    private modalWrapper: HTMLElement;
    private modalContent: HTMLElement;
    private closeBtn: HTMLElement;
    private locationUrl: string;
    private episodeContent: string = '';

    constructor() {
        super();

        this.modalWrapper = document.querySelector('.modal-wrapper');
        this.modalContent = document.querySelector('.modal-custom-content');
        this.closeBtn = document.querySelector('.close-btn');

        this.addEvents();
    }

    public openModal(id: number): void {
        ServerInteractionService.read({type: 'character', number: String(id)}).then(resp => {
            const data = JSON.parse(resp);

            this.name = data.name;
            this.status = data.status;
            this.species = data.species;
            this.type = data.type;
            this.gender = data.gender;
            this.imgLink = data.image;
            this.location = data.location.name;
            this.locationUrl = data.location.url;
            this.origin = data.origin.name;
            this.episode = data.episode;

            let episodePromise: Array<Promise<string>> = this.episode.map(episode => {
                return ServerInteractionService.read({type: 'episode', number: episode.split('/').pop()});
            });

            Promise.all(episodePromise).then(resp => {
                for (const episode of resp) {
                    const data = JSON.parse(episode);
                    this.episodeContent += `
                        <li><a href="${data.url}">${data.name}</a></li>
                    `;
                }

                ServerInteractionService.read({type: 'location', number: this.locationUrl.split('/').pop()}).then(resp => {
                    const data = JSON.parse(resp);
                    this.type = data.type;
                    this.dimension = data.dimension;

                    this.updateContent();
                });
            });
        });
    }

    private updateContent(): void {
        this.modalWrapper.classList.remove('d-none');
        document.querySelector('body').classList.add('overflow-hidden');
        this.modalContent.innerHTML = `
            <div class="col-4">
                <img src="${this.imgLink}" alt="avatar" class="pb-2 w-100">
            </div>
            <div class="col-4">
                <div class="pt-1 pb-1 border-bottom"><strong>Name: </strong>${this.name}</div>
                <div class="pt-1 pb-1 border-bottom"><strong>Status: </strong>${this.status}</div>
                <div class="pt-1 pb-1 border-bottom"><strong>Species: </strong>${this.species}</div>
                <div class="pt-1 pb-1 border-bottom"><strong>Type: </strong>${this.type}</div>
                <div class="pt-1 pb-1 border-bottom"><strong>Gender: </strong>${this.gender}</div>
                <div class="pt-1 pb-1 border-bottom"><strong>Origin: </strong>${this.origin}</div>
                ${this.location !== this.origin ? 
                    '<div class="pt-1 pb-1 border-bottom"><strong>Location: </strong>'+this.location+'</div>'
                    : '' }   
                <div class="pt-1 pb-1 border-bottom"><strong>Location type: </strong>${this.type}</div>
                <div class="pt-1 pb-1"><strong>Location dimension: </strong>${this.dimension}</div>
            </div>
            <div class="col-4">
                <div class="pt-1 pb-1"><strong>List of episodes: </strong></div>
                <ul>
                    ${this.episodeContent}
                </ul>
            </div>
        `;
    }

    private closeModal(): void {
        this.modalWrapper.classList.add('d-none');
        document.querySelector('body').classList.remove('overflow-hidden');
    }

    private addEvents(): void {
        this.btnClickEvent();
        this.wrapperClickEvent();
    }

    private btnClickEvent(): void {
        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });
    }

    private wrapperClickEvent(): void {
        this.modalWrapper.addEventListener('click', e => {
            if ((<HTMLElement> e.target).classList.contains('modal-wrapper')) this.closeModal();
        })
    }
}