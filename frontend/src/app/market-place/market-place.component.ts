import { Component, OnInit } from '@angular/core';
import { Listings } from '../models/listings.model';
import { Publication } from '../models/publication.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {
  newListingsName = '';
  listings: Listings[] = [];
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    // TodoListing - READ
    this.httpClient.get(environment.endpointURL + 'listings').subscribe((instances: any) => {
      this.listings = instances.map((instance: any) => {
        const publications = instance.publications.map((item: any) => new Publication(item.publicationId, item.listingsId, item.name, item.done));

        return new Listings(instance.listingId, instance.name, publications);
      });
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
