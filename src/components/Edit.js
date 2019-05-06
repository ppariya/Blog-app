import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      body: '',
      date_added: firebase.firestore.FieldValue.serverTimestamp()
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('blogs').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const blog = doc.data();
        this.setState({
          key: doc.id,
          title: blog.title,
          body: blog.body,
          

        });
      } else {
        console.log("No such Blog!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({blog:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, body, date_added } = this.state;

    const updateRef = firebase.firestore().collection('blogs').doc(this.state.key);
    updateRef.set({
      title,
      body,
      date_added
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        body: '',
        
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding blog: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BLOG
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Blog List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">Body:</label>
                <input type="text" class="form-control" name="body" value={this.state.body} onChange={this.onChange} placeholder="Body" />
              </div>
              
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;