import {Button, Card, Stack, Table} from "solid-bootstrap";
import styles from "./catalog-list.module.scss";
import "../../components.scss";
import {Component, createResource, createSignal, For, Suspense} from "solid-js";
import {useAppContext} from "../../app/app.context";
import {getAllItems} from "../catalog.data";
import Loading from "../../app/loading/loading.component";
import {CatalogItem, CatalogItemsResult} from "../catalog.model";
import CatalogAddDialog from "../catalog-add-dialog/catalog-add-dialog.component";

interface CatalogListProps {
}

const CatalogList: Component<CatalogListProps> = (props: CatalogListProps) => {
  const appContext = useAppContext();
  const [showAddDialog, setShowAddDialog] = createSignal(false);

  const [data, {mutate, refetch}] = createResource(getAllItems);

  //const handleClick = () => {
  //  appContext.showError('Hello!!!');
  //};

  const isSuspended = () => data.loading || data.error || showAddDialog();

  const handleAddNewClick = () => {
    if (isSuspended()) {
      return;
    }    

    setShowAddDialog(true);
  };

  const handleAddNewItem = (item: CatalogItem): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        mutate(prev => {
          prev = prev || {
            items: []
          };
    
          return {
            items: [...prev.items, item]
          };
        });

        resolve(true);
      }, 1000);
    });
  };

  const handleRefresh = () => {
    refetch();
  };
  

  return (
    <>
      <Card class={styles.container}>
        <Card.Header as="h5">Catalog</Card.Header>
        <Card.Body>
          <Stack gap={3}>
            <div class="app-tool-line">
              <Button variant="outline-primary" onClick={handleAddNewClick} disabled={isSuspended()}>Add new</Button>
              <Button variant="outline-primary" onClick={handleRefresh} disabled={isSuspended()}>Refresh</Button>
            </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Cost</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <Suspense fallback={<Loading />}>
                    <For each={data()?.items} >
                      {(item) => (
                        <tr>
                          <td>{item.artnumber}</td>
                          <td>{item.name}</td>
                          <td>{item.cost}</td>
                          <td></td>
                        </tr>
                      )}
                    </For>
                  </Suspense>
                </tbody>
              </Table>
          </Stack>
        </Card.Body>
      </Card>

      <CatalogAddDialog show={[showAddDialog, setShowAddDialog]} handler={handleAddNewItem} />
    </>
    
  );
}

export default CatalogList;