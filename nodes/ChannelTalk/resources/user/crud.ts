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

// Tags JSON 배열 파싱 및 최대 20개 제한 적용
// 배열이 아니면 무시, 문자열이 아닌 요소도 필터링
const tagsJsonArrayExpression =
	'={{$value ? (() => { const arr = JSON.parse($value); return Array.isArray(arr) ? arr.filter(t => typeof t === "string").slice(0, 20) : undefined; })() : undefined}}';

const profileDescription = `JSON object containing user profile fields.
Available fields: name, email, mobileNumber (E.164 format like +821012345678), avatarUrl, firstName, lastName, landlineNumber, recentPurchaseCount (integer), recentPurchaseAmount (number).
Custom fields are also allowed.
Example: {"name": "John", "email": "john@example.com", "mobileNumber": "+821012345678"}.`;

const profileOnceDescription = `JSON object containing profile fields that are only set if the field is not already present.
Use this for default values that should not overwrite existing data.
Same fields as Profile are available.`;

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
		description: profileDescription,
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
		description: 'The unique identifier of the user in Channel Talk',
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
		description: 'Your service member ID that you assigned to the user',
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
		description: 'The unique identifier of the user to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForUserUpdate,
		},
		options: [
			{
				displayName: 'Blocked',
				name: 'blocked',
				type: 'boolean',
				default: false,
				description: 'Whether the user is blocked from sending messages',
				routing: {
					send: {
						type: 'body',
						property: 'blocked',
					},
				},
			},
			{
				displayName: 'Profile (JSON)',
				name: 'profileJson',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: profileDescription,
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
				description: profileOnceDescription,
				routing: {
					send: {
						type: 'body',
						property: 'profileOnce',
						value: jsonParseExpression,
					},
				},
			},
			{
				displayName: 'Tags (JSON Array)',
				name: 'tagsJson',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description:
					'JSON array of tag strings to assign to the user. Maximum 20 tags allowed. Non-string values will be filtered out. Example: ["vip", "premium", "active"].',
				routing: {
					send: {
						type: 'body',
						property: 'tags',
						value: tagsJsonArrayExpression,
					},
				},
			},
			{
				displayName: 'Unsubscribe Email',
				name: 'unsubscribeEmail',
				type: 'boolean',
				default: false,
				description: 'Whether the user has opted out of receiving marketing emails',
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
				description: 'Whether the user has opted out of receiving marketing text messages',
				routing: {
					send: {
						type: 'body',
						property: 'unsubscribeTexting',
					},
				},
			},
		],
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
		description:
			'Your service member ID. If a user with this ID exists, it will be updated; otherwise, a new user will be created.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForUserUpsert,
		},
		options: [
			{
				displayName: 'Blocked',
				name: 'blocked',
				type: 'boolean',
				default: false,
				description: 'Whether the user is blocked from sending messages',
				routing: {
					send: {
						type: 'body',
						property: 'blocked',
					},
				},
			},
			{
				displayName: 'Profile (JSON)',
				name: 'profileJson',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: profileDescription,
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
				description: profileOnceDescription,
				routing: {
					send: {
						type: 'body',
						property: 'profileOnce',
						value: jsonParseExpression,
					},
				},
			},
			{
				displayName: 'Tags (JSON Array)',
				name: 'tagsJson',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description:
					'JSON array of tag strings to assign to the user. Maximum 20 tags allowed. Non-string values will be filtered out. Example: ["vip", "premium", "active"].',
				routing: {
					send: {
						type: 'body',
						property: 'tags',
						value: tagsJsonArrayExpression,
					},
				},
			},
			{
				displayName: 'Unsubscribe Email',
				name: 'unsubscribeEmail',
				type: 'boolean',
				default: false,
				description: 'Whether the user has opted out of receiving marketing emails',
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
				description: 'Whether the user has opted out of receiving marketing text messages',
				routing: {
					send: {
						type: 'body',
						property: 'unsubscribeTexting',
					},
				},
			},
		],
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
		description: 'The unique identifier of the user to delete',
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
		description: 'Your service member ID of the user to delete',
	},
];
