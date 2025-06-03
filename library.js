'use strict';

// אובייקט התוסף שיייצא בסוף
const User = require.main.require('./src/user');
const plugin = {};
plugin.addField = function(params, callback) {

	// 🟢 שדה נוסף: כתובת עסק
	const typeProfile = {
		label: 'סוג משתמש',
		html: `<div class="form-group"><div id="explanation" style="border:1px solid #ccc; padding:8px; margin-top:10px;">בחר אם ברצונך להירשם כעסק או כאדם פרטי.</div><label style="margin-right:10px;"><input type="radio" name="typeProfile" value="business"> רישום כעסק</label><label style="margin-right:10px;"><input type="radio" name="typeProfile" value="private"> רישום כאדם פרטי</label></div>`
	};

	// 🧩 הוספת השדות לתוך הטופס
	if (params.templateData.regFormEntry && Array.isArray(params.templateData.regFormEntry)) {
		params.templateData.regFormEntry.push(typeProfile);
	}

	callback(null, params);
};

plugin.checkRegister = function(params, callback) {
	// ✅ בדיקה של שדות חדשים
	if (!params.req.body['typeProfile']) {
		return callback({ source: 'typeProfile', message: 'יש לבחור את סוג הפרופיל.' }, params);
	}

	callback(null, params);
};
plugin.saveTypeProfile = async function (user, data) {
	if (user.data.typeProfile !== undefined) {
		await User.setUserField(user.user.uid, 'typeProfile', user.data.typeProfile);
	};
};
plugin.addUserFieldWhite = async ({ uids, whitelist }) => {
	whitelist.push('typeProfile');
  return { uids, whitelist };
};

module.exports = plugin;
