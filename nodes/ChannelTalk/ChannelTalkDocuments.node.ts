import { type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { articleDescription } from './resources/document/article';
import { revisionDescription } from './resources/document/revision';
import { authorDescription } from './resources/document/author';
import { categoryDescription } from './resources/document/category';
import { topicDescription } from './resources/document/topic';
import { navigationDescription } from './resources/document/navigation';
import { spaceDescription } from './resources/document/space';
import { languageDescription } from './resources/document/language';

export class ChannelTalkDocuments implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Channel Talk Documents',
		name: 'channelTalkDocuments',
		icon: 'file:../../icons/channel-talk-primary.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Manage Channel Talk Documents (articles, revisions, topics, etc.)',
		defaults: {
			name: 'Channel Talk Documents',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'channelTalkApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://document-api.channel.io',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Article',
						value: 'article',
					},
					{
						name: 'Author',
						value: 'author',
					},
					{
						name: 'Category',
						value: 'category',
					},
					{
						name: 'Language',
						value: 'language',
					},
					{
						name: 'Navigation',
						value: 'navigation',
					},
					{
						name: 'Revision',
						value: 'revision',
					},
					{
						name: 'Space',
						value: 'space',
					},
					{
						name: 'Topic',
						value: 'topic',
					},
				],
				default: 'article',
			},
			...articleDescription,
			...revisionDescription,
			...authorDescription,
			...categoryDescription,
			...topicDescription,
			...navigationDescription,
			...spaceDescription,
			...languageDescription,
		],
	};
}
