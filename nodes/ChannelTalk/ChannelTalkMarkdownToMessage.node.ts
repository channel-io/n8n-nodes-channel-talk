import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { parseMarkdownToChannelTalk, type ButtonColor, type ParseOptions } from './shared/markdownParser';

export class ChannelTalkMarkdownToMessage implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Channel Talk Markdown To Message',
		name: 'channelTalkMarkdownToMessage',
		icon: 'file:../../icons/channel-talk-primary.svg',
		group: ['transform'],
		version: 1,
		subtitle: 'Convert Markdown to Blocks/Buttons',
		description: 'Convert markdown text to Channel Talk blocks and buttons format',
		defaults: {
			name: 'Channel Talk Markdown To Message',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Markdown',
				name: 'markdown',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				default: '',
				required: true,
				description: 'The markdown text to convert to Channel Talk message format',
				placeholder: `# Hello
- Item 1
- Item 2
\`\`\`javascript
console.log('Hello');
\`\`\`
[Click here](https://example.com)
[Green Button:green](https://example.com)`,
			},
			{
				displayName: 'Output Format',
				name: 'outputFormat',
				type: 'options',
				options: [
					{
						name: 'Object',
						value: 'object',
						description: 'Return as JavaScript object',
					},
					{
						name: 'JSON String',
						value: 'jsonString',
						description: 'Return as JSON string',
					},
				],
				default: 'object',
				description: 'The format of the output',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Default Button Color',
						name: 'defaultButtonColor',
						type: 'options',
						options: [
							{ name: 'Black', value: 'black' },
							{ name: 'Cobalt (Default)', value: 'cobalt' },
							{ name: 'Green', value: 'green' },
							{ name: 'Orange', value: 'orange' },
							{ name: 'Pink', value: 'pink' },
							{ name: 'Purple', value: 'purple' },
							{ name: 'Red', value: 'red' },
						],
						default: 'cobalt',
						description: 'Default color for buttons without explicit color specification',
					},
					{
						displayName: 'Preserve Markdown in Headers',
						name: 'preserveMarkdown',
						type: 'boolean',
						default: true,
						description: 'Whether to keep the # symbols in header text',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const markdown = this.getNodeParameter('markdown', itemIndex, '') as string;
				const outputFormat = this.getNodeParameter('outputFormat', itemIndex, 'object') as string;
				const options = this.getNodeParameter('options', itemIndex, {}) as {
					defaultButtonColor?: ButtonColor;
					preserveMarkdown?: boolean;
				};

				const parseOptions: ParseOptions = {
					defaultButtonColor: options.defaultButtonColor,
					preserveMarkdown: options.preserveMarkdown ?? true,
				};

				const result = parseMarkdownToChannelTalk(markdown, parseOptions);

				if (outputFormat === 'jsonString') {
					returnData.push({
						json: {
							blocks: JSON.stringify(result.blocks),
							buttons: JSON.stringify(result.buttons),
						},
						pairedItem: { item: itemIndex },
					});
				} else {
					returnData.push({
						json: result,
						pairedItem: { item: itemIndex },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message,
						},
						pairedItem: { item: itemIndex },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
