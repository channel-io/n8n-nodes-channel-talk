import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatInvite = {
	resource: ['userChat'],
	operation: ['invite'],
};

export const userChatInviteDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatInvite,
		},
		description: 'ID of the user chat to be accessed',
	},
	{
		displayName: 'Bot Name',
		name: 'botName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatInvite,
		},
		description: 'Name of the bot that invites the managers (sent as query param in URL)',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: showOnlyForUserChatInvite,
		},
		options: [
			{
				displayName: 'Manager IDs',
				name: 'managerIds',
				type: 'string',
				default: '',
				description:
					'Comma-separated manager IDs to invite (e.g. 166211, 589203). Sent as repeated query params: managerIds=166211&managerIds=589203',
			},
		],
	},
];
