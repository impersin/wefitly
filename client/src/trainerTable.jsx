import React from 'react';
import FilterBar from './filterBar.jsx';
import $ from 'jquery';
import TableRow from './tableRow.jsx';
import css from './home.css'

class TrainerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getTargetValue(e) {
    return $(e.target).val();
  }

  getAll() {
    $.ajax({
      url: '/api/getAllTrainers',
      method: 'GET',
      ContentType :'application/json',
    })
    .done((response) => {
      let temp = [];
      response.forEach( (item) => {
        temp.push(item);
      })
      this.setState({entries: temp})
    })
    .fail(() => {
      console.log('signup data transmission failure');
    });
  }


  handleFilterChange(e, l) {
    const props = this.props;
    const $ele = (l === undefined) ? this.getTargetValue(e) : l;

    if($ele === 'All'){
      this.getAll();
    }else{
      $.ajax({
        url: '/api/filterTrainers',
        method: 'GET',
        ContentType :'application/json',
        data: {
          location: $ele,
        },
      })
      .done((response) => {
        let temp = [];
        response.forEach( (item) => {
          temp.push(item);
        })
        this.setState({entries: temp})
      })
      .fail(() => {
        console.log('signup data transmission failure');
      });
    }
  }
  render() {
    let elements = [];
    this.state.entries.forEach(( en , index )=> {
      elements.push(<TableRow key= {index} firstName={en.firstname} lastName={en.lastname} location={en.location}/>)
    });
    console.log(elements);
    return (
      <div >
        <FilterBar handleChange={this.handleFilterChange.bind(this)}/>
        <ul className="trainers w-list-unstyled">
        {elements}
        </ul>
      </div>
      );

  };
}

export default TrainerTable;