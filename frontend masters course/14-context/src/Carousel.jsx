import { Component } from "react";

class Carousel extends Component {
     state = {
          active: 0,
     };

     static defaultProps = {
          images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
     };

     handleIndexClick = (event) => {
          this.setState({
               active: +event.target.dataset.index,
          });
     };

     render() {
          const { active } = this.state;
          const { images } = this.props;
          return (
               <div className="grid grid-cols-1 place-items-center sm:grid-cols-2">
                    <img
                         className="flex h-80 items-center justify-center rounded-full"
                         src={images[active]}
                         alt="animal"
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                         {images.map((photo, index) => (
                              // eslint-disable-next-line
                              <img
                                   key={photo}
                                   src={photo}
                                   className="h-40 rounded-full"
                                   alt="animal thumbnail"
                                   onClick={this.handleIndexClick}
                                   data-index={index}
                              />
                         ))}
                    </div>
               </div>
          );
     }
}

export default Carousel;
