import React from 'react';
import Relay from 'react-relay';
import L from 'leaflet';
import styles from './App.scss';

class App extends React.Component {
  componentDidMount() {
    const {
      mapNode
    } = this;
    const map = L.map('map', {
      center: [0, 0],
      zoom: 2,
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: false
    });
    const tiles = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    	subdomains: 'abcd',
    	minZoom: 1,
    	maxZoom: 16,
    	ext: 'png'
    });

    tiles.addTo(map);

    mapNode.addEventListener('wheel', (e) => {
      e.preventDefault();

      const c = map.getCenter();
      map.panTo({
        lat: c.lat + e.wheelDeltaY / 100000,
        lng: c.lng + e.wheelDeltaX / -100000
      }, {
        animate: true
      });
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <div
          className={styles.map}
          id="map"
          ref={node => {
            this.mapNode = node;
          }} />
      </div>
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
