import { Publication } from './publication.model';

export class Listings {

  constructor(
    public listingId: number,
    public name: string,
    public publications: Publication[]
  ) {}
}
