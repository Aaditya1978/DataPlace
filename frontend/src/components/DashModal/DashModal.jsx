import { Button, Modal } from "react-bootstrap";
import "./DashModal.scss";

export default function DashModal(props) {
    return (
        <Modal className="dashModal" show={props.show} onHide={props.onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">{props.body}</Modal.Body>
            <Modal.Footer>
            <Button variant="outline-success" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
