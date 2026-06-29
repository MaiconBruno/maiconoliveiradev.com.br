import { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
            <Head title="Login" />
            <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8">
                <h1 className="mb-2 text-2xl font-bold text-white">
                    Portfolio <span className="text-orange-500">Admin</span>
                </h1>
                <p className="mb-6 text-sm text-zinc-400">maiconoliveiradev.com.br</p>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm text-zinc-400">E-mail</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm text-zinc-400">Senha</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-lg bg-orange-500 py-2 font-medium text-white transition hover:bg-orange-600 disabled:opacity-50"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
