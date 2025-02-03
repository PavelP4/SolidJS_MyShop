import styles from "./catalog-list.module.scss";
import {Component} from "solid-js";

interface CatalogListProps {

}

const CatalogList: Component<CatalogListProps> = (props: CatalogListProps) => {
  return (
    <>
      <h1>Catalog items</h1>
    </>
  );
}

export default CatalogList;