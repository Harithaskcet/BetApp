import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import selectors from '../counter/selectors';
import CardContent from '@material-ui/core/CardContent';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import StarsTwoToneIcon from '@material-ui/icons/StarsTwoTone';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import * as R from 'ramda';
import './LotteryWin.css';
import UserService from '../services/UserService';

const UPDATE_PLAYERS = 'http://localhost:8080/api/updatePrice';

class LotteryWin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomNumber: 1,
            players: [],
        };
        this.getPlayerCards = this.getPlayerCards.bind(this);
        this.getRandomBetween = this.getRandomBetween.bind(this);
    }

    componentDidMount() {
        const player = []
        const  won= [];
        const list = {};
        const { selectedPlayers: players } = this.props;
        const number  = this.getRandomBetween(1,9);
        R.filter( n=> n.bet === number ? won.push(n) : player.push(n), players);
        list.players = R.pluck('userId', player);
        list.won = R.pluck('userId', won);
        UserService.post(UPDATE_PLAYERS,list).then(
            data => {
                this.setState({ players: data });
            }
        );
        this.setState({ randomNumber: number });
    }
  
    
    getRandomBetween(min, max) {
        return ~~(Math.random() * (max - min + 1) + min);
    }

    getPlayerCards(players) {
        const  { randomNumber } = this.state;
        return players && players.map(player => (
            <Grid item style={{ margin: '1rem 1rem 1rem 1rem' }}>
                <Card className={R.equals(player.bet, randomNumber.toString()) ? "wonPlayers" : "lostPlayers" } variant="outlined">
                    <CardContent>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container>
                                    <Grid item xs={5}>
                                    <img src={player.imageUrl} width="50" height="50" style={{ borderRadius: '10px', marginBottom: '1rem' }}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div><strong>{player.name}</strong></div>
                                        <div><span style={{ fontSize: '13px' }}>Level {player.level}</span></div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container style={{ marginBottom: '1rem' }}>
                                    <Grid item xs={2}>
                                    <StarsRoundedIcon className="win"/>
                                    </Grid>
                                    <Grid item xs={4}>
                                    <strong>{player.price}</strong>
                                    </Grid>
                                    <Grid item xs={2}>
                                    <StarsTwoToneIcon className="bet"/>
                                    </Grid>
                                    <Grid item xs={4}>
                                    <strong>{player.bet}</strong>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container style={{ marginBottom: '0.8rem' }}>
                                    <Grid item xs={2}>
                                    <EmojiEventsIcon className="prize"/>
                                    </Grid>
                                    <Grid item xs={10}>
                                    <strong>{player.won}</strong> 
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item className="item">
                                <div className="status">{R.equals(player.bet, randomNumber.toString()) ? 'WIN' : 'LOST'}</div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        ));
    }

    render() {
        const { players } = this.state;
        return (
            <div className="backColor">
                <Grid container>
                <Grid item xs={1} className="backBtn">
                        <Button
                    variant="contained"
                    size="small"
                    style={{ margin: '1rem', backgroundColor: 'black', color: 'lightgrey' }}
                >
                    BACK
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <Grid container direction="column">
                    <Grid item>
                        <Grid container>{this.getPlayerCards(R.slice(0,5,players))}</Grid>
                    </Grid>
                    <Grid item>
                        <Grid container style={{ margin: '1rem 0 1rem 0' }}>
                            <Grid item xs={5} className="dividers">
                            <Divider className="divColor"/>
                            </Grid>
                            <Grid item xs={2} className="bet"><div className="number"><span>2</span></div></Grid>
                            <Grid item xs={5}  className="dividers">
                            <Divider className="divColor"/>
                            </Grid>
                        </Grid>
                    </Grid>   
                    <Grid item>
                        <Grid container className="bet">{this.getPlayerCards(R.slice(5,Infinity,players))}</Grid>
                    </Grid> 
                    </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    betNumber : selectors.getBetNumber(state),
    selectedPlayers: selectors.getSelectedPlayers(state),
});

export default connect(mapStateToProps, null )(LotteryWin);