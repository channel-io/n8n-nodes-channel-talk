import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTeamChatCreateMessage = {
	resource: ['teamChat'],
	operation: ['createMessagePlainText', 'createMessageBlocks'],
};

const showOnlyForTeamChatCreateMessagePlainText = {
	resource: ['teamChat'],
	operation: ['createMessagePlainText'],
};

const showOnlyForTeamChatCreateMessageBlocks = {
	resource: ['teamChat'],
	operation: ['createMessageBlocks'],
};

const jsonParseExpression = '={{$value ? JSON.parse($value) : undefined}}';
const optionsValueExpression =
	'={{(() => { const value = $value; if (Array.isArray(value)) { const filtered = value.filter((option) => option !== ""); return filtered.length ? filtered : undefined; } return value ? [value] : undefined; })()}}';

export const teamChatCreateMessageDescription: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamChatCreateMessage,
		},
		description: 'ID of the group to send the message to',
	},
	{
		displayName: 'Bot Name',
		name: 'botName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForTeamChatCreateMessage,
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
			show: showOnlyForTeamChatCreateMessagePlainText,
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
			show: showOnlyForTeamChatCreateMessageBlocks,
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
			show: showOnlyForTeamChatCreateMessage,
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
			show: showOnlyForTeamChatCreateMessage,
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
			show: showOnlyForTeamChatCreateMessage,
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
			show: showOnlyForTeamChatCreateMessage,
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
