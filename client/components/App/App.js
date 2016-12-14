import React from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import L from 'leaflet';
import styles from './App.scss';

const POLYLINE_COLORS = [
  '216', '36', '306', '126', '261', '81', '351', '171', '239', '59', '32', '91', '49', '284', '104', '14', '194', '227', '47', '31', '71', '372', '72', '92', '21'
].map(hue => `hsl(${hue}, 100%, 65%)`);

class App extends React.Component {
  componentDidMount() {
    const {
      mapNode
    } = this;
    const {
      shipments
    } = this.props.viewer;
    const map = L.map('map', {
      center: [0, 0],
      zoom: 2,
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: false
    });
    const tiles = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
    });
    const points = _.map(shipments, (shipment, index) => {
      const {
        origin,
        route
      } = shipment;
      const routeProgress = _.concat(origin, route);
      const polylinePoints = _.map(routeProgress, point => [point.latitude, point.longitude]);

      L.polyline(polylinePoints, {
        color: POLYLINE_COLORS[index],
        weight: 5,
        opacity: 0.5
      }).addTo(map);

      return polylinePoints;
    });

    tiles.addTo(map);
    map.fitBounds(points);

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

  componentDidUpdate() {
    const {
      viewer: {
        shipments
      }
    } = this.props;

    console.log(shipments);
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
