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
		description: 'The unique identifier of the user in Channel Talk to issue token for',
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
		description: 'Your service member ID of the user to issue token for',
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
		description: 'Your service member ID of the user to issue session JWT for',
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
			'Token expiration in ISO 8601 duration format. Must be between 1 minute (PT1M) and 30 days (P30D). Examples: PT1M (1 minute), PT30M (30 minutes), PT1H (1 hour), P1D (1 day), P7D (7 days).',
		routing: {
			send: {
				type: 'query',
				property: 'expiration',
			},
		},
	},
];
