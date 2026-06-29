import axios from 'axios';

export interface TranslateResponse {
    en?: string | Record<string, string>;
    error?: string;
    configured?: boolean;
}

function getCsrfToken(): string | null {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}

async function postTranslate(payload: {
    text?: string;
    fields?: Record<string, string>;
}): Promise<TranslateResponse> {
    const token = getCsrfToken();

    try {
        const { data } = await axios.post<TranslateResponse>(
            '/admin/translate',
            payload,
            {
                headers: token ? { 'X-XSRF-TOKEN': token } : {},
            }
        );

        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            const body = error.response.data as TranslateResponse;
            return {
                error: body.error ?? 'Não foi possível traduzir o conteúdo.',
                configured: body.configured,
            };
        }

        return { error: 'Não foi possível traduzir o conteúdo.' };
    }
}

export async function translateText(text: string): Promise<TranslateResponse> {
    return postTranslate({ text });
}

export async function translateFields(
    fields: Record<string, string>
): Promise<TranslateResponse> {
    return postTranslate({ fields });
}
