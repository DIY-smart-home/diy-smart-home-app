'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('dsh.services')

  .service('UserSession', [
    '$q',
    function ($q) {
      this.login = function (user) {
        var defer = $q.defer();
        Meteor.loginWithPassword(user.email, user.password, function (err) {
          if (err) {
            defer.reject(err);
            return;
          }

          defer.resolve();
        });
        return defer.promise;
      };

      this.logout = function () {
        var defer = $q.defer();
        Meteor.logout(function (err) {
          if (err) {
            defer.reject(err);
            return;
          }

          defer.resolve();
        });
        return defer.promise;
      };

      this.createUser = function (user) {
        var defer = $q.defer();
        Accounts.createUser({
          username: user.email,
          email: user.email,
          password: user.password,
          profile: user.profile
        }, function (err) {
          if (err) {
            defer.reject(err);
            return;
          }

          defer.resolve();
        });
        return defer.promise;
      };
    }
  ]);
