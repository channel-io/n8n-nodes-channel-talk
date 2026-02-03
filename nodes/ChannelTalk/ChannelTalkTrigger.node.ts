import type {
	IDataObject,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { channelTalkApiRequest } from './shared/transport';

interface ChannelTalkWebhook {
	id: string;
	name: string;
	url: string;
	scopes: string[];
	apiVersion: string;
}

interface WebhookListResponse {
	webhooks: ChannelTalkWebhook[];
	next?: string;
}

export class ChannelTalkTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Channel Talk Trigger',
		name: 'channelTalkTrigger',
		icon: 'file:../../icons/channel-talk-primary.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"]}}',
		description: 'Starts the workflow when Channel Talk events occur',
		defaults: {
			name: 'Channel Talk Trigger',
		},
		usableAsTool: true,
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'channelTalkApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: '',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'All Events',
						value: '*',
					},
					{
						name: 'Lead Deleted',
						value: 'lead.deleted',
					},
					{
						name: 'Lead Upserted (Contact)',
						value: 'lead.upserted.contact',
					},
					{
						name: 'Lead Upserted (Subscription)',
						value: 'lead.upserted.subscription',
					},
					{
						name: 'Member Deleted',
						value: 'member.deleted',
					},
					{
						name: 'Member Upserted (Contact)',
						value: 'member.upserted.contact',
					},
					{
						name: 'Member Upserted (Subscription)',
						value: 'member.upserted.subscription',
					},
					{
						name: 'Message Created (Team Chat)',
						value: 'message.created.teamChat',
					},
					{
						name: 'Message Created (User Chat)',
						value: 'message.created.userChat',
					},
					{
						name: 'User Chat Opened',
						value: 'userChat.opened',
					},
				],
				default: ['*'],
				required: true,
				description: 'The events to listen to',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');

				// Check if we have a stored webhook ID
				if (webhookData.webhookId) {
					try {
						// Verify the webhook still exists
						await channelTalkApiRequest.call(
							this,
							'GET',
							`/open/v5/webhooks/${webhookData.webhookId}`,
						);
						return true;
					} catch {
						// Webhook no longer exists, clear the stored ID
						delete webhookData.webhookId;
					}
				}

				// List all webhooks and check if one matches our URL
				let next: string | undefined;
				do {
					const qs: IDataObject = { limit: 500 };
					if (next) {
						qs.since = next;
					}

					const response = (await channelTalkApiRequest.call(
						this,
						'GET',
						'/open/v5/webhooks',
						qs,
					)) as WebhookListResponse;

					const existingWebhook = response.webhooks?.find((w) => w.url === webhookUrl);
					if (existingWebhook) {
						webhookData.webhookId = existingWebhook.id;
						return true;
					}

					next = response.next;
				} while (next);

				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const events = this.getNodeParameter('events') as string[];
				const webhookData = this.getWorkflowStaticData('node');

				const body: IDataObject = {
					name: `n8n-${this.getWorkflow().id}`,
					url: webhookUrl,
					scopes: events,
					apiVersion: 'v5',
				};

				const response = (await channelTalkApiRequest.call(
					this,
					'POST',
					'/open/v5/webhooks',
					{},
					body,
				)) as { webhook: ChannelTalkWebhook };

				if (response.webhook?.id) {
					webhookData.webhookId = response.webhook.id;
					return true;
				}

				return false;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId) {
					try {
						await channelTalkApiRequest.call(
							this,
							'DELETE',
							`/open/v5/webhooks/${webhookData.webhookId}`,
						);
					} catch {
						// Ignore errors if webhook doesn't exist
					}
					delete webhookData.webhookId;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const events = this.getNodeParameter('events') as string[];

		// If specific events are configured (not '*'), filter incoming events
		if (!events.includes('*')) {
			const incomingEvent = bodyData.event as string;
			if (!events.includes(incomingEvent)) {
				// Event not in the configured list, ignore it
				return {
					noWebhookResponse: true,
				};
			}
		}

		return {
			workflowData: [this.helpers.returnJsonArray(bodyData)],
		};
	}
}
