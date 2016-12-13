import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    return (
      <div>yayay</div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Shipments {
        shipments {
          id
          containers {
            type
            number
          }
          origin {
            latitude
            longitude
          }
          destination {
            latitude
            longitude
          }
          route {
            date
            latitude
            longitude
          }
        }
      }
    `
  }
});
