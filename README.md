# React + Relay + map example

To run, put files

- shipments.json,
- customers.json, and
- trackingEvents.json

to the project folder root, do classic

```bash
npm install; npm start
```

and then

```bash
open http://localhost:3000
```

to see the map with shipment routes.

## Leaflet

The map engine is Leaflet.

Reference to tile layer "Stamen.Watercolor" is generously provided by [Leaflet extras](https://leaflet-extras.github.io/leaflet-providers/preview/).

## TODO

- [x] Add the map
- [ ] Place markers to the map where current location of a freight is
- [x] Draw lines to represent routes
- [ ] Check if latest point of route is equal to or close to destination (how close?)
- [ ] Legend with all the customers and shipments, highlight route on hover, a pinch of interactivity.
