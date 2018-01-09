import React, {Component} from 'react';
import {Products} from '../classes/API/Products.js'; 
import {Table, Card, Input, Button, CardHeader} from 'reactstrap'; 

import moment from 'moment';

export default class Auction extends Component{
    constructor(props) {
        super(props);
        this.props = props;
        this.Product = new Products();
        this.state = {fetching: true, bid: ""}

        this.handleBid = this.handleBid.bind(this);
        this.placeBid = this.placeBid.bind(this);
        this.calcTime = this.calcTime.bind(this);
    }

    calcTime(val) {
        var totalDays = moment(val.closeOn).diff(moment(), 'days');        
        var totalHours = moment(val.closeOn).diff(moment(), 'hours');
        var totalMinutes = moment(val.closeOn).diff(moment(), 'minutes');
        var clearHours = totalHours % 24;
        var clearMinutes = (totalMinutes - 1) % 60;
        if(totalDays != 0)
            var text = totalDays + " days, " + clearHours + " hours and " + clearMinutes + " minutes ";
        else if (totalHours != 0)
            var text = clearHours + " hours and " + clearMinutes + " minutes ";        
        else
            var text = clearMinutes + " minutes ";

        if(moment(val.closeOn) <= moment()) 
            var text = "ALREADY ENDED"; 

        return text;
    }

    componentWillMount() {
        this.Product.getAuction(this.props.productId).then(
            (val) => {
                this.interval = setInterval(() => this.setState({ time: this.calcTime(val)}), 1000)
                if(val.biddings.length === 0) {
                    this.setState({auction: val, fetching: false, hasBids: true, highestBid: val.price})
                } else {
                    this.setState({auction: val, fetching: false, hasBids: false, highestBid: parseInt(val.biddings[val.biddings.length - 1].price)})
                }
            }
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }    

    handleBid(e) {
        if(e.target.value < this.state.highestBid + 1) {
            this.setState({bid: this.state.highestBid + 1});
        }

        this.setState({bid: e.target.value});
    }

    placeBid(e) {
        if(this.state.bid < this.state.highestBid + 1) {
            alert("Bid should be higher then € " + (parseInt(this.state.highestBid) + 0.99));
        } else {
            this.Product.addBid(this.state.auction.auctionId, this.state.bid).then(
                (val) => {
                this.Product.getAuction(this.props.productId).then(
                    (val) => {
                        this.setState({bid: "", auction: val, fetching: false, highestBid: parseInt(val.biddings[val.biddings.length - 1].price)})                
                    }
                )
                }
            );
        }
    }

    render() {
        if(!this.state.fetching && moment(this.state.auction.closeOn) <= moment()) {
            return (<h3>Auction closed!</h3>)
        }

        return (
            <div>
                {!this.state.fetching ?
                <Card>
                {this.state.time != null ?
                 <CardHeader>
                    <h4>Auction closes in {this.state.time}</h4>   
                 </CardHeader>
                : null }
                 <div style={{maxHeight: '350px', overflowY: 'scroll'}}>
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

                    </tbody>
                  </Table>
                 </div>
                <Table>
                 <tbody>  
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