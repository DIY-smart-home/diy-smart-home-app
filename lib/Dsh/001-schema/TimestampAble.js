'use strict';

Dsh.schema.TimestampAble = new SimpleSchema({
  createdAt: {
    type: Date,
    optional: true,
    denyUpdate: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    denyInsert: true,
    autoValue: function() {
      // TODO: Make it work somehow with the stupid $meteorObject watcher!
      return;
      if (this.isUpdate) {
        return new Date();
      }
    }
  }
});
