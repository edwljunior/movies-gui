import React from 'react';

import _ from 'lodash';
import { api } from '../services/api';

class Movies extends React.Component<{}, { movies: any[], search: string, total: number }> {

  constructor(props) {
    super(props)
    this.handleAddRepository = this.handleAddRepository.bind(this);
    this.handleASearchRepository = this.handleASearchRepository.bind(this);
    this.state = { movies: [], search: '', total: 0 };
  }

  handleAddRepository(params: any) {
    params.preventDefault();
    _.debounce(async () => {
      const response = await api.get(`/api/movies/count?Title=${this.state.search}`);
      const repository = response.data;
      this.setState({
        movies: repository.movesByYear,
        total: repository.total
      });

    }, 500)();
  }

  handleASearchRepository(params: any) {
    this.setState({ search: params.target.value });
  }

  render() {
    return (
      <>
        <div className="container mt-2">

          <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand">Buscar Filmes</span>
            <form className="form-inline" onSubmit={this.handleAddRepository}>
              <input className="form-control mr-sm-2" type="search" placeholder="WaterWorld" aria-label="Search" onChange={this.handleASearchRepository} />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Buscar</button>
            </form>
          </nav>

          <ul className="list-group shadow">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Ano</strong>
              <strong>Total de filmes por ano</strong>
            </li>
            {
              this.state.movies.map((item, index) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                  {item.year}
                  <span className="badge badge-primary badge-pill">{item.movie}</span>
                </li>
              ))
            }
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Total</strong>
              <span className="badge badge-primary badge-pill">{this.state.total}</span>
            </li>
          </ul>

        </div>
      </>
    );
  }
}

export default Movies;
