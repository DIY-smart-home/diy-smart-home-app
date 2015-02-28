'use strict';

/**
 * Define Collection
 * @type {Mongo.Collection}
 */
Dsh.collection.Dev = new Mongo.Collection('dev');

Dsh.schema.Dev = new SimpleSchema([
  Dsh.schema.TimestampAble,
  {
    status: {
      type: String,
      label: 'Status',
      allowedValues: ['waiting', 'ingame', 'finished', 'canceled'],
      autoValue: function() {
        if (this.isInsert) {
          return Dsh.enum.GameboardStatuses.waiting;
        }
        //console.log(this, arguments, this.field('status'), Dsh.collection.Dev.findOne(this.docId));
      }
    },
    hostUserId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      optional: true,
      autoValue: function() {
        if (this.isInsert && !this.isFromTrustedCode) {
          return this.userId;
        }
        if (this.isUpdate && !this.isFromTrustedCode) {
          this.unset();
        }
      }
    },
    gameboardTemplateId: {
      type: String,
      optional: true,
      defaultValue: 'greenHills',
      allowedValues: ['greenHills'] // Dsh.collection.GameboardsTemplates.find({}, {fields: {_id: 1}}).fetch()
    },
    name: {
      type: String,
      label: 'name',
      max: 255
    },
    isLocal: {
      type: Boolean,
      label: 'Is Local',
      optional: true,
      autoValue: function() {
        var isLocal = this.field('isLocal');
        if (typeof isLocal.value === 'undefined') {
          return true;
        }
      }
    },
    finishedAt: {
      type: Date,
      optional: true,
      denyInsert: true,
      autoValue: function() {
        if (this.isUpdate) {
          var status = this.field('status');
          if (status.value === Dsh.enum.GameboardStatuses.finished) {
            return new Date();
          }
        }
      }
    }
  }
]);

Dsh.collection.Dev.attachSchema(Dsh.schema.Dev);

Dsh.collection.Dev.after.remove(function (userId, doc) {
  Dsh.collection.Players.remove({
    gameboardId: doc._id
  });
  Dsh.collection.GameboardsFields.remove({
    gameboardId: doc._id
  });
});

if (Meteor.isServer) {
  Dsh.collection.Dev.after.update(function (userId, gameboard/*, fieldNames, modifier, options*/) {
    if (gameboard.status === Dsh.enum.GameboardStatuses.ingame && this.previous.status === Dsh.enum.GameboardStatuses.waiting) {
      Dsh.collection.GameboardsFields.createForGameboard(gameboard);
    }
  });
}


// TODO: Fix permissions!
//Dsh.collection.Dev.allow({
//  insert: false,
//  update: false,
//  remove: false
//});

