<?php

namespace Database\Seeders;

use App\Models\Certification;
use App\Models\Contact;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\SeoMeta;
use App\Models\Skill;
use App\Support\Locale;
use Illuminate\Database\Seeder;

class PortfolioDataSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedProfile();
        $this->seedContact();
        $this->seedExperiences();
        $this->seedSkills();
        $this->seedProjects();
        $this->seedEducation();
        $this->seedCertifications();
        $this->seedSeoMetas();
    }

    private function seedProfile(): void
    {
        Profile::query()->updateOrCreate(
            ['id' => 1],
            [
                'nome_completo' => 'Maicon Bruno Rodrigues Oliveira',
                'headline' => Locale::pt('Desenvolvedor Full Stack Sênior · Integração de IA & Sistemas SaaS'),
                'localizacao' => 'Rio de Janeiro, RJ · Brasil',
                'modelo_trabalho' => Locale::pt('Remoto'),
                'anos_experiencia' => '8+',
                'bio_resumo' => Locale::pt(
                    'Desenvolvedor Full Stack com 8+ anos construindo aplicações web e mobile de média a alta complexidade. Atuação em fábrica de software (Homem Máquina) e agência de performance digital (DGAZ Marketing). Setores: saúde, e-commerce, marketing digital, economia circular, turismo, telecomunicações e engenharia civil.'
                ),
                'bio_longa' => Locale::pt(
                    "Stack principal: Node.js, React, Next.js, Laravel, Ruby on Rails, PostgreSQL, Kafka, Redis. Infra: GCP, Vercel, Azure, AWS, Docker, GitLab CI.\n\nDiferenciais: integração de IA/LLM em produtos, pipelines de dados, otimização de performance e SEO técnico."
                ),
                'cta_primario' => [
                    'label' => Locale::pt('Entrar em contato'),
                    'url' => '/contato',
                    'externo' => false,
                ],
                'cta_secundario' => [
                    'label' => Locale::pt('Ver projetos'),
                    'url' => '/projetos',
                    'externo' => false,
                ],
            ]
        );
    }

    private function seedContact(): void
    {
        Contact::query()->updateOrCreate(
            ['id' => 1],
            [
                'email' => 'devmaiconrodrigues@gmail.com',
                'telefone' => '+55 11 94352-1179',
                'linkedin' => 'https://linkedin.com/in/dev-maicon-rodrigues',
                'github' => 'https://github.com/MaiconBruno',
                'portfolio' => 'https://maiconoliveiradev.com.br',
                'outros' => [],
            ]
        );
    }

    private function seedExperiences(): void
    {
        $experiences = [
            [
                'empresa' => 'Homem Máquina',
                'cargo' => Locale::pt('Desenvolvedor Full Stack Sênior'),
                'periodo_inicio' => '2025-06',
                'periodo_fim' => null,
                'modelo' => 'remoto',
                'tipo' => 'PJ',
                'descricao' => Locale::pt(
                    'Desenvolvimento full stack ponta a ponta, sustentação, arquitetura e aplicações web/mobile multiplataforma. Integração de sistemas e agentes de IA para automação. Deploy em nuvem (GCP, Vercel, Azure, AWS).'
                ),
                'responsabilidades' => [
                    Locale::pt('Desenvolvimento full stack ponta a ponta (frontend, backend, banco de dados)'),
                    Locale::pt('Integração de sistemas e agentes de IA para automação'),
                    Locale::pt('Deploy em nuvem (GCP, Vercel, Azure, AWS)'),
                    Locale::pt('Agile/Scrum · definição de arquitetura de longo prazo'),
                ],
                'stack' => ['Node.js', 'React', 'Next.js', 'Laravel', 'PostgreSQL', 'Kafka', 'GCP', 'Vercel'],
                'metricas' => [],
                'ordem' => 1,
                'publicado' => true,
            ],
            [
                'empresa' => 'DGAZ Marketing',
                'cargo' => Locale::pt('Desenvolvedor Full Stack (Pleno → Jr)'),
                'periodo_inicio' => '2019-10',
                'periodo_fim' => '2025-06',
                'modelo' => 'remoto',
                'tipo' => 'CLT',
                'descricao' => Locale::pt(
                    'Google Partner Premier (SEO e links patrocinados). Plataformas de e-commerce e aplicações web escaláveis, WordPress, landing pages, e-mail marketing + CRM, refatoração de legado PHP/SQL.'
                ),
                'responsabilidades' => [
                    Locale::pt('Plataformas de e-commerce e aplicações web escaláveis'),
                    Locale::pt('Otimização PageSpeed e SEO em dezenas de sites'),
                    Locale::pt('App mobile DGAZ (React Native + Expo, backend WordPress headless)'),
                ],
                'stack' => ['PHP', 'WordPress', 'React Native', 'Expo', 'WooCommerce'],
                'metricas' => [
                    $this->metric('+8000 usuários simultâneos', 'pico e-commerce'),
                    $this->metric('Queries WordPress críticas', '3s → 200ms'),
                    $this->metric('SEO — resultado geral', '100% dos clientes ≥5ª posição no Google'),
                    $this->metric('App DGAZ — usuários', '~30 clientes'),
                ],
                'ordem' => 2,
                'publicado' => true,
            ],
            [
                'empresa' => 'MED24',
                'cargo' => Locale::pt('Mobile Developer'),
                'periodo_inicio' => '2025-03',
                'periodo_fim' => '2025-05',
                'modelo' => 'remoto',
                'tipo' => 'contrato',
                'descricao' => Locale::pt('Projeto paralelo (contrato) — desenvolvimento mobile.'),
                'responsabilidades' => [],
                'stack' => ['Mobile'],
                'metricas' => [],
                'ordem' => 3,
                'publicado' => true,
            ],
            [
                'empresa' => 'ITCOM',
                'cargo' => Locale::pt('Desenvolvedor Front-end'),
                'periodo_inicio' => '2024-08',
                'periodo_fim' => '2024-10',
                'modelo' => 'remoto',
                'tipo' => 'contrato',
                'descricao' => Locale::pt(
                    'MVP de chamados integrando WhatsApp a painel de gestão. Comunicação em tempo real via websocket.'
                ),
                'responsabilidades' => [
                    Locale::pt('Fluxo de status: em atendimento, abertos, stand by, finalizados'),
                    Locale::pt('Integração WhatsApp e websocket em tempo real'),
                ],
                'stack' => ['React', 'WebSocket'],
                'metricas' => [],
                'ordem' => 4,
                'publicado' => true,
            ],
            [
                'empresa' => 'JCR Tecnologia',
                'cargo' => Locale::pt('Desenvolvedor Full Stack Jr'),
                'periodo_inicio' => '2018-06',
                'periodo_fim' => '2019-06',
                'modelo' => 'presencial',
                'tipo' => 'CLT',
                'descricao' => Locale::pt('Dashboard interno de call center · PHP · MySQL · sustentação e otimização.'),
                'responsabilidades' => [],
                'stack' => ['PHP', 'MySQL'],
                'metricas' => [],
                'ordem' => 5,
                'publicado' => true,
            ],
        ];

        foreach ($experiences as $experience) {
            Experience::query()->updateOrCreate(
                [
                    'empresa' => $experience['empresa'],
                    'periodo_inicio' => $experience['periodo_inicio'],
                ],
                $experience
            );
        }
    }

    private function seedSkills(): void
    {
        $categories = [
            'linguagens' => ['PHP', 'JavaScript', 'TypeScript', 'Ruby', 'Python'],
            'frontend' => ['React', 'Next.js', 'Angular', 'React Native', 'Expo', 'Tailwind CSS', 'Shadcn'],
            'backend' => ['Node.js', 'Express.js', 'Ruby on Rails', 'Laravel', 'WordPress'],
            'banco_de_dados' => ['PostgreSQL', 'MySQL', 'SQL Server', 'Redis', 'Prisma ORM', 'Firebase'],
            'mensageria' => ['Kafka', 'Trigger.dev'],
            'cloud_devops' => ['Google Cloud Platform', 'Vercel', 'Azure', 'AWS', 'Docker', 'GitLab CI', 'Cloudflare CDN'],
            'ia_automacao' => ['OpenAI / GPT', 'RAG', 'Multi-Agent Systems', 'Cursor', 'N8N'],
            'testes' => ['Jest', 'React Testing Library'],
        ];

        $ordem = 1;
        foreach ($categories as $categoria => $skills) {
            foreach ($skills as $nome) {
                Skill::query()->updateOrCreate(
                    ['nome' => $nome, 'categoria' => $categoria],
                    [
                        'ordem' => $ordem,
                        'destaque' => in_array($nome, ['React', 'Next.js', 'Laravel', 'Node.js', 'PostgreSQL', 'Kafka'], true),
                    ]
                );
                $ordem++;
            }
        }
    }

    private function seedProjects(): void
    {
        $projects = [
            [
                'slug' => 'niara',
                'titulo' => Locale::pt('Niara'),
                'empresa' => 'Homem Máquina',
                'periodo' => 'jun/2025 – atual',
                'papel' => Locale::pt('Full stack sênior'),
                'stack' => ['Node.js', 'Next.js', 'React', 'PostgreSQL', 'Prisma', 'Kafka', 'Trigger.dev', 'Vercel', 'GCP'],
                'url' => null,
                'status' => 'published',
                'descricao' => Locale::pt(
                    'Plataforma SaaS multi-empresa (+100 empresas) para análise e gestão de SEO. Agentes de IA leem dados do Google Search Console e PageSpeed. Pipeline assíncrono Kafka processa até +1000 URLs por cliente. Deploy via monorepo Git na Vercel com feature flags.'
                ),
                'metricas' => [
                    $this->metric('+100 empresas na plataforma'),
                    $this->metric('2–5 sites por empresa (média)'),
                    $this->metric('Até +1000 URLs por cliente (pico)'),
                    $this->metric('Deploy semanal'),
                ],
                'destaques' => [
                    Locale::pt('SaaS multi-empresa com agentes de IA para SEO'),
                    Locale::pt('Pipeline Kafka para processamento assíncrono de URLs'),
                ],
                'ordem' => 1,
                'destaque' => true,
                'publicado_em' => now(),
            ],
            [
                'slug' => 'beep-saude',
                'titulo' => Locale::pt('Beep Saúde'),
                'empresa' => 'Homem Máquina',
                'periodo' => 'jun/2025 – atual',
                'papel' => Locale::pt('Full stack'),
                'stack' => ['Ruby on Rails', 'React', 'Stripe'],
                'url' => null,
                'status' => 'published',
                'descricao' => Locale::pt(
                    'Plataforma 100% online de e-commerce de vacinas e exames domiciliares. Fluxos: receita → pedido ou seleção → compra → agendamento de técnico. Checkout transparente com Stripe.'
                ),
                'metricas' => [
                    $this->metric('+1000 visitas de vacinação/dia'),
                    $this->metric('+60000 atendimentos domiciliares/mês'),
                    $this->metric('+100 cidades no Brasil'),
                    $this->metric('Agenda comercial', '+15 dias à frente geralmente lotados'),
                ],
                'destaques' => [
                    Locale::pt('E-commerce de saúde com checkout Stripe'),
                    Locale::pt('Agendamento de técnico domiciliar integrado'),
                ],
                'ordem' => 2,
                'destaque' => true,
                'publicado_em' => now(),
            ],
            [
                'slug' => 'foodsoul',
                'titulo' => Locale::pt('FoodSoul'),
                'empresa' => 'Homem Máquina',
                'periodo' => 'jun/2025 – atual',
                'papel' => Locale::pt('Full stack'),
                'stack' => ['Laravel', 'Blade'],
                'url' => 'https://app.foodsoul.com.br/',
                'status' => 'published',
                'descricao' => Locale::pt(
                    'Plataforma de compliance regulatório alimentício com RBAC (controle de acesso por perfil).'
                ),
                'metricas' => [
                    $this->metric('+80 clientes ativos'),
                    $this->metric('~5000 vigilâncias regulatórias'),
                    $this->metric('RBAC', 'controle de acesso por perfil'),
                ],
                'destaques' => [
                    Locale::pt('Compliance regulatório alimentício'),
                    Locale::pt('RBAC por perfil de usuário'),
                ],
                'ordem' => 3,
                'destaque' => true,
                'publicado_em' => now(),
            ],
            [
                'slug' => 'hub-rocinha',
                'titulo' => Locale::pt('Hub Rocinha'),
                'empresa' => 'Homem Máquina',
                'periodo' => 'jun/2025 – atual',
                'papel' => Locale::pt('Full stack'),
                'stack' => ['Laravel', 'React', 'WordPress'],
                'url' => null,
                'status' => 'published',
                'descricao' => Locale::pt(
                    'Hub de economia circular na Rocinha, RJ. Geolocalização de iniciativas no mapa e gestão de resíduos no ecossistema.'
                ),
                'metricas' => [
                    $this->metric('100+ iniciativas cadastradas (legado)'),
                    $this->metric('1,8–8 toneladas/mês', 'resíduo recuperado no ecossistema'),
                    $this->metric('Geolocalização', 'iniciativas no mapa'),
                ],
                'destaques' => [
                    Locale::pt('Economia circular e impacto social'),
                    Locale::pt('Mapa com geolocalização de iniciativas'),
                ],
                'ordem' => 4,
                'destaque' => true,
                'publicado_em' => now(),
            ],
            [
                'slug' => 'viajar-e-demais',
                'titulo' => Locale::pt('Viajar é demais'),
                'empresa' => 'Homem Máquina',
                'periodo' => 'jun/2025 – atual',
                'papel' => Locale::pt('Full stack'),
                'stack' => ['Tailwind', 'Axios', 'Prisma ORM', 'GCP'],
                'url' => 'https://vedconcierge.com.br/',
                'status' => 'published',
                'descricao' => Locale::pt(
                    'Guia turístico com geração de roteiros via IA. Tier gratuito (GPT-4o-mini) e tier pago (modelo superior).'
                ),
                'metricas' => [
                    $this->metric('~30 roteiros/dia'),
                    $this->metric('1–1,5 min', 'por roteiro'),
                ],
                'destaques' => [
                    Locale::pt('Geração de roteiros com IA'),
                ],
                'ordem' => 5,
                'destaque' => false,
                'publicado_em' => now(),
            ],
            [
                'slug' => 'nrwork',
                'titulo' => Locale::pt('NRwork'),
                'empresa' => 'Homem Máquina',
                'periodo' => 'jun/2025 – atual',
                'papel' => Locale::pt('Backend (sem interface)'),
                'stack' => ['Node.js', 'Kafka', 'Redis'],
                'url' => null,
                'status' => 'published',
                'descricao' => Locale::pt(
                    'Integração bidirecional Ploomes ↔ Smclick. Pipeline de sincronização entre ERP/CRM com Redis para cache, status de fila e deduplicação.'
                ),
                'metricas' => [
                    $this->metric('+90000 registros'),
                    $this->metric('+500 alterações/dia'),
                    $this->metric('Fila', 'tempo de processamento reduzido pela metade'),
                ],
                'destaques' => [
                    Locale::pt('Integração ERP/CRM bidirecional'),
                ],
                'ordem' => 6,
                'destaque' => false,
                'publicado_em' => now(),
            ],
        ];

        foreach ($projects as $project) {
            Project::query()->updateOrCreate(
                ['slug' => $project['slug']],
                $project
            );
        }
    }

    private function seedEducation(): void
    {
        $educations = [
            [
                'grau' => Locale::pt('Tecnólogo em Análise e Desenvolvimento de Sistemas'),
                'instituicao' => 'Universidade Estácio de Sá (UNESA)',
                'periodo' => 'jan/2024 – jun/2026',
                'status' => Locale::pt('Concluído'),
                'ordem' => 1,
            ],
            [
                'grau' => Locale::pt('Técnico em Desenvolvimento de Sistemas'),
                'instituicao' => 'SENAI',
                'periodo' => 'jan/2018 – jul/2019',
                'status' => Locale::pt('Concluído'),
                'ordem' => 2,
            ],
        ];

        foreach ($educations as $education) {
            Education::query()->updateOrCreate(
                [
                    'instituicao' => $education['instituicao'],
                    'periodo' => $education['periodo'],
                ],
                $education
            );
        }
    }

    private function seedCertifications(): void
    {
        $certifications = [
            [
                'titulo' => Locale::pt('Curso avançado do Google Analytics'),
                'emissor' => 'Google',
                'ordem' => 1,
            ],
            [
                'titulo' => Locale::pt('Google Tag Manager'),
                'emissor' => 'Google',
                'ordem' => 2,
            ],
            [
                'titulo' => Locale::pt('Técnico em Desenvolvimento de Sistemas'),
                'emissor' => 'SENAI',
                'ordem' => 3,
            ],
        ];

        foreach ($certifications as $certification) {
            Certification::query()->updateOrCreate(
                ['titulo' => $certification['titulo']],
                $certification
            );
        }
    }

    private function seedSeoMetas(): void
    {
        $routes = [
            '/pt' => [
                'title' => Locale::pt('Maicon Oliveira — Desenvolvedor Full Stack Sênior'),
                'description' => Locale::pt('Portfólio de Maicon Bruno Rodrigues Oliveira — Full Stack, IA e sistemas SaaS.'),
            ],
            '/en' => [
                'title' => Locale::pt('Maicon Oliveira — Senior Full Stack Developer'),
                'description' => Locale::pt('Portfolio of Maicon Bruno Rodrigues Oliveira — Full Stack, AI and SaaS systems.'),
            ],
            '/pt/projetos' => [
                'title' => Locale::pt('Projetos — Maicon Oliveira'),
                'description' => Locale::pt('Cases de projetos em SaaS, e-commerce, IA e integrações.'),
            ],
            '/en/projects' => [
                'title' => Locale::pt('Projects — Maicon Oliveira'),
                'description' => Locale::pt('Project cases in SaaS, e-commerce, AI and integrations.'),
            ],
        ];

        foreach ($routes as $rota => $meta) {
            SeoMeta::query()->updateOrCreate(
                ['rota' => $rota],
                [
                    'title' => $meta['title'],
                    'description' => $meta['description'],
                    'og_title' => $meta['title'],
                    'og_description' => $meta['description'],
                ]
            );
        }
    }

    /**
     * @return array{label: array{pt: string|null, en: null}, valor: string}
     */
    private function metric(string $label, string $valor = ''): array
    {
        return [
            'label' => Locale::pt($label),
            'valor' => $valor,
        ];
    }
}
