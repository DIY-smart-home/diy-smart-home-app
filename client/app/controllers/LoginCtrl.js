'use strict';

/* Controllers */
angular.module('dsh.controllers').
  controller('LoginCtrl', [
    '$scope', 'UserSession', '$state',
    function ($scope, UserSession, $state) {
      var me = this;

      this.submit = function submit() {
        UserSession.login(me.user).
          then(
            function () {
            },
            function (err) {
              me.errorMsg = err.reason;
              me.user.password = '';
              //$('.ui.form').form('validate form');
            });
      };

      this.createUser = function () {
        if (!me.user) {
          return;
        }
        UserSession.createUser({
          username: me.user.email,
          email: me.user.email,
          password: me.user.password,
          profile: {
            name: me.user.name || String(me.user.email).split('@')[0]
          }
        }).then(
            function () {
              alert('Successfully created user ' + me.user.email);
            },
            function (err) {
              me.errorMsg = err.reason;
              me.user.email = '';
              me.user.password = '';
              //$('.ui.form').form('validate form');
            });
      };

      //$('.ui.form').form({
      //  email: {
      //    identifier: 'email',
      //    rules: [
      //      {
      //        type: 'email',
      //        prompt: 'Please enter a valid email.'
      //      }
      //    ]
      //  },
      //  password: {
      //    identifier: 'password',
      //    rules: [
      //      {
      //        type: 'length[6]',
      //        prompt: 'Your password should be at least 6 characters long.'
      //      }
      //    ]
      //  }
      //},
      //{
      //  on: 'submit',
      //  inline: 'true',
      //  onSuccess: this.submit
      //});

      this.createAnonymousUser = function () {
        if (!me.user || !me.user.profile || !me.user.profile.name) {
          return;
        }
        UserSession.createUser({
          username: (new Date()) + '@dsh.local',
          email: (new Date()) + '@dsh.local',
          password: (new Date()) + '@dsh.local',
          profile: {
            name: me.user.profile.name
          }
        }).then(
          function () {
            $state.go('dev');
            console.log(['Successfully created user: ', me.user]);
          },
          function (err) {
            me.errorMsg = err.reason;
            me.user.email = '';
            me.user.password = '';
            //$('.ui.form').form('validate form');
          });
      };
    }]);
