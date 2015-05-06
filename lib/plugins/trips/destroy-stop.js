'use strict';

var Trip = require('../../models/trip');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'DELETE',
    path: '/trips/{tripId}/stops/{stopId}',
    config: {
      description: 'Delete a stop from a trip',
      validate: {
        params: {
          tripId: Joi.string().length(24).required(),
          stopId: Joi.string().length(24).required()
        }
      },
      handler: function(request, reply){
        Trip.findByIdAndUpdate(request.params.tripId, {$pull: { stops: {_id: request.params.stopId}}}, function(){
          return reply({stopId: request.params.stopId});
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'trips.destroy-stop'
};
