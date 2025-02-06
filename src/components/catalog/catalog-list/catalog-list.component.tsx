import {Button} from "solid-bootstrap";
import styles from "./catalog-list.module.scss";
import {Component} from "solid-js";
import {useAppContext} from "../../app/app.context";

interface CatalogListProps {

}

const CatalogList: Component<CatalogListProps> = (props: CatalogListProps) => {

  const appContext = useAppContext();

  const handleClick = () => {
    appContext.showError('Hello!!!');
  };

  return (
    <>
      <h1>Catalog items</h1>
      <Button onClick={handleClick}>Show Info notification</Button>
    </>
  );
}

export default CatalogList;