# React + Relay + map example

There's a nice (but heavy) boilerplate out there:

```bash
git clone https://github.com/lvarayut/relay-fullstack.git
```

but for this particular example, the code is simplified as much as possible, and all unrelated modules are removed.

To make it work, you'll need three files placed in the root of this project folder:

- shipments.json,
- customers.json, and
- trackingEvents.json

(format: TBD, but you can guess from the schema)

## Leaflet

The map engine is Leaflet.

Reference to tile layer "Stamen.Watercolor" is generously provided by [Leaflet extras](https://leaflet-extras.github.io/leaflet-providers/preview/).

## TODO

- [ ] Add the map
- [ ] Place markers to the map
- [ ] Paint routes to current location of every shipment
