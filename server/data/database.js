import _ from 'lodash';
import customers from '../../customers.json';
import shipments from '../../shipments.json';
import trackingEvents from '../../trackingEvents.json';

export class Customer {
  constructor(id, name, company) {
    this.id = id;
    this.name = name;
    this.company = company;
  }
}

export class Shipment {
  constructor() {

  }
}

export function getCustomer(id) {
  return _.find(customers, x => x._id === id);
}

export function getCustomers() {
  return customers;
}

export function getShipments() {
  return shipments.map(shipment => ({
    ...shipment,
    route: _.filter(trackingEvents, x => x.shipment_id === shipment._id)
  }));
}

export function getShipment(id) {
  return _.find(getShipments(), x => x._id === id);
}

export function getTrackingEvent(id) {
  return _.find(trackingEvents, x => x._id === id);
}

export function getTrackingEvents(id) {
  if (!id) {
    return trackingEvents;
  }

  return _.filter(trackingEvents, x => x.shipment_id === id);
}
