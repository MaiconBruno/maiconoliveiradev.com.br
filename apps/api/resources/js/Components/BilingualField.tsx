import LocaleField from './LocaleField';
import { LocaleValue } from '../types/locale';

interface BilingualFieldProps {
    label: string;
    value: LocaleValue;
    onChange: (value: LocaleValue) => void;
    multiline?: boolean;
    rows?: number;
    required?: boolean;
    errors?: { pt?: string; en?: string };
    showGenerate?: boolean;
}

export default function BilingualField({
    label,
    value,
    onChange,
    multiline = false,
    rows = 4,
    required = false,
    errors,
    showGenerate = true,
}: BilingualFieldProps) {
    return (
        <LocaleField
            label={required ? `${label} *` : label}
            value={value}
            onChange={onChange}
            type={multiline ? 'textarea' : 'text'}
            rows={rows}
            error={errors?.pt ?? errors?.en}
            showGenerate={showGenerate}
        />
    );
}
