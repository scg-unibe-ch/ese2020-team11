export class Publication {

  constructor(
    public publicationId: number,
    public listingsId: number,
    public name: string,
    public done: boolean
  ) {}
}
