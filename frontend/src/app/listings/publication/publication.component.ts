import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Publication } from '../../models/publication.model';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
//publication here? or TodoItemComponent
export class PublicationComponent {

  @Input()
  publication: Publication = new Publication(null, null, '', null);

  @Output()
  update = new EventEmitter<Publication>();

  @Output()
  delete = new EventEmitter<Publication>();

  onItemUpdate(): void {
    // Emits event to parent component that TodoItem got updated
    this.update.emit(this.publication);
  }

  onItemDelete(): void {
    // Emits event to parent component that TodoItem got deleted
    this.delete.emit(this.publication);
  }
}
