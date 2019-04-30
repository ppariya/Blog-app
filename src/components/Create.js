import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('blogs');
    this.state = {
      title: '',
      body: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, body } = this.state;

    this.ref.add({
      title,
      body
    }).then((docRef) => {
      this.setState({
        title: '',
        body: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding blog: ", error);
    });
  }

  render() {
    const { title, body } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BLOG
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Blog List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">Body:</label>
                <textArea class="form-control" name="body" onChange={this.onChange} placeholder="Body" cols="80" rows="3">{body}</textArea>
              </div>
              
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;