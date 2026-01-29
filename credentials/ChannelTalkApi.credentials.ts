import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ChannelTalkApi implements ICredentialType {
	name = 'channelTalkApi';

	displayName = 'Channel Talk API';

	documentationUrl = 'https://developers.channel.io/docs/authentication-2';

	icon: ICredentialType['icon'] = 'file:../icons/channel-talk-primary.svg';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Key',
			name: 'accessKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
		{
			displayName: 'Access Secret',
			name: 'accessSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-access-key': '={{$credentials?.accessKey}}',
				'x-access-secret': '={{$credentials?.accessSecret}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.channel.io',
			url: '/open/v5/channel',
			method: 'GET',
		},
	};
}
