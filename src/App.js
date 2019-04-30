import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('blogs');
    this.unsubscribe = null;
    this.state = {
      blogs: []
    };
  }

  onCollectionUpdate = (snapshot) => {
    const blogs = [];
    snapshot.forEach((doc) => {
      const { title, body } = doc.data();
      blogs.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        body,
        
      });
    });
    this.setState({
      blogs
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BLOG LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">Add Blog</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Body</th>              
                </tr>
              </thead>
              <tbody>
                {this.state.blogs.map(blog =>
                  <tr>
                    <td><Link to={`/show/${blog.key}`}>{blog.title}</Link></td>
                    <td>{blog.body}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;