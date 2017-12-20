import React, {Component} from 'react'; 
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    // CarouselCaption
  } from 'reactstrap';
import { Products } from '../classes/API/Products';
import Loading from './Loading.js';

  class ProductCarousel extends Component {
    constructor(props) {
        super(props);
        this.product = new Products(); 
        this.state = { activeIndex: 0, fetching: true, items: [
        ]};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
      }
      
      componentWillMount(){
        var _temp = []; 
        this.product.getProduct(this.props.id).then(
          (val) => {
            _temp.push( {
              src:"data:image/jpg;base64," + val.image1, 
              key:1,
              altText:"1",
              caption:"1"  
            })
            if(val.image2 !== null){
              _temp.push({
                src:"data:image/jpg;base64," + val.image2, 
                key:1,
                altText:"2",
                caption:"2"  
              })
            }
            if(val.image3 !== null){
              _temp.push({
                src:"data:image/jpg;base64," + val.image3, 
                key:3,
                altText:"3",
                caption:"3"  
              })
            }
            this.setState({items: _temp, fetching: false});
          }
        )
      }
    
      onExiting() {
        this.animating = true;
      }
    
      onExited() {
        this.animating = false;
      }
    
      next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
      }

      render(){
        if(this.state.fetching){
          return <Loading/>
        }
        const { activeIndex } = this.state;
        
        const slides = this.state.items.map((item) => {
            return (
            <CarouselItem
                className="carouselItem"
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={item.src}
                src={item.src}
                altText={item.altText}
            >
                {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
            </CarouselItem>
            );
        });
          return(
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                
                <CarouselIndicators items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                {this.state.items.length > 1 ? 
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                : "" }
                {this.state.items.length > 1 ? 
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                : "" }
            </Carousel>
          );
      }
  }

  export default ProductCarousel; 