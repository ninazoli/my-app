import React, { Component } from "react";
import './menu.css';
import './App.css';

 
class Menu extends Component {
    state = {
    pictures: [],
    type: 'hot'
    }
    componentDidMount() {
      this.getGallery(this.state.type)
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.type !== prevState.type)
            this.getGallery(this.state.type)
    }
    /*shouldComponentUpdate(nextProps, nextState) {
        return nextState.type !== this.state.type || (this.state.pictures.length === 0 && nextState.pictures.length > 0)
    }*/
    getGallery(type) {
        return fetch(`https://api.imgur.com/3/gallery/${type}/0`, {
            headers: {
              Authorization: 'Client-ID 1ef0a5c1563efb4',
            },
          })
          .then(response => response.json())
          .then((data) => {
            this.setState({
                pictures: data.data
            })

          }, (error) => {
           console.log(error);
          });
    }
    getImageSrc(picture, thumbnail) {
        let src;
        if (picture.type === 'image/gif') {
          src = picture.link;
        } else {
          let id;
          const format = thumbnail ? 'b' : '';
          if (picture.is_album) {
            id = picture.cover;
          } else {
            id = picture.id;
          }
          src = `http://i.imgur.com/${id}${format}.png`;
        }
        return src;
      };
  render() {
    return (
      <div>
          <div className="topnav">
  <button className={this.state.type === 'home' ? 'active' : ''} onClick={() => this.setState({type: 'hot'})}>Nina Gallery</button>
  <button className={this.state.type === 'top' ? 'active' : ''} onClick={() => this.setState({type: 'top'})}>TOP</button>
  <button className={this.state.type === 'hot' ? 'active' : ''} onClick={() => this.setState({type: 'top'})}>HOT</button>

  <button className={this.state.type === 'user' ? 'active' : ''} onClick={() => this.setState({type: 'user'})}>USER</button>
</div>
<div>
<div>
      {this.state.pictures.map((picture, i) =>
      <img
      key={i}
      className="card-img-top"
      src={this.getImageSrc(picture, picture.thumbnail)}
      alt={picture.title}
      
     

    />,
    
      )}
    </div>
</div>
      </div>
    )
  };
}
 
export default Menu;