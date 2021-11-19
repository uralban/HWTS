import 'bootstrap';
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';

import {DropdownComponent} from "./components/Dropdown.component";
import {PersonListComponent} from "./components/PersonList.component";
import {PaginationComponent} from "./components/Pagination.component";
import {DataService} from "./services/Data.service";

const personListComponent: PersonListComponent = new PersonListComponent();
const paginationComponent: PaginationComponent = new PaginationComponent();

export const dataService = new DataService(personListComponent, paginationComponent);
new DropdownComponent();