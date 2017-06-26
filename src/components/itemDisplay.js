import React from 'react';
import { Link } from 'react-router';

class ItemDisplay extends Component {

  render() {
    const { item, id } = this.props;
    return (
      <figure key={id} className="grid-figure">

        <div className='grid-photo-wrap'>
          <Link to={`/view/${item.id}`}>
            { item.name }
          </Link>
        </div>

        <figcaption>
          <p>{item.cuisines}</p>

          <p>{ item.location.city }</p>

        </figcaption>

      </figure>
    )
  }
};

export default Photo;
