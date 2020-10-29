import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoList } from './models/todo-list.model';
import { TodoItem } from './models/todo-item.model';
import { Listings } from './models/listings.model';
import { Publication } from './models/publication.model';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  newTodoListName = '';
  todoLists: TodoList[] = [];
  newListingsName = '';
  listings: Listings[] = [];

  constructor(private httpClient: HttpClient) {}

  // TodoList - CREATE
  onListCreate(): void {
    this.httpClient.post(environment.endpointURL + 'todolist', {
      name: this.newTodoListName
    }).subscribe((instance: any) => {
      this.todoLists.push(new TodoList(instance.todoListId, instance.name, []));
      this.newTodoListName = '';
    });
  }


  ngOnInit(): void {
    // TodoList - READ
    this.httpClient.get(environment.endpointURL + 'todolist').subscribe((instances: any) => {
      this.todoLists = instances.map((instance: any) => {
        const todoItems = instance.todoItems.map((item: any) => new TodoItem(item.todoItemId, item.todoListId, item.name, item.done));

        return new TodoList(instance.todoListId, instance.name, todoItems);
      });
    });
    // TodoListing - READ
    this.httpClient.get(environment.endpointURL + 'listings').subscribe((instances: any) => {
      this.listings = instances.map((instance: any) => {
        const publications = instance.publications.map((item: any) => new Publication(item.publicationId, item.listingsId, item.name, item.done));

        return new Listings(instance.listingId, instance.name, publications);
      });
    });
  }

  // TodoList - UPDATE
  onListUpdate(todoList: TodoList): void {
    this.httpClient.put(environment.endpointURL + 'todolist/' + todoList.listId, {
      name: todoList.name,
    }).subscribe();
  }

  // TodoList - DELETE
  onListDelete(todoList: TodoList): void {
    this.httpClient.delete(environment.endpointURL + 'todolist/' + todoList.listId).subscribe(() => {
      this.todoLists.splice(this.todoLists.indexOf(todoList), 1);
    });
  }

  // TodoListing - CREATE
  onListingCreate(): void {
    this.httpClient.post(environment.endpointURL + 'listings', {
      name: this.newListingsName
    }).subscribe((instance: any) => {
      this.listings.push(new Listings(instance.listingsId, instance.name, []));
      this.newListingsName = '';
    });
  }

  // TodoListing - UPDATE
  onListingUpdate(listings: Listings): void {
    this.httpClient.put(environment.endpointURL + 'listings/' + listings.listingId, {
      name: listings.name,
    }).subscribe();
  }

  // TodoListing - DELETE
  onListingDelete(listings: Listings): void {
    this.httpClient.delete(environment.endpointURL + 'listings/' + listings.listingId).subscribe(() => {
      this.listings.splice(this.listings.indexOf(listings), 1);
    });
  }



}
