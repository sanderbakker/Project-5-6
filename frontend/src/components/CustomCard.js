import React, {Component} from 'react'
import {Card, CardTitle, CardSubtitle, CardBody, Col, CardText} from 'reactstrap'

class CustomCard extends Component {
    render(){
        return(
            <Col md={4}>
                <Card>
                    <CardBody>
                        <CardTitle>
                            Gerwin
                        </CardTitle>
                        <CardSubtitle className="mb-2 text-muted">
                            Gerwin's prijs (1 euro)
                        </CardSubtitle>
                        
                        <CardText>
                            Een beschrijving van Gerwin, bijvoorbeeld: "C# fanboy, Microsoft vriendin, India, Aplhacom, 13,00 per uur"
                        </CardText>
                        Hier komen buttons
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
export default CustomCard; 