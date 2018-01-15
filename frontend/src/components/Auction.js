import React, {Component} from 'react';
import {Products} from '../classes/API/Products.js'; 
import {Table, Card, Input, Button, CardHeader} from 'reactstrap'; 
import Loading from './Loading.js'; 
import NotificationAlert from 'react-notification-alert'; 
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
        this.notify = this.notify.bind(this); 
    }

    calcTime(val) {
        var totalDays = moment(val.closeOn).diff(moment(), 'days');        
        var totalHours = moment(val.closeOn).diff(moment(), 'hours');
        var totalMinutes = moment(val.closeOn).diff(moment(), 'minutes');
        var text = ""; 
        var clearHours = totalHours % 24;
        var clearMinutes = (totalMinutes - 1) % 60;
        if(totalDays !== 0)
            text = totalDays + " days, " + clearHours + " hours and " + clearMinutes + " minutes ";
        else if (totalHours !== 0)
            text = clearHours + " hours and " + clearMinutes + " minutes ";        
        else
            text = clearMinutes + " minutes ";

        if(moment(val.closeOn) <= moment()) 
            text = "ALREADY ENDED"; 

        return text;
    }

    componentWillMount() {
        setTimeout( () => {
        this.Product.getAuction(this.props.productId).then(
            (val) => {
                this.interval = setInterval(() => this.setState({ time: this.calcTime(val)}), 1000)
                if(val.biddings.length === 0) {
                    this.setState({auction: val, fetching: false, hasBids: true, highestBid: val.price})
                } else {
                    this.setState({auction: val, fetching: false, hasBids: false, highestBid: parseInt(val.biddings[val.biddings.length - 1].price, 10)})
                }
            }
        )}, 1000);  
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }    

    notify(_message, _type){
        
        var options = {
            place: 'tr',
            message: (
                <div>
                    {_message}
                </div>
            ),
            type: _type,
            autoDismiss: 3
        }
        this.refs.notify.notificationAlert(options);
    }

    handleBid(e) {
        if(e.target.value < this.state.highestBid + 1) {
            this.setState({bid: this.state.highestBid + 1});
        }

        this.setState({bid: e.target.value});
    }

    placeBid(e) {
        if(this.state.bid < this.state.highestBid + 1) {
            this.notify("Bid should be higher then € " + (parseInt(this.state.highestBid, 10) + 0.99), "danger"); 
        } else {
            this.Product.addBid(this.state.auction.auctionId, this.state.bid).then(
                (val) => {
                this.Product.getAuction(this.props.productId).then(
                    (val) => {
                        this.setState({bid: "", auction: val, fetching: false, highestBid: parseInt(val.biddings[val.biddings.length - 1].price, 10)})                
                    }
                )
                }
            );
        }
    }

    render() {
        if(this.state.fetching){
            return <Loading/>
        }
        if(!this.state.fetching && moment(this.state.auction.closeOn) <= moment()) {
            return (<h5>Auction closed!</h5>)
        }

        return (
            <div>
                {/* {!this.state.fetching && this.state.time != null? */}
                <Card>
                {/* {this.state.time != null ? */}
                <NotificationAlert ref="notify" />
                 <CardHeader>
                    <h5>Auction closes in {this.state.time}</h5>   
                 </CardHeader>
                {/* : null } */}
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
                        <td><Input size="sm" onChange={this.handleBid} value={this.state.bid} type="number" id="bid" name="bid" min={this.state.highestBid + 1} placeholder={"Place bid > € " + this.state.highestBid}/></td>
                        <td>
                            <Button size={"sm"} disabled={this.state.bid === "" ? true : false} onClick={this.placeBid}>Place bid</Button>
                        </td>
                    </tr>
                 </tbody>
                </Table>                                  
                </Card>
                {/* : null } */}
            </div>
        );
    }
}