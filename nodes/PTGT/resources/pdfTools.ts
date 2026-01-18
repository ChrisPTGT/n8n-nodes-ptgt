import type { INodeProperties } from 'n8n-workflow';

const showPdfTools = { resource: ['pdfTools'] };

export const pdfToolsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showPdfTools,
		},
		options: [
			{
				name: 'Extract Pages',
				value: 'extractPages',
				action: 'Extract PDF pages',
				description: 'Create a PDF with selected pages',
			},
			{
				name: 'Extract Text',
				value: 'extractText',
				action: 'Extract text from a PDF',
				description: 'Extract text from a PDF URL',
			},
			{
				name: 'Get PDF Info',
				value: 'info',
				action: 'Get PDF info',
				description: 'Get PDF metadata and page count',
			},
			{
				name: 'Get Text Job Status',
				value: 'extractTextStatus',
				action: 'Get PDF text job status',
				description: 'Check status of an async PDF text extraction',
			},
			{
				name: 'Merge PDFs',
				value: 'merge',
				action: 'Merge pd fs',
				description: 'Merge PDFs from URLs',
			},
			{
				name: 'Normalize PDF',
				value: 'normalize',
				action: 'Normalize PDF',
				description: 'Normalize PDF (stub)',
			},
			{
				name: 'Split PDF',
				value: 'split',
				action: 'Split a PDF',
				description: 'Split a PDF into pages or ranges',
			},
		],
		default: 'merge',
	},
	{
		displayName: 'Files (JSON)',
		name: 'files',
		type: 'json',
		default: '',
		required: true,
		description: 'Array of objects with { "URL": "https://..." }',
		displayOptions: {
			show: {
				...showPdfTools,
				operation: ['merge'],
			},
		},
	},
	{
		displayName: 'Filename',
		name: 'filename',
		type: 'string',
		default: '',
		description: 'Optional filename for the merged PDF',
		displayOptions: {
			show: {
				...showPdfTools,
				operation: ['merge', 'extractPages'],
			},
		},
	},
	{
		displayName: 'PDF URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		description: 'Public URL to the PDF file',
		displayOptions: {
			show: {
				...showPdfTools,
				operation: ['split', 'extractText', 'extractPages', 'info', 'normalize'],
			},
		},
	},
	{
		displayName: 'Split Mode',
		name: 'mode',
		type: 'options',
		options: [
			{ name: 'Each Page', value: 'each_page' },
			{ name: 'Ranges', value: 'ranges' },
		],
		default: 'each_page',
		displayOptions: {
			show: {
				...showPdfTools,
				operation: ['split'],
			},
		},
	},
	{
		displayName: 'Ranges (JSON)',
		name: 'ranges',
		type: 'json',
		default: '',
		description: 'Array of page ranges like ["1-2","4-"]',
		displayOptions: {
			show: {
				...showPdfTools,
				operation: ['split'],
				mode: ['ranges'],
			},
		},
	},
	{
		displayName: 'Base Filename',
		name: 'baseFilename',
		type: 'string',
		default: '',
		description: 'Prefix for generated split files',
		displayOptions: {
			show: {
				...showPdfTools,
				operation: ['split'],
			},
		},
	},
	{
		displayName: 'Pages',
		name: 'pages',
		type: 'string',
		default: '',
		description: 'Pages or ranges, e.g. "1-2,5" or "all"',
		displayOptions: {
			show: {
				...showPdfTools,
				operation: ['extractText', 'extractPages'],
			},
		},
	},
	{
		displayName: 'Strategy',
		name: 'strategy',
		type: 'options',
		options: [
			{ name: 'Auto', value: 'auto' },
			{ name: 'Native', value: 'native' },
			{ name: 'OCR', value: 'ocr' },
			{ name: 'Merge', value: 'merge' },
		],
		default: 'auto',
		displayOptions: {
			show: {
				...showPdfTools,
				operation: ['extractText'],
			},
		},
	},
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showPdfTools,
				operation: ['extractTextStatus'],
			},
		},
	},
];
