/**
 * 
 */

import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class GameList extends Component {

  constructor(props) {
    super(props);
    this.state = {groups: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/games')
      .then(response => response.json())
      .then(data => this.setState({games: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/game/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGames = [...this.state.games].filter(i => i.id !== id);
      this.setState({games: updatedGames});
    });
  }

  render() {
    const {games, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const gameList = games.map(game => {
       return <tr key={game.id}>
        <td style={{whiteSpace: 'nowrap'}}>{game.name}</td>
 		<td>{game.cost}</td>
 		<td>{game.category}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/games/" + game.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(game.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });
		
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/games/new">Add Game</Button>
          </div>
          <h3>My JUG Tour</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="20%">Cost</th>
              <th width="10%">Category</th>
   			  <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {gameList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default GameList;