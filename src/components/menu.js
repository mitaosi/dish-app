import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
      commentList: []
    };
  }

  onDishSelect(dish) {
    // this.setState((prevState) => ({
    //   selectedDish: dish,
    //   commentList: [...prevState.commentList, dish.comments]
    // }));
    this.setState({
      selectedDish: dish,
      commentList: [...dish.comments]
    });
  }

  renderDish(dish) {
    if (dish != null)
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
  }

  renderComments(comments) {
    let commentList = comments.map((comment) => {
      return (
        <div>
          <li key={comment.id}>
            {comment.comment}
            <br />
            -- {comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit"
            }).format(new Date(Date.parse(comment.date)))}
            <br />
            <br />
          </li>
        </div>
      );
    });
    if (comments.length > 1)
      return (
        <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">
            <li>{commentList}</li>
          </ul>
        </div>
      );
    else return <div></div>;
  }

  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.state.selectedDish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.state.commentList)}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
