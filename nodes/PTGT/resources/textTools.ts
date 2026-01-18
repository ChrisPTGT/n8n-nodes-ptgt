import type { INodeProperties } from 'n8n-workflow';

const showTextTools = { resource: ['textTools'] };

export const textToolsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showTextTools,
		},
		options: [
			{
				name: 'Pretty Text',
				value: 'pretty',
				action: 'Prettify text',
				description: 'Normalize line endings and spacing',
			},
			{
				name: 'Format for Slack',
				value: 'toSlack',
				action: 'Format text for slack',
				description: 'Convert markdown-like text to Slack formatting',
			},
			{
				name: 'Parse Text to JSON',
				value: 'toJson',
				action: 'Parse text to JSON',
				description: 'Attempt to parse text as JSON',
			},
		],
		default: 'pretty',
	},
	{
		displayName: 'Input Mode',
		name: 'inputMode',
		type: 'options',
		options: [
			{ name: 'Text', value: 'text' },
			{ name: 'Binary', value: 'binary' },
		],
		default: 'text',
		displayOptions: {
			show: {
				...showTextTools,
				operation: ['pretty', 'toSlack', 'toJson'],
			},
		},
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		default: '',
		description: 'Plain text payload',
		displayOptions: {
			show: {
				...showTextTools,
				operation: ['pretty', 'toSlack', 'toJson'],
				inputMode: ['text'],
			},
		},
		typeOptions: {
			rows: 6,
		},
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		description: 'Binary property name to read text from',
		displayOptions: {
			show: {
				...showTextTools,
				operation: ['pretty', 'toSlack', 'toJson'],
				inputMode: ['binary'],
			},
		},
	},
	{
		displayName: 'Response Format',
		name: 'responseFormat',
		type: 'options',
		options: [
			{ name: 'JSON', value: 'json' },
			{ name: 'Text', value: 'text' },
		],
		default: 'json',
		description: 'Choose JSON or text/plain response',
		displayOptions: {
			show: {
				...showTextTools,
				operation: ['pretty', 'toSlack'],
			},
		},
	},
];
