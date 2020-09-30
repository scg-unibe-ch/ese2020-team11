import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoList } from '../models/todo-list.model';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from '../models/todo-item.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  @Input()
  todoList: TodoList = new TodoList(null, '', []);

  @Output()
  update = new EventEmitter<TodoList>();

  @Output()
  delete = new EventEmitter<TodoList>();

  newTodoItemName = '';

  constructor(private httpClient: HttpClient) {}

  onListUpdate(): void {
    // Emits event to parent component that TodoList got updated
    this.update.emit(this.todoList);
  }

  onListDelete(): void {
    // Emits event to parent component that TodoList got updated
    this.delete.emit(this.todoList);
  }

  // TodoItem - CREATE
  onItemCreate(): void {
    this.httpClient.post(environment.endpointURL + 'todoitem', {
      name: this.newTodoItemName,
      done: false,
      todoListId: this.todoList.listId
    }).subscribe((item: any) => {
      this.todoList.todoItems.push(new TodoItem(item.todoItemId, item.todoListId, item.name, item.done));
      this.newTodoItemName = '';
    });
  }

  // TodoItem - READ
  // Not required since all TodoItems of a TodoList are provided with the list itself

  // TodoItem - UPDATE
  onItemUpdate(todoItem: TodoItem): void{
    this.httpClient.put(environment.endpointURL + 'todoitem/' + todoItem.itemId, {
      name: todoItem.name,
      done: todoItem.done,
      todoListId: todoItem.listId
    }).subscribe();
  }

  // TodoItem - DELETE
  onItemDelete(todoItem: TodoItem): void{
    this.httpClient.delete(environment.endpointURL + 'todoitem/' + todoItem.itemId).subscribe(() => {
      this.todoList.todoItems.splice(this.todoList.todoItems.indexOf(todoItem), 1);
    });
  }
}
