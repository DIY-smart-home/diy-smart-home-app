Dsh.collection.testCollection = new Mongo.Collection('testCollection');

Dsh.schema.testCollection = new SimpleSchema([
  Dsh.schema.TimestampAble,
  {
    topic: {
      type: String,
      label: 'topic'
    },
    message: {
      type: String,
      label: 'message',
      max: 255
    }
  }
]);

Dsh.collection.Dev.attachSchema(Dsh.schema.testCollection);


if (Meteor.isServer) {

}