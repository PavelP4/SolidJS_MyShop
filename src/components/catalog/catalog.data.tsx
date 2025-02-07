import {CatalogItemsResult} from "./catalog.model";

export function getAllItems(): Promise<CatalogItemsResult> {
  return fetch('/src/assets/data/catalog.json')
    .then(r => {
      return new Promise(resolve => {
        setTimeout(resolve, 1000, r.json())
      })
    });
}