import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatUpdate = {
	resource: ['userChat'],
	operation: ['update'],
};

export const userChatUpdateDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatUpdate,
		},
		description: 'ID of the user chat to be accessed',
	},
	{
		displayName: 'Send Body',
		name: 'sendBody',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: showOnlyForUserChatUpdate,
		},
		description: 'Whether to send a request body (JSON with description)',
	},
	{
		displayName: 'Body Parameters',
		name: 'requestBody',
		type: 'collection',
		placeholder: 'Add body field',
		default: {},
		displayOptions: {
			show: showOnlyForUserChatUpdate,
			hide: {
				sendBody: [false],
			},
		},
		description: 'Request body as JSON. Keys and values below are sent as body.',
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'User chat description',
			},
		],
	},
];
