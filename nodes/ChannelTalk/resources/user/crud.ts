import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserCreate = {
	resource: ['user'],
	operation: ['create'],
};

const showOnlyForUserGetByUserId = {
	resource: ['user'],
	operation: ['getByUserId'],
};

const showOnlyForUserGetByMemberId = {
	resource: ['user'],
	operation: ['getByMemberId'],
};

const showOnlyForUserUpdate = {
	resource: ['user'],
	operation: ['update'],
};

const showOnlyForUserUpsert = {
	resource: ['user'],
	operation: ['upsert'],
};

const showOnlyForUserDeleteByUserId = {
	resource: ['user'],
	operation: ['deleteByUserId'],
};

const showOnlyForUserDeleteByMemberId = {
	resource: ['user'],
	operation: ['deleteByMemberId'],
};

const jsonParseExpression = '={{$value ? JSON.parse($value) : undefined}}';

export const userCrudDescription: INodeProperties[] = [
	// Create user fields
	{
		displayName: 'Profile (JSON)',
		name: 'profileJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserCreate,
		},
		description:
			'JSON object containing user profile. Example: {"name": "John", "email": "john@example.com", "mobileNumber": "+821012345678"}.',
		routing: {
			send: {
				type: 'body',
				property: 'profile',
				value: jsonParseExpression,
			},
		},
	},
	// Get by userId fields
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserGetByUserId,
		},
		description: 'ID of the user to retrieve',
	},
	// Get by memberId fields
	{
		displayName: 'Member ID',
		name: 'memberId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserGetByMemberId,
		},
		description: 'Member ID of the user to retrieve',
	},
	// Update user fields
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserUpdate,
		},
		description: 'ID of the user to update',
	},
	{
		displayName: 'Profile (JSON)',
		name: 'profileJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		displayOptions: {
			show: showOnlyForUserUpdate,
		},
		description: 'JSON object containing user profile to update',
		routing: {
			send: {
				type: 'body',
				property: 'profile',
				value: jsonParseExpression,
			},
		},
	},
	{
		displayName: 'Profile Once (JSON)',
		name: 'profileOnceJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		displayOptions: {
			show: showOnlyForUserUpdate,
		},
		description: 'JSON object containing profile fields that are only set if not already present',
		routing: {
			send: {
				type: 'body',
				property: 'profileOnce',
				value: jsonParseExpression,
			},
		},
	},
	{
		displayName: 'Tags (JSON)',
		name: 'tagsJson',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForUserUpdate,
		},
		description: 'JSON array of tags. Example: ["tag1", "tag2"].',
		routing: {
			send: {
				type: 'body',
				property: 'tags',
				value: jsonParseExpression,
			},
		},
	},
	{
		displayName: 'Blocked',
		name: 'blocked',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForUserUpdate,
		},
		description: 'Whether the user is blocked',
		routing: {
			send: {
				type: 'body',
				property: 'blocked',
			},
		},
	},
	{
		displayName: 'Unsubscribe Email',
		name: 'unsubscribeEmail',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForUserUpdate,
		},
		description: 'Whether the user has unsubscribed from email',
		routing: {
			send: {
				type: 'body',
				property: 'unsubscribeEmail',
			},
		},
	},
	{
		displayName: 'Unsubscribe Texting',
		name: 'unsubscribeTexting',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForUserUpdate,
		},
		description: 'Whether the user has unsubscribed from texting',
		routing: {
			send: {
				type: 'body',
				property: 'unsubscribeTexting',
			},
		},
	},
	// Upsert user fields
	{
		displayName: 'Member ID',
		name: 'memberId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserUpsert,
		},
		description: 'Member ID of the user to create or update',
	},
	{
		displayName: 'Profile (JSON)',
		name: 'profileJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		displayOptions: {
			show: showOnlyForUserUpsert,
		},
		description: 'JSON object containing user profile',
		routing: {
			send: {
				type: 'body',
				property: 'profile',
				value: jsonParseExpression,
			},
		},
	},
	{
		displayName: 'Profile Once (JSON)',
		name: 'profileOnceJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		displayOptions: {
			show: showOnlyForUserUpsert,
		},
		description: 'JSON object containing profile fields that are only set if not already present',
		routing: {
			send: {
				type: 'body',
				property: 'profileOnce',
				value: jsonParseExpression,
			},
		},
	},
	{
		displayName: 'Tags (JSON)',
		name: 'tagsJson',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForUserUpsert,
		},
		description: 'JSON array of tags. Example: ["tag1", "tag2"].',
		routing: {
			send: {
				type: 'body',
				property: 'tags',
				value: jsonParseExpression,
			},
		},
	},
	{
		displayName: 'Blocked',
		name: 'blocked',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForUserUpsert,
		},
		description: 'Whether the user is blocked',
		routing: {
			send: {
				type: 'body',
				property: 'blocked',
			},
		},
	},
	{
		displayName: 'Unsubscribe Email',
		name: 'unsubscribeEmail',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForUserUpsert,
		},
		description: 'Whether the user has unsubscribed from email',
		routing: {
			send: {
				type: 'body',
				property: 'unsubscribeEmail',
			},
		},
	},
	{
		displayName: 'Unsubscribe Texting',
		name: 'unsubscribeTexting',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForUserUpsert,
		},
		description: 'Whether the user has unsubscribed from texting',
		routing: {
			send: {
				type: 'body',
				property: 'unsubscribeTexting',
			},
		},
	},
	// Delete by userId fields
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserDeleteByUserId,
		},
		description: 'ID of the user to delete',
	},
	// Delete by memberId fields
	{
		displayName: 'Member ID',
		name: 'memberId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserDeleteByMemberId,
		},
		description: 'Member ID of the user to delete',
	},
];
