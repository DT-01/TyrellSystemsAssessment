import React from 'react';
import {Form, Group, Row, Col, Card, Button, OverlayTrigger, Tooltip, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch,connect } from 'react-redux'
import {setPlayerHands,getPlayerHands} from '../actions/actions';
import {DeckService} from '../services/deckService';

class InputForm extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        numberOfPlayers: 0,
        useBackendAPI: true,
        showAlert: false,
        alertMessage:""
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      if(this.state.useBackendAPI){
        this.callApi(e);
      }else{
        this.callLocal(e);
      }
    }

    callApi = (e) => {
      fetch('http://localhost:3001/playerHands/' + this.state.numberOfPlayers)
      .then(res => res.json())
      .then((data) => {
        if(data.status != '200'){
          throw data;
        }
        this.setShowAlert(false);
        this.setAlertMessage("");
        this.props.dispatch(setPlayerHands(data.data));
      })
      .catch(e=> {
        this.setShowAlert(true);
        this.setAlertMessage(e.message);
        this.props.dispatch(setPlayerHands([]));
      })
    }

    callLocal = (e) => {
      try{
        var deckService = new DeckService();
        let players = parseInt(this.state.numberOfPlayers)
        if(isNaN(players)){
            //Not A Number
            throw {message:"Only positive numeric values allowed"}
        }
        var result = deckService.deal(players);
        this.setShowAlert(false);
        this.setAlertMessage("");
        this.props.dispatch(setPlayerHands(result));
      }catch(e){
        this.setShowAlert(true);
        this.setAlertMessage(e.message);
        this.props.dispatch(setPlayerHands([]));
      }
    }
    

    handleChange = (e) => {
      if(e.target.type == "checkbox"){
        this.setState({[e.target.name]: e.target.checked})
      }
      else{
        this.setState({[e.target.name]: e.target.value})
      }
    }

    renderTooltip = (props) => {
      return <Tooltip id="button-tooltip" {...props}>
        Requires playingcard-distribution-backend to be running on port 3001
      </Tooltip>
    }

    setShowAlert = (showAlert) => {
      this.setState({showAlert:showAlert});
    }

    setAlertMessage = (alertMessage) => {
      this.setState({alertMessage:alertMessage});
    }


    render() {
      // style={{ width: '20rem' }}
      return <Card className="mx-auto w-100">
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="playerNumberInput">
                    <Form.Label >Number of Players </Form.Label>
                    <Form.Control  name="numberOfPlayers" type="number" placeholder="" onChange={this.handleChange}/>
                  </Form.Group>
                  <Form.Group controlId="useNodejsAPI">
                    <Form.Check style={{ display: 'inline-block' }} name="useBackendAPI" type="checkbox" label="Use backend API" defaultChecked={this.state.useBackendAPI} onChange={this.handleChange}/>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={this.renderTooltip}
                    >
                    <FontAwesomeIcon style={{ display: 'inline-block' }} className="ml-2" icon={faQuestionCircle}></FontAwesomeIcon>
                    </OverlayTrigger>
                  </Form.Group>
                  <Alert show={this.state.showAlert} variant="danger" className="d-flex align-items-center">
                    <p className="mb-0 mr-auto">
                      {this.state.alertMessage}
                    </p>
                    {/*  float-right h-100 d-inline-block d-inline-block*/}
                    <Button className="" onClick={() => this.setShowAlert(false)} variant="outline-danger">
                        Close
                    </Button>
                    {/* <hr />
                    <div className="d-flex justify-content-end">

                    </div> */}
                  </Alert>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
    }
}

export default connect()(InputForm) 