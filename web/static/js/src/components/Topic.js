import {connect} from 'react-redux';
import {pushVote} from 'actions/vote';
import {alertError} from 'actions/alerts';
import d3 from 'd3';

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  };
};

const mapDispatchToProps = (dispatch) => ({dispatch});

export class Topic extends React.Component {

  static propTypes = {
    elem: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    authenticated: React.PropTypes.bool
  };

  componentDidMount () {
    this.drawChart();
  }

  componentWillReceiveProps () {
    this.drawChart();
  }


  drawChart () {
    const div = document.getElementById('chart' + this.props.elem.id);
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    let data = Object.keys(this.props.elem.categories).map(key => {
      return {
        label: key,
        value: this.props.elem.categories[key]
      };
    })
            .filter(elem => elem.value !== 0);
    if (!data.length) {
      data = [{label: 'no votes', value: 1}];
    }

    const w = 128;
    const h = 128;
    const r = h / 2;
    const color = d3.scale.category20c();
    const vis = d3.select('#chart' + this.props.elem.id)
            .append('svg:svg')
            .data([data])
            .attr('width', w)
            .attr('height', h)
            .append('svg:g')
            .attr('transform', 'translate(' + r + ',' + r + ')');
    const pie = d3.layout.pie().value(d => d.value);

    const arc = d3.svg.arc().outerRadius(r);

    const arcs = vis.selectAll('g.slice')
            .data(pie)
            .enter()
            .append('svg:g')
            .attr('class', 'slice');
    arcs.append('svg:path')
      .attr('fill', (d, i) => color(i))
      .attr('d', (d) => arc(d));

    // add the text
    arcs.append('svg:text').attr('transform', d => {
      d.innerRadius = 0;
      d.outerRadius = r;
      return 'translate(' + arc.centroid(d) + ')';
    })
    .attr('text-anchor', 'middle').text((d, i) => data[i].label);
  }

  handleVote (key, e) {
    e.preventDefault();
    if (this.props.authenticated) {
      let payload;
      payload = {
        id: this.props.elem.id,
        title: this.props.elem.title,
        categories: this.props.elem.categories
      };
      payload.categories[key] = payload.categories[key] + 1;
      this.props.dispatch(pushVote(payload));
    } else {
      this.props.dispatch(alertError({'error': 'You must be logged in to vote'}));
    }
  }

  render () {
    const categories = Object.keys(this.props.elem.categories).map((key, ix) => {
      return (
        <div className='vote-button col-xs-4 btn btn-info'
             key={ix}
             onClick={this.handleVote.bind(this, key)}>
          {key}: {this.props.elem.categories[key]}
        </div>
      );
    });
    return (
      <div className='well'>
        <div className='media'>
          <div className='media-left'>
            <div id={`chart${this.props.elem.id}`}></div>
          </div>
          <div className='media-body'>
            <h4 className='media-heading'>{this.props.elem.title}</h4>
            {categories}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
