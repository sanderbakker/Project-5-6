import React, {Component} from 'react';
import {Products} from '../classes/API/Products.js'; 
import {Table, Card, Input, Button} from 'reactstrap'; 


export default class Auction extends Component{
    constructor(props) {
        super(props);
        this.props = props;
        this.Product = new Products();
        this.state = {fetching: true, bid: ""}

        this.handleBid = this.handleBid.bind(this);
        this.placeBid = this.placeBid.bind(this);
    }

    componentWillMount() {
        this.Product.getAuction(this.props.productId).then(
            (val) => {
                this.setState({auction: val, fetching: false, highestBid: parseInt(val.biddings[val.biddings.length - 1].price)})
                console.log(val);
            }
        );
    }

    handleBid(e) {
        if(e.target.value < this.state.highestBid + 1) {
            this.setState({bid: this.state.highestBid + 1});
        }

        this.setState({bid: e.target.value});
    }

    placeBid(e) {
        if(this.state.bid < this.state.highestBid + 1) {
            alert("Bid should be higher then " + (parseInt(this.state.highestBid) + 1));
        } else {
            this.Product.addBid(this.state.auction.auctionId, this.state.bid).then(
                this.Product.getAuction(this.props.productId).then(
                    (val) => {
                        console.log(val);                        
                        this.setState({bid: "", auction: val, fetching: false, highestBid: parseInt(val.biddings[val.biddings.length - 1].price)})                
                    }
                )
            );
        }
    }

    render() {
        return (
            <div>
                {!this.state.fetching ?
                <Card>
                <Table>
                 <tbody>
                    {this.state.auction.biddings.map((auction, i) => {
                        return (
                         <tr>
                          <td>{auction.lastName}</td>
                          <td>€ {auction.price}</td>                          
                         </tr>
                        );
                    })
                    }
                    <tr>
                        <td><Input onChange={this.handleBid} value={this.state.bid} type="number" id="bid" name="bid" min={this.state.highestBid + 1} placeholder={"Place bid > € " + this.state.highestBid}/></td>
                        <td><Button onClick={this.placeBid}>Place bid</Button></td>
                    </tr>
                 </tbody>
                </Table>
                </Card>
                : null }
            </div>
        );
    }
}