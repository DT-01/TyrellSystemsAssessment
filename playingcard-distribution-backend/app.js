import {DeckService} from './services/deck-service.js';
import express from 'express';
import cors from 'cors'

const app = express();

app.use(cors());

//Routes
app.get('/playerHands/:players', (req,res) => {
    try{
        var deckService = new DeckService();
        let players = parseInt(req.params.players)
        if(isNaN(players)){
            //Not A Number
            throw {message:"Only positive numeric values allowed"}
        }
        var result = deckService.deal(players);
        res.send({
            status:'200',
            message: 'Ok.',
            data: result
        });
    }catch(e){
        res.send({
            status:'422',
            message: e.message,
            data: null
        });
    }

})

//Listen
app.listen(3001);