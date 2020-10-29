import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Listings } from '../models/listings.model';
import { HttpClient } from '@angular/common/http';
import { Publication } from '../models/publication.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent {
//here it should be todo list??
  @Input()
  listings: Listings = new Listings(null, '', []);

  @Output()
  update = new EventEmitter<Listings>();

  @Output()
  delete = new EventEmitter<Listings>();

  newPublicationName = '';

  constructor(private httpClient: HttpClient) {}

  onListingUpdate(): void {
    // Emits event to parent component that TodoList got updated
    this.update.emit(this.listings);
  }

  onListingDelete(): void {
    // Emits event to parent component that TodoList got updated
    this.delete.emit(this.listings);
  }

  // TodoPublication - CREATE
  onPublicationCreate(): void {
    this.httpClient.post(environment.endpointURL + 'publication', {
      name: this.newPublicationName,
      done: false,
      listingsId: this.listings.listingId
    }).subscribe((Publication: any) => {
      this.listings.publications.push(new Publication(Publication.publicationId, Publication.listingsId, Publication.name, Publication.done));
      this.newPublicationName = '';
    });
  }

  // TodoPublication - READ
  // Not required since all TodoPublications of a TodoList are provided with the list itself

  // TodoPublication - UPDATE
  onPublicationUpdate(publication: Publication): void{
    this.httpClient.put(environment.endpointURL + 'publication/' + publication.publicationId, {
      name: publication.name,
      done: publication.done,
      listingsId: publication.listingsId
    }).subscribe();
  }

  // TodoPublication - DELETE
  onPublicationDelete(publication: Publication): void{
    this.httpClient.delete(environment.endpointURL + 'publication/' + publication.publicationId).subscribe(() => {
      this.listings.publications.splice(this.listings.publications.indexOf(publication), 1);
    });
  }
}
