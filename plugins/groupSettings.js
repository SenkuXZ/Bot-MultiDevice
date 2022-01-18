let groupsettings = async(q , conn, M) => {
  let isClose = { 
		'open': 'not_announcement',
		'close': 'announcement',
		'1': 'not_announcement',
		'0': 'announcement',
		'on': 'not_announcement',
		'off': 'announcement',
	}[(q || '')]
  if (isClose === undefined) return conn.send2Button(M.chat, '*Get to Open/Close Group!!*', "©Senkuu", "</Open", `!group open`, "</Close", `!group close`, M)
await conn.groupSettingUpdate(M.chat, isClose)
M.reply('Done!!')
}

module.exports = groupsettings
