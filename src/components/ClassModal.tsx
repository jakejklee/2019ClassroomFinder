import React from 'react';
import { Modal, Spinner, Button, Form, Col, Row } from 'react-bootstrap';
interface Props {
    modalInfo: any,
}
interface State {
    classTerm: string,
    classCode: string,
    subject: string,
    title: string,
}

class ClassModal extends React.Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            classTerm: '',
            classCode: '',
            subject: '',
            title: '',
            // Term:'',
        }
    }

    private handleChange = (e: any) => {
        switch (e.target.name) {
            case 'term':
                this.setState({ classTerm: e.target.value });
                return;
            case 'classCode':
                this.setState({ classCode: e.target.value });
                return;
            case 'subject':
                this.setState({ subject: e.target.value });
                return;
            case 'title':
                this.setState({ title: e.target.value });
                return;
        }
    }

    private addClass=()=>{
        console.log(this.state.title+' '+ this.state.subject);
    }
    render() {
        console.log(this.props);
        const modalData = this.props.modalInfo;
        if (modalData.modalType === 'add') {
            return (
                <Modal
                    show={modalData.modalOpen}
                    onHide={() => modalData.modalHide()}
                    // size="sm"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: 'center' }}>
                            {modalData.schoolName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: 'center' }}>
                        <Form style={{ border: '1px solid', padding: 20, borderRadius: 20, marginTop: 20 }}>
                            <Form.Group as={Row} controlId="formHorizontalSchool">
                                <Form.Label column sm={2}>
                                    Term
                        </Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="select" name='term' onChange={(e: any) => { this.handleChange(e) }}>
                                        <option>Summer 2019</option>
                                        <option>Fall 2019</option>
                                        <option>Winter 2020</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalCode">
                                <Form.Label column sm={2}>
                                    Class Code
                        </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="Class Code" name='classCode'
                                        value={this.state.classCode} onChange={(e: any) => { this.handleChange(e) }} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalSubject">
                                <Form.Label column sm={2}>
                                    Subject
                        </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="Subject" name='subject'
                                        value={this.state.subject} onChange={(e: any) => { this.handleChange(e) }} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontaTitle">
                                <Form.Label column sm={2}>
                                    Title
                        </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="Title" name='title'
                                        value={this.state.title} onChange={(e: any) => { this.handleChange(e) }} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col>

                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>

                            {this.state.classCode && this.state.subject && this.state.title ?
                                <Button onClick={() => {this.addClass() }}
                                    style={{ marginLeft: 100 }}>
                                    Add a class</Button>
                                :
                                <Button type="submit" disabled
                                    style={{ marginLeft: 100 }}> Add a class</Button>
                            }
                        </div>
                    </Modal.Footer>
                </Modal>
            );
        } else if (modalData.modalType === 'edit') {
            return (
                <div>
                    <Modal
                        show={modalData.modalOpen}
                        onHide={() => modalData.modalHide()}
                        size="sm"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: 'center' }}>
                                Edit a class
                                    </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: 'center' }}>

                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal>
                </div>
            );
        } else if (modalData.modalType === 'remove') {
            return (
                <div>
                    <Modal
                        show={modalData.modalOpen}
                        onHide={() => modalData.modalHide()}
                        size="sm"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: 'center' }}>
                                Remove a class
                                    </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: 'center' }}>

                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal>
                </div>
            );
        } else {
            return (
                <div>
                    {
                        modalData.modalOpen ?
                            <Spinner animation='border'></Spinner>
                            :
                            null
                    }
                </div>
            );
        }
    }
}
export default ClassModal;