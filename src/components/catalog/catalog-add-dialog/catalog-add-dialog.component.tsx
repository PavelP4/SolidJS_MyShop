import {Button, Form, Modal, Spinner} from "solid-bootstrap";
import {Component, createEffect, createSignal, Show, Signal} from "solid-js";
import {CatalogItem} from "../catalog.model";
import {useAppContext} from "../../app/app.context";

interface CatalogAddDialogProps {
  show: Signal<boolean>;
  handler: (item: CatalogItem) => Promise<boolean>;
}

const CatalogAddDialog: Component<CatalogAddDialogProps> = (props: CatalogAddDialogProps) => {
  const appContext = useAppContext();

  const [show, setShow] = props.show;
  const [formValidated, setFormValidated] = createSignal(false);
  const [isSaving, setIsSaving] = createSignal(false);

  let formElement: HTMLFormElement;
  let newItem: CatalogItem = {};
  
  const handleCancel = () => {
    setShow(false);
  };

  createEffect((prev) => {
    if (!prev && show()) {
      setFormValidated(false);
    }

    return show();
  });

  const handleSave = () => {

    const isValid = formElement!.checkValidity();
    setFormValidated(true);

    if (!isValid) {
      return;
    }

    setIsSaving(true);
    setTimeout(() => {

      props.handler(newItem)
        .then(result => {
          if (result) {
            setShow(false);
            return;
          }

          appContext.showError("Error of saving a new item.");
        })
        .finally(() => {
          setIsSaving(false);
        });
    }, 1000);
  };

  const handleArtnumberInput = (e: any) => {
    newItem.artnumber = e.currentTarget.value;
  };
  const handleNameInput = (e: any) => {
    newItem.name = e.currentTarget.value;
  };
  const handleCostInput = (e: any) => {
    newItem.cost = e.currentTarget.value;
  };

  return (
    <Modal
      show={show()}
      onHide={handleCancel}
      aria-labelledby="title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="title">New item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formElement!} validated={formValidated()}>

          <Form.Group class="mb-3" controlId="formArtnumber">
            <Form.Label>Art. number</Form.Label>
            <Form.Control type="text" placeholder="Art. number" onInput={handleArtnumberInput} required disabled={isSaving()} />
            <Form.Control.Feedback type="invalid">
              Please enter an item articul number.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group class="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onInput={handleNameInput} required disabled={isSaving()} />
            <Form.Control.Feedback type="invalid">
              Please enter an item name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group class="mb-3" controlId="formCost">
            <Form.Label>Cost</Form.Label>
            <Form.Control type="number" placeholder="Cost" onInput={handleCostInput} required disabled={isSaving()} />
            <Form.Control.Feedback type="invalid">
              Please enter an item cost.
            </Form.Control.Feedback>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave} disabled={isSaving()}>
          <Show when={isSaving()}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style="margin-right: 8px;"
            />
          </Show>
          Save
        </Button>
        <Button variant="secondary" onClick={handleCancel} disabled={isSaving()}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CatalogAddDialog;