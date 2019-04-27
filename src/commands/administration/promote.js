const {
  Command,
} = require('discord.js-commando');
const promoteMember = require('./promote/member.js');
const promoteActif = require('./promote/actif.js');


const helper = '!promote <actif|member> <@user>';


class Promote extends Command {
  constructor(client) {
    super(client, {
      name: 'promote',
      group: 'administration',
      memberName: 'promote',
      description: 'Promote an user (need to be moderator or actif for member and moderator for actif)',
      examples: [helper],
      args: [
        {
          key: 'role',
          prompt: '**Which role do you want to use (member|actif) ?**',
          type: 'string',
        },
        {
          key: 'user',
          prompt: '**Which user do you want to promote (@user) ?**',
          type: 'user',
        },
      ],
    });
  }

  run(msg, { role }) {
    const params = {
      member: promoteMember,
      actif: promoteActif,
    };
    if (role === 'help' || role === 'h') {
      msg.reply(helper);
    }
    const paramsKeys = Object.keys(params);
    const user = msg.mentions.members.first();
    const commandKey = paramsKeys.find(key => key === role);
    if (commandKey) {
      params[commandKey](msg, user);
    } else {
      msg.reply(helper);
    }
  }
}

exports.default = Promote;
