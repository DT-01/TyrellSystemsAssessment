import React from 'react';
import {Card,ListGroup} from 'react-bootstrap';
import { useSelector, useDispatch,connect } from 'react-redux'

class PlayerHandList extends React.Component {
    
    render(){
        const {playerHandsList} = this.props;
        //  style={{ width: '20rem' }}
        return  <Card className="mx-auto w-100 flex-grow-1 overflow-auto">
                    <Card.Body>
                    <ListGroup>
                        {playerHandsList ? playerHandsList.map((playerHand,index) => <ListGroup.Item key={index}><div>Player : {index + 1}</div><div>{playerHand.toString()}</div></ListGroup.Item>): null}
                    </ListGroup>
                    </Card.Body>
                </Card>
    }
}

function mapStateToProps(state) {
    const { playerHands } = state
    return { playerHandsList: playerHands.playerHandsList }
}

export default connect(mapStateToProps)(PlayerHandList);