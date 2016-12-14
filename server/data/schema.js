import {
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';
import {
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay';
import {
  Customer,
  Shipment,
  getCustomer,
  getShipment,
  getShipments,
  getTrackingEvents
} from './database';

const customerType = new GraphQLObjectType({
  name: 'Customer',
  description: 'A customer whose containers we are transporting',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: item => item._id
    },
    name: {
      type: GraphQLString,
      description: 'Full name of the customer',
      resolve: item => `${item.first_name} ${item.last_name}`
    },
    company: {
      type: GraphQLString,
      description: 'Company name of the customer',
      resolve: item => item.companyName
    }
  })
});

const containerType = new GraphQLObjectType({
  name: 'Container',
  description: 'A container going as part of shipment',
  fields: () => ({
    type: {
      type: GraphQLString,
      description: 'Type of the container'
    },
    number: {
      type: GraphQLString,
      description: 'Container number',
      resolve: item => item.containerNumber
    }
  })
});

const locationType = new GraphQLObjectType({
  name: 'Location',
  description: 'Location represented by latitude and longitude',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'Human-friendly name of the location'
    },
    latitude: {
      type: GraphQLFloat,
      description: 'Latitude of a tracking event'
    },
    longitude: {
      type: GraphQLFloat,
      description: 'Longitude of a tracking event'
    }
  })
});

const routePointType = new GraphQLObjectType({
  name: 'RoutePoint',
  description: 'Conjunction of point and time and location, point of a route',
  fields: () => ({
    date: {
      type: GraphQLString,
      description: 'Point in time',
      resolve: item => item.createdAt
    },
    latitude: {
      type: GraphQLFloat,
      resolve: item => item.location.coordinates[1]
    },
    longitude: {
      type: GraphQLFloat,
      resolve: item => item.location.coordinates[0]
    }
  })
});

const shipmentType = new GraphQLObjectType({
  name: 'Shipment',
  description: 'An actual shipment that consists of one or many containers',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: item => item._id
    },
    containers: {
      type: new GraphQLList(containerType),
      resolve: item => item.containers
    },
    customer: {
      type: customerType,
      description: 'Customer who ordered this container',
      resolve: item => getCustomer(item.customer_id)
    },
    origin: {
      type: locationType,
      description: 'Location of shipment origin',
      resolve: item => ({
        latitude: item.origin.location.coordinates[1],
        longitude: item.origin.location.coordinates[0]
      })
    },
    destination: {
      type: locationType,
      description: 'Location of shipment destination',
      resolve: item => ({
        latitude: item.destination.location.coordinates[1],
        longitude: item.destination.location.coordinates[0]
      })
    },
    route: {
      type: new GraphQLList(routePointType),
      resolve: item => getTrackingEvents(item._id)
    }
  })
});

const shipmentsType = new GraphQLObjectType({
  name: 'Shipments',
  description: 'A shipment with its route represented by tracking events',
  fields: () => ({
    shipments: {
      type: new GraphQLList(shipmentType),
      resolve: () => getShipments()
    }
  })
});

const definitions = nodeDefinitions((globalId) => {
  const {
    type,
    id
  } = fromGlobalId(globalId);

  if (type === 'Customer') {
    return getCustomer(id);
  } else if (type === 'Shipment') {
    return getShipment(id);
  } else if (type === 'Shipments') {
    return getShipments();
  }

  return null;
}, (obj) => {
  if (obj instanceof Customer) {
    return customerType;
  } else if (obj instanceof Shipment) {
    return shipmentType;
  }

  return null;
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      node: definitions.nodeField,
      viewer: {
        type: shipmentsType,
        resolve: () => getShipments()
      }
    })
  })
});
