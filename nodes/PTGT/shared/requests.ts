import type { IDataObject, IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { getBase64Input, getOptionalParameter, getTextInput, parseJsonValue, requireStringParameter } from './utils';

type ResponseFormat = 'json' | 'text';

interface RequestResult {
	options: IHttpRequestOptions;
	responseFormat: ResponseFormat;
}

function buildJsonRequest(
	method: IHttpRequestOptions['method'],
	url: string,
	body?: IDataObject,
): RequestResult {
	const options: IHttpRequestOptions = {
		method,
		url,
		json: true,
	};

	if (body && Object.keys(body).length > 0) {
		options.body = body;
	}

	return { options, responseFormat: 'json' };
}

function buildTextRequest(
	url: string,
	body: string,
	responseFormat: ResponseFormat,
): RequestResult {
	const options: IHttpRequestOptions = {
		method: 'POST',
		url,
		body,
		json: false,
		headers: {
			'Content-Type': 'text/plain',
			Accept: responseFormat === 'text' ? 'text/plain' : 'application/json',
		},
	};

	return { options, responseFormat };
}

function ensureArray(value: unknown, name: string, itemIndex: number, context: IExecuteFunctions) {
	if (!Array.isArray(value)) {
		throw new NodeOperationError(context.getNode(), `Parameter "${name}" must be a JSON array.`, {
			itemIndex,
		});
	}
}

export async function buildRequest(
	this: IExecuteFunctions,
	resource: string,
	operation: string,
	itemIndex: number,
): Promise<RequestResult> {
	if (resource === 'jsonTools') {
		if (operation === 'fix') {
			const text = await getTextInput.call(this, itemIndex);
			return buildTextRequest('/v1/json/fix', text, 'json');
		}
		if (operation === 'extract') {
			const text = await getTextInput.call(this, itemIndex);
			return buildTextRequest('/v1/json/extract', text, 'json');
		}
		if (operation === 'pretty') {
			const text = await getTextInput.call(this, itemIndex);
			const responseFormat =
				(getOptionalParameter.call(this, 'responseFormat', itemIndex) as ResponseFormat) ?? 'json';
			return buildTextRequest('/v1/json/pretty', text, responseFormat);
		}
		if (operation === 'flatten') {
			const data = parseJsonValue.call(this, 'data', itemIndex, true) as IDataObject | IDataObject[];
			return buildJsonRequest('POST', '/v1/json/flatten', { data });
		}
		if (operation === 'toCsv') {
			const data = parseJsonValue.call(this, 'data', itemIndex, true) as IDataObject | IDataObject[];
			return buildJsonRequest('POST', '/v1/json/to_csv', { data });
		}
		if (operation === 'toHtml') {
			const data = parseJsonValue.call(this, 'data', itemIndex, true) as IDataObject | IDataObject[];
			const mode = getOptionalParameter.call(this, 'mode', itemIndex) as string | undefined;
			const optionsParam = parseJsonValue.call(this, 'options', itemIndex) as IDataObject | undefined;
			const body: IDataObject = { data };
			if (mode) {
				body.mode = mode;
			}
			if (optionsParam !== undefined) {
				body.options = optionsParam;
			}
			return buildJsonRequest('POST', '/v1/json/to_html', body);
		}
	}

	if (resource === 'csvTools') {
		if (operation === 'pretty') {
			const text = await getTextInput.call(this, itemIndex);
			const responseFormat =
				(getOptionalParameter.call(this, 'responseFormat', itemIndex) as ResponseFormat) ?? 'json';
			return buildTextRequest('/v1/csv/pretty', text, responseFormat);
		}
	}

	if (resource === 'textTools') {
		if (operation === 'pretty') {
			const text = await getTextInput.call(this, itemIndex);
			const responseFormat =
				(getOptionalParameter.call(this, 'responseFormat', itemIndex) as ResponseFormat) ?? 'json';
			return buildTextRequest('/v1/text/pretty', text, responseFormat);
		}
		if (operation === 'toSlack') {
			const text = await getTextInput.call(this, itemIndex);
			const responseFormat =
				(getOptionalParameter.call(this, 'responseFormat', itemIndex) as ResponseFormat) ?? 'json';
			return buildTextRequest('/v1/text/to_slack', text, responseFormat);
		}
		if (operation === 'toJson') {
			const text = await getTextInput.call(this, itemIndex);
			return buildTextRequest('/v1/text/to_json', text, 'json');
		}
	}

	if (resource === 'ocrTools') {
		if (operation === 'extract') {
			const inputType = this.getNodeParameter('inputType', itemIndex) as string;
			if (inputType === 'url') {
				const url = requireStringParameter.call(this, 'url', itemIndex);
				return buildJsonRequest('POST', '/v1/ocr/extract', { url });
			}
			const base64 = await getBase64Input.call(this, itemIndex);
			const filename = getOptionalParameter.call(this, 'filename', itemIndex) as string | undefined;
			const body: IDataObject = { base64 };
			if (filename) {
				body.filename = filename;
			}
			return buildJsonRequest('POST', '/v1/ocr/extract', body);
		}
		if (operation === 'extractStatus') {
			const jobId = requireStringParameter.call(this, 'jobId', itemIndex);
			return buildJsonRequest('GET', `/v1/ocr/extract/${jobId}`);
		}
	}

	if (resource === 'utilities') {
		if (operation === 'md5') {
			const data = requireStringParameter.call(this, 'data', itemIndex);
			return buildJsonRequest('POST', '/v1/hash/md5', { data });
		}
		if (operation === 'uuidGenerate') {
			return buildJsonRequest('POST', '/v1/uuid/generate');
		}
	}

	if (resource === 'base64') {
		if (operation === 'decode') {
			const data = requireStringParameter.call(this, 'data', itemIndex);
			const filename = getOptionalParameter.call(this, 'filename', itemIndex) as string | undefined;
			const contentType = getOptionalParameter.call(this, 'contentType', itemIndex) as string | undefined;
			const body: IDataObject = { data };
			if (filename) {
				body.filename = filename;
			}
			if (contentType) {
				body.content_type = contentType;
			}
			return buildJsonRequest('POST', '/v1/base64/decode', body);
		}
		if (operation === 'encode') {
			const source = this.getNodeParameter('source', itemIndex) as string;
			const body: IDataObject = {};
			if (source === 'fileId') {
				body.file_id = requireStringParameter.call(this, 'fileId', itemIndex);
			} else if (source === 'key') {
				body.key = requireStringParameter.call(this, 'key', itemIndex);
			} else if (source === 'url') {
				body.url = requireStringParameter.call(this, 'url', itemIndex);
			}
			return buildJsonRequest('POST', '/v1/base64/encode', body);
		}
		if (operation === 'normalize') {
			const data = requireStringParameter.call(this, 'data', itemIndex);
			const contentType = getOptionalParameter.call(this, 'contentType', itemIndex) as string | undefined;
			const body: IDataObject = { data };
			if (contentType) {
				body.content_type = contentType;
			}
			return buildJsonRequest('POST', '/v1/base64/normalize', body);
		}
	}

	if (resource === 'pdfTools') {
		if (operation === 'merge') {
			const files = parseJsonValue.call(this, 'files', itemIndex, true) as IDataObject[];
			ensureArray(files, 'files', itemIndex, this);
			const filename = getOptionalParameter.call(this, 'filename', itemIndex) as string | undefined;
			const body: IDataObject = { files: files as IDataObject[] };
			if (filename) {
				body.filename = filename;
			}
			return buildJsonRequest('POST', '/v1/pdf/merge', body);
		}
		if (operation === 'split') {
			const url = requireStringParameter.call(this, 'url', itemIndex);
			const mode = getOptionalParameter.call(this, 'mode', itemIndex) as string | undefined;
			const ranges = parseJsonValue.call(this, 'ranges', itemIndex) as string[] | undefined;
			const baseFilename = getOptionalParameter.call(this, 'baseFilename', itemIndex) as string | undefined;
			const body: IDataObject = { url };
			if (mode) {
				body.mode = mode;
			}
			if (mode === 'ranges' && ranges === undefined) {
				throw new NodeOperationError(
					this.getNode(),
					'Parameter "ranges" is required when split mode is "ranges".',
					{ itemIndex },
				);
			}
			if (ranges !== undefined) {
				ensureArray(ranges, 'ranges', itemIndex, this);
				body.ranges = ranges as string[];
			}
			if (baseFilename) {
				body.base_filename = baseFilename;
			}
			return buildJsonRequest('POST', '/v1/pdf/split', body);
		}
		if (operation === 'extractText') {
			const url = requireStringParameter.call(this, 'url', itemIndex);
			const pages = getOptionalParameter.call(this, 'pages', itemIndex) as string | undefined;
			const strategy = getOptionalParameter.call(this, 'strategy', itemIndex) as string | undefined;
			const body: IDataObject = { url };
			if (pages) {
				body.pages = pages;
			}
			if (strategy) {
				body.strategy = strategy;
			}
			return buildJsonRequest('POST', '/v1/pdf/extract/text', body);
		}
		if (operation === 'extractTextStatus') {
			const jobId = requireStringParameter.call(this, 'jobId', itemIndex);
			return buildJsonRequest('GET', `/v1/pdf/extract/text/${jobId}`);
		}
		if (operation === 'extractPages') {
			const url = requireStringParameter.call(this, 'url', itemIndex);
			const pages = getOptionalParameter.call(this, 'pages', itemIndex) as string | undefined;
			const filename = getOptionalParameter.call(this, 'filename', itemIndex) as string | undefined;
			const body: IDataObject = { url };
			if (pages) {
				body.pages = pages;
			}
			if (filename) {
				body.filename = filename;
			}
			return buildJsonRequest('POST', '/v1/pdf/extract/pages', body);
		}
		if (operation === 'info') {
			const url = requireStringParameter.call(this, 'url', itemIndex);
			return buildJsonRequest('POST', '/v1/pdf/info', { url });
		}
		if (operation === 'normalize') {
			const url = requireStringParameter.call(this, 'url', itemIndex);
			return buildJsonRequest('POST', '/v1/pdf/normalize', { url });
		}
	}

	if (resource === 'kv') {
		if (operation === 'set') {
			const key = requireStringParameter.call(this, 'key', itemIndex);
			const value = parseJsonValue.call(this, 'value', itemIndex);
			const ttlSeconds = getOptionalParameter.call(this, 'ttlSeconds', itemIndex) as number | undefined;
			const body: IDataObject = { key };
			if (value !== undefined) {
				body.value = value;
			}
			if (ttlSeconds !== undefined) {
				body.ttl_seconds = ttlSeconds;
			}
			return buildJsonRequest('POST', '/v1/kv/set', body);
		}
		if (operation === 'get') {
			const key = requireStringParameter.call(this, 'key', itemIndex);
			return buildJsonRequest('POST', '/v1/kv/get', { key });
		}
		if (operation === 'delete') {
			const key = requireStringParameter.call(this, 'key', itemIndex);
			return buildJsonRequest('POST', '/v1/kv/delete', { key });
		}
	}

	if (resource === 'urlTools') {
		const data = requireStringParameter.call(this, 'data', itemIndex);
		if (operation === 'encode') {
			return buildJsonRequest('POST', '/v1/url/encode', { data });
		}
		if (operation === 'decode') {
			return buildJsonRequest('POST', '/v1/url/decode', { data });
		}
		if (operation === 'normalize') {
			return buildJsonRequest('POST', '/v1/url/normalize', { data });
		}
	}

	if (resource === 'htmlTools') {
		const data = requireStringParameter.call(this, 'data', itemIndex);
		if (operation === 'encode') {
			return buildJsonRequest('POST', '/v1/html/encode', { data });
		}
		if (operation === 'decode') {
			return buildJsonRequest('POST', '/v1/html/decode', { data });
		}
		if (operation === 'normalize') {
			return buildJsonRequest('POST', '/v1/html/normalize', { data });
		}
	}

	if (resource === 'hexTools') {
		const data = requireStringParameter.call(this, 'data', itemIndex);
		if (operation === 'encode') {
			return buildJsonRequest('POST', '/v1/hex/encode', { data });
		}
		if (operation === 'decode') {
			return buildJsonRequest('POST', '/v1/hex/decode', { data });
		}
		if (operation === 'normalize') {
			return buildJsonRequest('POST', '/v1/hex/normalize', { data });
		}
	}

	if (resource === 'percentTools') {
		const data = requireStringParameter.call(this, 'data', itemIndex);
		if (operation === 'encode') {
			return buildJsonRequest('POST', '/v1/percent/encode', { data });
		}
		if (operation === 'decode') {
			return buildJsonRequest('POST', '/v1/percent/decode', { data });
		}
		if (operation === 'normalize') {
			return buildJsonRequest('POST', '/v1/percent/normalize', { data });
		}
	}

	throw new NodeOperationError(this.getNode(), 'Unsupported resource or operation.', { itemIndex });
}
