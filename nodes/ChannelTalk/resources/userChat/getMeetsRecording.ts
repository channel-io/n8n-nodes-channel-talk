import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatGetMeetsRecording = {
	resource: ['userChat'],
	operation: ['getMeetsRecording'],
};

export const userChatGetMeetsRecordingDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGetMeetsRecording,
		},
		description: 'ID of the user chat to be accessed',
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGetMeetsRecording,
		},
		description: 'ID of the meet message',
	},
];
