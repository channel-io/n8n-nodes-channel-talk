/**
 * Channel Talk Markdown to Blocks/Buttons Parser
 *
 * Converts markdown text to Channel Talk API's blocks and buttons format.
 */

// ============================================================================
// Types
// ============================================================================

export type ButtonColor = 'cobalt' | 'green' | 'orange' | 'red' | 'black' | 'pink' | 'purple';

export interface TextBlock {
	type: 'text';
	value: string;
}

export interface CodeBlock {
	type: 'code';
	language: string;
	value: string;
}

export interface BulletsBlock {
	type: 'bullets';
	blocks: TextBlock[];
}

export type ChannelTalkBlock = TextBlock | CodeBlock | BulletsBlock;

export interface WebAction {
	type: 'web';
	url: string;
}

export interface CommandAction {
	type: 'command';
	command: string;
}

export interface WamAction {
	type: 'wam';
	appId: string;
	name: string;
	wamArgs?: Record<string, unknown>;
}

export type ButtonAction = WebAction | CommandAction | WamAction;

export interface ChannelTalkButton {
	title: string;
	color?: ButtonColor;
	action: ButtonAction;
}

export interface ParseResult {
	blocks: ChannelTalkBlock[];
	buttons: ChannelTalkButton[];
	[key: string]: ChannelTalkBlock[] | ChannelTalkButton[];
}

export interface ParseOptions {
	defaultButtonColor?: ButtonColor;
	preserveMarkdown?: boolean;
}

// ============================================================================
// Constants
// ============================================================================

const VALID_BUTTON_COLORS: ButtonColor[] = [
	'cobalt',
	'green',
	'orange',
	'red',
	'black',
	'pink',
	'purple',
];

const CODE_BLOCK_REGEX = /^```(\w*)\s*\n?([\s\S]*?)```$/m;
const BUTTON_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;
const BUTTON_WITH_COLOR_REGEX = /^(.+?):(\w+)$/;
const LIST_ITEM_REGEX = /^[\t ]*[-*+]\s+(.+)$/;
const HEADER_REGEX = /^(#{1,6})\s+(.+)$/;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Parses a button URL and returns the appropriate action
 */
function parseButtonAction(url: string): ButtonAction {
	// Command action: action://command
	if (url.startsWith('action://')) {
		return {
			type: 'command',
			command: url.slice('action://'.length),
		};
	}

	// WAM action: wam://appId/name or wam://appId/name?args
	if (url.startsWith('wam://')) {
		const wamPath = url.slice('wam://'.length);
		const [pathPart, queryPart] = wamPath.split('?');
		const [appId, ...nameParts] = pathPart.split('/');
		const name = nameParts.join('/') || '';

		const action: WamAction = {
			type: 'wam',
			appId,
			name,
		};

		// Parse query string as wamArgs if present
		if (queryPart) {
			const wamArgs: Record<string, string> = {};
			const pairs = queryPart.split('&');
			for (const pair of pairs) {
				const [key, value] = pair.split('=');
				if (key) {
					wamArgs[decodeURIComponent(key)] = decodeURIComponent(value || '');
				}
			}
			if (Object.keys(wamArgs).length > 0) {
				action.wamArgs = wamArgs;
			}
		}

		return action;
	}

	// Default: Web action
	return {
		type: 'web',
		url,
	};
}

/**
 * Parses button title for color specification
 * Format: "title:color" or just "title"
 */
function parseButtonTitle(
	title: string,
	defaultColor?: ButtonColor,
): { title: string; color?: ButtonColor } {
	const match = title.match(BUTTON_WITH_COLOR_REGEX);
	if (match) {
		const [, buttonTitle, colorStr] = match;
		const color = colorStr.toLowerCase() as ButtonColor;
		if (VALID_BUTTON_COLORS.includes(color)) {
			return { title: buttonTitle, color };
		}
	}
	return { title, color: defaultColor };
}

/**
 * Extracts buttons from markdown text and returns text without button syntax
 */
function extractButtons(
	text: string,
	defaultColor?: ButtonColor,
): { text: string; buttons: ChannelTalkButton[] } {
	const buttons: ChannelTalkButton[] = [];
	let cleanText = text;
	let match: RegExpExecArray | null;

	// Reset regex lastIndex
	BUTTON_REGEX.lastIndex = 0;

	// Find all button patterns
	const buttonMatches: Array<{ full: string; title: string; url: string }> = [];
	while ((match = BUTTON_REGEX.exec(text)) !== null) {
		buttonMatches.push({
			full: match[0],
			title: match[1],
			url: match[2],
		});
	}

	// Process buttons and remove from text
	for (const buttonMatch of buttonMatches) {
		const { title, color } = parseButtonTitle(buttonMatch.title, defaultColor);
		const action = parseButtonAction(buttonMatch.url);

		const button: ChannelTalkButton = {
			title,
			action,
		};

		if (color) {
			button.color = color;
		}

		buttons.push(button);

		// Remove the button syntax from text
		cleanText = cleanText.replace(buttonMatch.full, '');
	}

	// Clean up extra whitespace
	cleanText = cleanText
		.split('\n')
		.map((line) => line.trimEnd())
		.join('\n')
		.trim();

	return { text: cleanText, buttons };
}

/**
 * Parses a code block from markdown
 */
function parseCodeBlock(content: string): CodeBlock | null {
	const match = content.match(CODE_BLOCK_REGEX);
	if (match) {
		const [, language, code] = match;
		return {
			type: 'code',
			language: language || '',
			value: code.trim(),
		};
	}
	return null;
}

/**
 * Checks if a line is a list item and returns its content
 */
function parseListItem(line: string): string | null {
	const match = line.match(LIST_ITEM_REGEX);
	return match ? match[1] : null;
}

/**
 * Parses header and returns formatted text
 */
function parseHeader(line: string, preserveMarkdown: boolean): string | null {
	const match = line.match(HEADER_REGEX);
	if (match) {
		const [, hashes, content] = match;
		if (preserveMarkdown) {
			return `${hashes} ${content}`;
		}
		return content;
	}
	return null;
}

/**
 * Parses consecutive list items into a bullets block
 */
function parseBulletList(lines: string[], startIndex: number): { block: BulletsBlock; endIndex: number } {
	const items: TextBlock[] = [];
	let i = startIndex;

	while (i < lines.length) {
		const itemContent = parseListItem(lines[i]);
		if (itemContent !== null) {
			items.push({
				type: 'text',
				value: itemContent,
			});
			i++;
		} else {
			break;
		}
	}

	return {
		block: {
			type: 'bullets',
			blocks: items,
		},
		endIndex: i - 1,
	};
}

// ============================================================================
// Main Parser Function
// ============================================================================

/**
 * Parses markdown text into Channel Talk blocks and buttons format
 */
export function parseMarkdownToChannelTalk(
	markdown: string,
	options: ParseOptions = {},
): ParseResult {
	const { defaultButtonColor, preserveMarkdown = true } = options;

	if (!markdown || markdown.trim() === '') {
		return { blocks: [], buttons: [] };
	}

	// First, extract buttons from the entire text
	const { text: textWithoutButtons, buttons } = extractButtons(markdown, defaultButtonColor);

	if (textWithoutButtons.trim() === '') {
		return { blocks: [], buttons };
	}

	const blocks: ChannelTalkBlock[] = [];
	const lines = textWithoutButtons.split('\n');
	let i = 0;
	let currentTextLines: string[] = [];

	// Helper to flush accumulated text lines as a text block
	const flushTextBlock = () => {
		if (currentTextLines.length > 0) {
			const value = currentTextLines.join('\n').trim();
			if (value) {
				blocks.push({
					type: 'text',
					value,
				});
			}
			currentTextLines = [];
		}
	};

	while (i < lines.length) {
		const line = lines[i];
		const trimmedLine = line.trim();

		// Check for code block start
		if (trimmedLine.startsWith('```')) {
			flushTextBlock();

			// Find the end of the code block
			let codeContent = line;
			let j = i + 1;
			while (j < lines.length && !lines[j].trim().startsWith('```')) {
				codeContent += '\n' + lines[j];
				j++;
			}
			if (j < lines.length) {
				codeContent += '\n' + lines[j];
			}

			const codeBlock = parseCodeBlock(codeContent);
			if (codeBlock) {
				blocks.push(codeBlock);
			}

			i = j + 1;
			continue;
		}

		// Check for list item
		const listItemContent = parseListItem(line);
		if (listItemContent !== null) {
			flushTextBlock();

			const { block, endIndex } = parseBulletList(lines, i);
			blocks.push(block);
			i = endIndex + 1;
			continue;
		}

		// Check for header
		const headerContent = parseHeader(trimmedLine, preserveMarkdown);
		if (headerContent !== null) {
			flushTextBlock();
			blocks.push({
				type: 'text',
				value: preserveMarkdown ? trimmedLine : headerContent,
			});
			i++;
			continue;
		}

		// Regular text line
		if (trimmedLine !== '' || currentTextLines.length > 0) {
			currentTextLines.push(line);
		}
		i++;
	}

	// Flush any remaining text
	flushTextBlock();

	return { blocks, buttons };
}
