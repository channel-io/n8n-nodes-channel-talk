import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserTokenByUserId = {
	resource: ['user'],
	operation: ['issueUserToken'],
};

const showOnlyForUserTokenByMemberId = {
	resource: ['user'],
	operation: ['issueUserTokenByMemberId'],
};

const showOnlyForSessionJwt = {
	resource: ['user'],
	operation: ['issueSessionJwt'],
};

export const userTokenDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserTokenByUserId,
		},
		description: 'ID of the user to issue token for',
	},
	{
		displayName: 'Member ID',
		name: 'memberId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserTokenByMemberId,
		},
		description: 'Member ID of the user to issue token for',
	},
	{
		displayName: 'Member ID',
		name: 'memberId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForSessionJwt,
		},
		description: 'Member ID of the user to issue session JWT for',
	},
	{
		displayName: 'Expiration',
		name: 'expiration',
		type: 'string',
		default: 'PT1M',
		displayOptions: {
			show: showOnlyForSessionJwt,
		},
		description:
			'Token expiration in ISO 8601 duration format. Must be between 1 minute and 30 days. Default is 1 minute (PT1M).',
		routing: {
			send: {
				type: 'query',
				property: 'expiration',
			},
		},
	},
];
