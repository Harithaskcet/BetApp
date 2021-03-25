import React, { Component } from 'react';
import './PlayerDetails.css';
import Grid from '@material-ui/core/Grid';
import CasinoRoundedIcon from '@material-ui/icons/CasinoRounded';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import StarsTwoToneIcon from '@material-ui/icons/StarsTwoTone';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import Button from '@material-ui/core/Button';
import * as R from 'ramda';
import Divider from '@material-ui/core/Divider';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import  selectors  from '../counter/selectors';
import  operations  from '../counter/operations';
import { connect } from 'react-redux';
import * as Api from '../services/Api'; 
import {
  call,
} from 'redux-saga/effects';
import UserService from '../services/UserService';

const columns = [
  {
    field: 'name', headerName: 'PLAYER NAME', width: 210, sortable: false,
    headerClassName: 'headerColor',
    renderHeader: () => (
      <strong>PLAYER NAME</strong>
    ),
    renderCell: (params) => (
      <strong>{params.value}</strong>
    ),
  },
  {
    field: 'level', headerName: 'LEVEL', sortable: false, width: 100, type: 'number', headerAlign: 'center',
    headerClassName: 'headerColor',
    renderHeader: () => (
      <strong>LEVEL</strong>
    ),
  },
  {
    field: 'imageUrl',
    headerName: 'AVATAR',
    headerClassName: 'headerColor',
    width: 120,
    sortable: false,
    headerAlign: 'center',
    renderCell: (params) => (
      <img src={params.value} width="40" height="40" />
    ),
    renderHeader: () => (
      <strong>AVATHAR</strong>
    ),
  },
  {
    field: 'bet', headerName: 'BET', width: 120, type: 'number', headerAlign: 'center',
    headerClassName: 'headerColor',
    renderHeader: () => (
      <>
        <span role="img" aria-label="enjoy">
          <StarsRoundedIcon className="win" style={{ marginTop: '1rem', marginRight: '0.5rem' }} />
        </span>
        <strong>BET</strong>
      </>
    ),
    renderCell: (params) => (
      <strong>{params.value}</strong>
    ),
  },
  {
    field: 'won', headerName: 'WON', sortable: false, width: 130, type: 'number', headerAlign: 'center',
    headerClassName: 'headerColor',
    renderHeader: () => (
      <>
        <span role="img" aria-label="enjoy">
          <EmojiEventsIcon className="prize" style={{ marginTop: '1rem', marginRight: '0.5rem' }} />
        </span>
        <strong>WINS</strong>
      </>
    ),
  },
  {
    field: 'lost', headerName: 'LOST', sortable: false, width: 110, type: 'number', headerAlign: 'center',
    renderHeader: () => (
      <strong>LOST</strong>
    ),
    headerClassName: 'headerColor',
  },
  {
    field: 'price', headerName: 'PRICE', width: 173, type: 'number', headerAlign: 'center',
    renderHeader: () => (
      <>
        <span role="img" aria-label="enjoy">
          <StarsTwoToneIcon className="bet" style={{ marginTop: '1rem', marginRight: '0.5rem' }} />
        </span>
        <strong>PRICE</strong>
      </>
    ),
    renderCell: (params) => (
      <strong>{params.value}</strong>
    ),
    headerClassName: 'headerColor',
  },
];

const GET_ALL_USERS = 'http://localhost:8080/api/getAllUsers';

const SAVE_USERS = 'http://localhost:8080/api/saveAllUsers';

const GET_USER_API = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json';

const GET_SEARCH_RESULTS = 'http://localhost:8080/api/search';


class PlayerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      randomNumber: 1,
      selectedPlayers: [],
      searchValue: '',
    };
    this.viewPlayer = this.viewPlayer.bind(this);
    this.selectedPlayers = this.selectedPlayers.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.onSearchPlayers = this.onSearchPlayers.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.renderGamePage = this.renderGamePage.bind(this);
  }

  // static getDerivedStateFromProps(prevProps, prevState) {
  //   const { players } = prevProps;
  //   const { users } = prevState;
  //   if(users.length === 0) {
  //   return {
  //     users : players
  //   }
  //  }
  //  return null;
  // }

  componentDidMount() {
      // UserService.get(GET_USER_API).then(response=>{
      //   UserService.post(SAVE_USERS, response).then(
      //     UserService.get(GET_ALL_USERS).then(data=> {
      //       this.setState({ users: data});
      //     })
      //   )
      // });
      const { setPlayers } = this.props;
      // UserService.get(GET_ALL_USERS).then(data=>{
      setPlayers();
        // this.setState({ users: data });
      // });
  }

  onSearchPlayers(event) {
      const { getPlayers } = this.props;
      console.log(event.target.value);
      if(R.equals(event.target.value ,'')) {
        this.setState({ users: getPlayers });
      }
      this.setState({ searchValue: event.target.value });
  }

  renderSearchResults() {
        const  { searchValue } = this.state;
        UserService.get(`${GET_SEARCH_RESULTS}/${R.toUpper(searchValue)}`).then(
          data => {
            this.setState({ users: data })
          }
        );
  }

  renderTable() {
    const { getPlayers:users } = this.props;
    const grps = users.map((col) => {
      return { ...col, id: col.userId }
    });
    return (
      <div style={{ height: 470, width: '100%', color: 'grey' }}>
        <DataGrid 
        rows={grps} 
        columns={columns} 
        pageSize={6} 
        checkboxSelection 
        autoHeight 
        onSelectionChange={(value)=>{
          const { rowIds } =  value;
          const selectedUsers = R.filter(n => R.contains(`${n.userId}`, rowIds), users);
          this.setState({ selectedPlayers: selectedUsers });
        }}
        style={{ overflowX: 'hidden' }} />
      </div>
    );
  }

  viewPlayer() {
    const  { searchValue } = this.state;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        style={{ width: '100%' }}
      >
        <Grid item xs={4} className="select"><span style={{ fontWeight: 'bold',color: 'blue' }}>Select Playing 9</span></Grid>
        <Grid item xs={4} className="searchBar">
          <TextField
            onChange={this.onSearchPlayers}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon styleName="searchIcon" onClick={this.renderSearchResults}/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Search Players"
            styleName="searchStyle"
            value={searchValue}
            varirant="filled"
          />
        </Grid>
        <Grid item xs={4} className="data">{this.renderTable()}</Grid>
      </Grid>
    );
  }

  renderGamePage() {
    const { history, setSelectedPlayers } =  this.props;
    const { selectedPlayers } = this.state;
    setSelectedPlayers(selectedPlayers);
    history.push('/winner');
  }

  getUsers() {
    const { selectedPlayers } = this.state;
    console.log(selectedPlayers);
    return !R.isEmpty(selectedPlayers) &&
    selectedPlayers.map(user => (
        <Grid container
          justify="space-around"
          alignItems="center">
          <Grid item xs={3}>
            <img alt="avathar" src={user.imageUrl} width="40" height="40" style={{ margin: '1rem', borderRadius: '10px' }} />
          </Grid>
          <Grid item xs={5}>
            <Grid container direction="column">
              <Grid item>
                <strong><span>{user.name}</span></strong>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={3}><EmojiEventsIcon className="prize" /></Grid>
                  <Grid item xs={2}>{user.won}</Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3}><StarsTwoToneIcon className="bet" /></Grid>
                  <Grid item xs={2}>{user.bet}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" justify="center"
              alignItems="center">
              <Grid item xs={4}><StarsRoundedIcon className="win" /></Grid>
              <Grid item xs={8}><strong>{user.price}</strong></Grid>
            </Grid>
          </Grid>
        </Grid>
      ));
  }

  selectedPlayers() {
    return (
      <Grid container direction="column" alignItems="stretch">
        <Grid item>
          <CasinoRoundedIcon className="dice" />
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item className="nop">
          <span style={{ fontWeight: 'bold' }}>Playing 9</span>
        </Grid>
        <Grid item className="cards">
          {this.getUsers()}
        </Grid>
        <Grid item style={{ display: 'contents' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ margin: '1rem' }}
            onClick={this.renderGamePage}
          >
            START
              </Button>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <>
        <Grid container>
          <Grid item xs={3} className="players">{this.selectedPlayers()}</Grid>
          <Grid item xs={9}>{this.viewPlayer()}</Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
   getVisit : selectors.getFirstVisit(state),
   getPlayers : selectors.getPlayers(state),
});

const mapDispatchToProps = (dispatch) => ({
  getVisit : operations.setFirstVisitOperation(dispatch),
  setPlayers : operations.setPlayers(dispatch),
  setSelectedPlayers : operations.setSelectedPlayers(dispatch),
  setBetNumber : operations.setBetNumber(dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(PlayerDetails);