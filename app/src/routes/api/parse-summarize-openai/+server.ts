import { json, type RequestHandler } from '@sveltejs/kit';
import { OPEN_AI_KEY } from '$env/static/private';
import { OpenAI } from 'openai';
import { parseOfficeAsync } from 'officeparser';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('file') as File;

	if (!(file instanceof File)) {
		return json(
			{
				error: 'File is required'
			},
			{ status: 400 }
		);
	}

	if (file.size > MAX_FILE_SIZE) {
		return json(
			{
				error: 'File size is too large'
			},
			{ status: 400 }
		);
	}

	//Possible file types
	// 1. PDF
	// 2. DOCX
	// 3. TXT - No parsing needed

	let parsedData: string;

	try {
		if (
			file.type === 'application/pdf' ||
			file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		) {
			const fileBuffer = Buffer.from(await file.arrayBuffer());
			parsedData = await parseOfficeAsync(fileBuffer);
		} else {
			const fileBuffer = Buffer.from(await file.arrayBuffer());
			parsedData = fileBuffer.toString();
		}
	} catch (error) {
		console.error(error);
		return json(
			{
				error: 'Failed to parse file'
			},
			{ status: 500 }
		);
	}

	const openai = new OpenAI({
		apiKey: OPEN_AI_KEY
	});

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content: 'You are a helpful assistant that summarizes text.'
				},
				{
					role: 'user',
					content: parsedData
				}
			]
		});

		return json({
			summary: response.choices[0].message.content
		});
	} catch (error) {
		console.error(error);
		return json(
			{
				error: 'Failed to summarize file'
			},
			{ status: 500 }
		);
	}
};
