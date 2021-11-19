import {PersonCartClass} from "./PersonCart.class";

export abstract class PersonClass extends PersonCartClass{
    protected abstract species: string;
    protected abstract type: string;
    protected abstract dimension: string;
    protected abstract gender: 'Female'|'Male'|'Genderless'|'unknown';
    protected abstract origin: string;
    protected abstract location: string;
    protected abstract episode: Array<string>;
}