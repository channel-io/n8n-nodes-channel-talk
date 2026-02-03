import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTeamChatCreateMessageByName = {
	resource: ['teamChat'],
	operation: ['createMessagePlainTextByName', 'createMessageBlocksByName'],
};

const showOnlyForTeamChatCreateMessagePlainTextByName = {
	resource: ['teamChat'],
	operation: ['createMessagePlainTextByName'],
};

const showOnlyForTeamChatCreateMessageBlocksByName = {
	resource: ['teamChat'],
	operation: ['createMessageBlocksByName'],
};

const jsonParseExpression = '={{$value ? JSON.parse($value) : undefined}}';
const optionsValueExpression =
	'={{(() => { const value = $value; if (Array.isArray(value)) { const filtered = value.filter((option) => option !== ""); return filtered.length ? filtered : undefined; } return value ? [value] : undefined; })()}}';

export const teamChatCreateMessageByNameDescription: INodeProperties[] = [
	{
		displayName: 'Group Name',
		name: 'groupName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamChatCreateMessageByName,
		},
		description: 'The name of the group (without @ prefix)',
	},
	{
		displayName: 'Bot Name',
		name: 'botName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForTeamChatCreateMessageByName,
		},
		description: 'Name of the bot sending the message',
		routing: {
			send: {
				type: 'query',
				property: 'botName',
			},
		},
	},
	{
		displayName: 'Plain Text',
		name: 'plainText',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamChatCreateMessagePlainTextByName,
		},
		description: 'Plain text message',
		routing: {
			send: {
				type: 'body',
				property: 'plainText',
			},
		},
	},
	{
		displayName: 'Blocks (JSON)',
		name: 'blocksJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamChatCreateMessageBlocksByName,
		},
		description: 'JSON array of message blocks',
		routing: {
			send: {
				type: 'body',
				property: 'blocks',
				value: jsonParseExpression,
			},
		},
	},
	{
		displayName: 'Buttons (JSON)',
		name: 'buttonsJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		displayOptions: {
			show: showOnlyForTeamChatCreateMessageByName,
		},
		description: 'JSON array of message buttons',
		routing: {
			send: {
				type: 'body',
				property: 'buttons',
				value: jsonParseExpression,
			},
		},
	},
	{
		displayName: 'Files (JSON)',
		name: 'filesJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		displayOptions: {
			show: showOnlyForTeamChatCreateMessageByName,
		},
		description: 'JSON array of message files',
		routing: {
			send: {
				type: 'body',
				property: 'files',
				value: jsonParseExpression,
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: showOnlyForTeamChatCreateMessageByName,
		},
		options: [
			{ name: 'Do Not Post', value: 'doNotPost' },
			{ name: 'Do Not Search', value: 'doNotSearch' },
			{ name: 'Immutable', value: 'immutable' },
			{ name: 'None', value: '' },
			{ name: 'Silent', value: 'silent' },
		],
		description: 'Message options to apply',
		routing: {
			send: {
				type: 'body',
				property: 'options',
				value: optionsValueExpression,
			},
		},
	},
	{
		displayName: 'Request ID',
		name: 'requestId',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForTeamChatCreateMessageByName,
		},
		description: 'Idempotency key for the message request',
		routing: {
			send: {
				type: 'body',
				property: 'requestId',
			},
		},
	},
];
