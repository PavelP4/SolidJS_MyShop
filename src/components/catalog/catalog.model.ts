export class CatalogItem {
  artnumber?: string;
  name?: string;
  cost?: number;
}

export class CatalogItemsResult {
  items: CatalogItem[] = [];
}