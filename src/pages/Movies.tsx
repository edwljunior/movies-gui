import React from 'react';

import { api } from '../services/api';

class Movies extends React.Component<{}, { movies: any[], search: string, total: number, listMoviesByYear: any[], selectedYear: number, currentPage: number, total_pages: number }> {

  constructor(props) {
    super(props)
    this.handleAddRepository = this.handleAddRepository.bind(this);
    this.handleASearchRepository = this.handleASearchRepository.bind(this);
    this.state = { movies: [], search: '', total: 0, listMoviesByYear: [], selectedYear: 0, currentPage: 1, total_pages: 1 };
  }

  async handleAddRepository(params: any) {
    params.preventDefault();
    const response = await api.get(`/api/movies/count?Title=${this.state.search}`);
    const repository = response.data;
    this.setState({
      movies: repository.moviesByYear.sort((a, b) => {
        if (a.year > b.year) {
          return 1;
        }
        if (a.year < b.year) {
          return -1;
        }
        return 0;
      }),
      total: repository.total
    });
  }

  async handleMovieByYear(year: number, page = 1) {
    const response = await api.get(`/api/movies/moviesByYear?Title=${this.state.search}&year=${year}&page=${page}`);
    const repository = response.data;
    this.setState({
      listMoviesByYear: repository.data,
      selectedYear: year,
      currentPage: page,
      total_pages: repository.total_pages
    });
  }

  handleASearchRepository(params: any) {
    this.setState({ search: params.target.value });
  }

  render() {
    return (
      <>
        <div className="container mt-2">
          <div className="row">
            <div className="col">
              <nav className="navbar navbar-light bg-light">
                <span className="navbar-brand">Buscar Filmes</span>
                <form className="form-inline" onSubmit={this.handleAddRepository}>
                  <input className="form-control mr-sm-2" type="search" placeholder="WaterWorld" aria-label="Search" onChange={this.handleASearchRepository} />
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Buscar</button>
                </form>
              </nav>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <ul className="list-group shadow">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Ano</strong>
                  <strong>Total de filmes por ano</strong>
                </li>
                {
                  this.state.movies.map((item, index) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index} onClick={() => this.handleMovieByYear(item.year)}>
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
            <div className="col">
              <button className="btn btn-primary" disabled={this.state.currentPage == 1} onClick={() => this.handleMovieByYear(this.state.selectedYear, this.state.currentPage - 1)}>Anterior</button>
              <button className="ml-2 btn btn-primary" disabled={this.state.currentPage == this.state.total_pages} onClick={() => this.handleMovieByYear(this.state.selectedYear, this.state.currentPage + 1)}>Próximo</button>
              <p>Página {this.state.currentPage} de {this.state.total_pages}</p>
              <ul className="list-group shadow mt-2">
                {
                  this.state.listMoviesByYear.map((item, index) => (
                    <li className="list-group-item align-items-center" key={index}>
                      <small>Nome do filme</small><br />{item.Title}
                      <br />
                      <small>Ano do filme</small><br />{item.Year}
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
