export abstract class PersonCartClass {
    protected abstract imgLink :string;
    protected abstract name :string;
    protected abstract status: 'Alive'|'Dead'|'unknown';
    protected abstract id: number;
}