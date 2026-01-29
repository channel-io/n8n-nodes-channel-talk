import type { INodeProperties } from 'n8n-workflow';

const showOnlyForMessageCreate = {
	resource: ['message'],
	operation: ['createPlainText', 'createBlocks'],
};

const showOnlyForMessageCreatePlainText = {
	resource: ['message'],
	operation: ['createPlainText'],
};

const showOnlyForMessageCreateBlocks = {
	resource: ['message'],
	operation: ['createBlocks'],
};

const jsonParseExpression = '={{$value ? JSON.parse($value) : undefined}}';
const optionsValueExpression =
	'={{(() => { const value = $value; if (Array.isArray(value)) { const filtered = value.filter((option) => option !== ""); return filtered.length ? filtered : undefined; } return value ? [value] : undefined; })()}}';

export const messageCreateDescription: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForMessageCreate,
		},
		description: 'ID of the group (chat) to send the message to',
	},
	{
		displayName: 'Bot Name',
		name: 'botName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForMessageCreate,
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
		displayOptions: {
			show: showOnlyForMessageCreatePlainText,
		},
		required: true,
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
		displayOptions: {
			show: showOnlyForMessageCreateBlocks,
		},
		required: true,
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
			show: showOnlyForMessageCreate,
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
			show: showOnlyForMessageCreate,
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
		displayName: 'Web Page (JSON)',
		name: 'webPageJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		displayOptions: {
			show: showOnlyForMessageCreate,
		},
		description: 'JSON object for a web page attachment',
		routing: {
			send: {
				type: 'body',
				property: 'webPage',
				value: jsonParseExpression,
			},
		},
	},
	{
		displayName: 'Form (JSON)',
		name: 'formJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		displayOptions: {
			show: showOnlyForMessageCreate,
		},
		description: 'JSON object for a form attachment',
		routing: {
			send: {
				type: 'body',
				property: 'form',
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
			show: showOnlyForMessageCreate,
		},
		options: [
			{ name: 'Act As Manager', value: 'actAsManager' },
			{ name: 'Display As Channel', value: 'displayAsChannel' },
			{ name: 'Do Not Post', value: 'doNotPost' },
			{ name: 'Do Not Search', value: 'doNotSearch' },
			{ name: 'Do Not Send App', value: 'doNotSendApp' },
			{ name: 'Do Not Update Desk', value: 'doNotUpdateDesk' },
			{ name: 'Immutable', value: 'immutable' },
			{ name: 'None', value: '' },
			{ name: 'Private', value: 'private' },
			{ name: 'Silent', value: 'silent' },
			{ name: 'Silent To Manager', value: 'silentToManager' },
			{ name: 'Silent To User', value: 'silentToUser' },
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
			show: showOnlyForMessageCreate,
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
