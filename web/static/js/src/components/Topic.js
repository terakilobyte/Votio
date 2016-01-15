import d3 from 'd3';
import {connect} from 'react-redux';
import {pushVote} from 'actions/vote';

const mapStateToProps = (state) => {
  console.log('new state', state);
  return {
    topics: state.vote.topics
  };
};

const mapDispatchToProps = (dispatch) => ({dispatch});

export class Topic extends React.Component {

  static propTypes = {
    elem: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  componentWillReceiveProps (props) {
    console.log('got new props');
  }

  // drawChart () {
  //   const div = document.getElementById('chart' + this.props.elem.id);
  //   // while (div.firstChild) {
  //   //   div.removeChild(div.firstChild);
  //   // }
  //   const data = Object.keys(this.props.elem.categories).map(key => {
  //     return {
  //       label: key,
  //       value: this.props.elem.categories[key]
  //     };
  //   });

  //   const w = 128;
  //   const h = 128;
  //   const r = h / 2;
  //   const color = d3.scale.category20c();
  //   const vis = d3.select('#chart' + this.props.elem.id)
  //           .append('svg:svg')
  //           .data([data])
  //           .attr('width', w)
  //           .attr('height', h)
  //           .append('svg:g')
  //           .attr('transform', 'translate(' + r + ',' + r + ')');
  //   const pie = d3.layout.pie().value(d => d.value);

  //   const arc = d3.svg.arc().outerRadius(r);

  //   const arcs = vis.selectAll('g.slice')
  //           .data(pie)
  //           .enter()
  //           .append('svg:g')
  //           .attr('class', 'slice');
  //   arcs.append('svg:path')
  //     .attr('fill', (d, i) => color(i))
  //     .attr('d', (d) => arc(d));

  //   // add the text
  //   arcs.append('svg:text').attr('transform', d => {
  //     d.innerRadius = 0;
  //     d.outerRadius = r;
  //     return 'translate(' + arc.centroid(d) + ')';
  //   })
  //   .attr('text-anchor', 'middle').text((d, i) => data[i].label);
  // }

  handleVote (key, e) {
    e.preventDefault();
    let payload;
    payload = {
      id: this.props.elem.id,
      title: this.props.elem.title,
      categories: this.props.elem.categories
    };
    payload.categories[key] = payload.categories[key] + 1;
    this.props.dispatch(pushVote(payload));
  }

  render () {
    let categories = Object.keys(this.props.elem.categories).map((key, ix) => {
      return (
        <div className='col-xs-6 btn btn-info'
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
