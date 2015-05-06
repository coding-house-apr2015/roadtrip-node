'use strict';

var Trip = require('../../models/trip');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'DELETE',
    path: '/trips/{tripId}',
    config: {
      description: 'Delete a trip',
      validate: {
        params: {
          tripId: Joi.string().length(24).required()
        }
      },
      handler: function(request, reply){
        Trip.findByIdAndRemove(request.params.tripId, function(err, trip){
          return reply(trip);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'trips.destroy'
};
