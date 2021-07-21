import React, { Component } from "react";
import { Control, LocalForm, Errors } from "react-redux-form";
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Label
} from "reactstrap";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(event) {
    this.toggleModal();
    alert(
      "Rating: " +
        this.rating.value +
        "Username: " +
        this.username.value +
        "Comment: " +
        this.comment.value
    );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"> Submit Comment</span>
        </Button>

        <div className="row row-content">
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <div className="col-12 col-md-9">
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className="form-group">
                    <Label htmlFor="rating">Rating</Label>
                    <Col md={10}>
                      <Control.select
                        model=".rating"
                        name="rating"
                        className="form-control"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Control.select>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Label htmlFor="author" md={2}>
                      Your name
                    </Label>
                    <Col md={10}>
                      <Control.text
                        model=".author"
                        id="author"
                        name="author"
                        placeholder="Author"
                        className="form-control"
                        validators={{
                          required,
                          minLength: minLength(2),
                          maxLength: maxLength(15)
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".author"
                        show="touched"
                        messages={{
                          required: "Required",
                          minLength: "Must be greater than 2 characters",
                          maxLength: "Must be 15 charaters or less"
                        }}
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Label htmlFor="comment" md={2}>
                      Comment
                    </Label>
                    <Col md={10}>
                      <Control.textarea
                        model=".comment"
                        id="comment"
                        name="comment"
                        rows="6"
                        className="form-control"
                        validators={{ required }}
                      />
                      <Errors
                        className="text-danger"
                        model=".comment"
                        show="touched"
                        messages={{ required: "Required" }}
                      />
                    </Col>
                  </Row>

                  <Button type="submit" value="submit" color="primary">
                    Submit
                  </Button>
                </LocalForm>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default CommentForm;
