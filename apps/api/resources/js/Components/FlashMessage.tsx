import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface FlashProps {
    success?: string | null;
    error?: string | null;
}

export default function FlashMessage() {
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const [visible, setVisible] = useState(false);
    const message = flash?.success ?? flash?.error;
    const isError = Boolean(flash?.error);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
        setVisible(false);
    }, [message]);

    if (!message || !visible) {
        return null;
    }

    return (
        <div
            className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
                isError
                    ? 'border-red-800 bg-red-950/50 text-red-300'
                    : 'border-green-800 bg-green-950/50 text-green-300'
            }`}
        >
            {message}
        </div>
    );
}
