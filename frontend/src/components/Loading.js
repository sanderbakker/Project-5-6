import React, {Component} from 'react'; 
import {Row, Container} from 'reactstrap'; 
import '../css/Loading.css'; 

class Loading extends Component {
    render(){
        return(
            <Container>
                <Row>
                    <div className='animation'>
                        <div className='loading'>
                        </div>
                    </div>
                </Row>
            </Container>
        )
    }
}

export default Loading