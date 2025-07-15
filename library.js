'use strict';

// Plugin object to be exported
const User = require.main.require('./src/user');
const plugin = {};

plugin.addField = function(params, callback) {
	// 🟢 Additional field: User Type
	const typeProfile = {
		label: 'User Type',
		html: `
			<div class="form-group">
				<div id="explanation" style="border:1px solid #ccc; padding:8px; margin-top:10px;">
					Select whether you are registering as an organization or as an individual.
				</div>
				<label style="margin-right:10px;">
					<input type="radio" name="typeProfile" value="business"> Register as an Organization
				</label>
				<label style="margin-right:10px;">
					<input type="radio" name="typeProfile" value="private"> Register as an Individual
				</label>
			</div>`
	};

	// 🧩 Add the field to the registration form
	if (params.templateData.regFormEntry && Array.isArray(params.templateData.regFormEntry)) {
		params.templateData.regFormEntry.push(typeProfile);
	}

	callback(null, params);
};

plugin.checkRegister = function(params, callback) {
	// ✅ Validate the new field
	if (!params.req.body['typeProfile']) {
		return callback({ source: 'typeProfile', message: 'Please choose a profile type.' }, params);
	}

	callback(null, params);
};

plugin.saveTypeProfile = async function(user, data) {
	if (user.data.typeProfile !== undefined) {
		await User.setUserField(user.user.uid, 'typeProfile', user.data.typeProfile);
	}
};

plugin.addUserFieldWhite = async ({ uids, whitelist }) => {
	whitelist.push('typeProfile');
	return { uids, whitelist };
};

module.exports = plugin;
