# Integração com Google Tag Manager - Documentação para Marketing

## Visão Geral

Este documento descreve todos os eventos e variáveis enviados para o Google Tag Manager (GTM) através do sistema de chat da Sanders Brasil. Essas informações permitem ao time de marketing rastrear leads, analisar comportamento dos usuários e otimizar campanhas.

## Eventos Disponíveis

### 1. `chat_opened` - Abertura do Chat
**Disparado quando:** O usuário abre o modal de chat (seja pelo ícone flutuante ou botão "Solicitar Cotação")

**Variáveis disponíveis:**
- `chat_source`: Origem da abertura (`floating_chat` ou `product_page`)
- `page_product`: Nome do produto da página atual
- `open_timestamp`: Data e hora completa da abertura (ISO)
- `open_date`: Data da abertura (formato brasileiro)
- `open_time`: Horário da abertura (formato brasileiro)
- `open_day_of_week`: Dia da semana da abertura
- `session_start`: Sempre `true` (indica início de sessão)
- `chat_type`: Tipo do chat (`lead_generation`)
- `page_url`: URL completa da página
- `page_title`: Título da página
- `referrer`: Página de origem do usuário
- `user_agent`: Informações do navegador
- `screen_resolution`: Resolução da tela do usuário
- `viewport_size`: Tamanho da janela do navegador

### 2. `chat_product_selected` - Seleção de Produto
**Disparado quando:** O usuário seleciona um produto no chat

**Variáveis disponíveis:**
- `product_name`: Nome do produto selecionado
- `product_category`: Categoria do produto
- `product_id`: ID único do produto
- `selection_source`: Origem da seleção (`floating_chat`)
- `page_product`: Produto da página atual (se houver)
- `selection_timestamp`: Data e hora da seleção (ISO)
- `selection_date`: Data da seleção (formato brasileiro)
- `selection_time`: Horário da seleção (formato brasileiro)
- `page_url`: URL da página onde ocorreu a seleção
- `user_agent`: Informações do navegador

### 3. `chat_step_completed` - Progresso no Chat
**Disparado quando:** O usuário completa cada etapa do formulário no chat

**Variáveis disponíveis:**
- `step_number`: Número da etapa atual (1, 2, 3...)
- `step_field`: Campo preenchido (`name`, `email`, `phone`, `company`, `message`)
- `step_value`: Valor inserido pelo usuário
- `total_steps`: Total de etapas do chat
- `progress_percentage`: Porcentagem de conclusão (0-100%)
- `chat_source`: Origem do chat
- `page_product`: Produto da página
- `has_product_selection`: Se o usuário já selecionou um produto
- `collected_fields`: Número de campos já preenchidos
- `step_timestamp`: Data e hora da etapa (ISO)
- `step_date`: Data da etapa (formato brasileiro)
- `step_time`: Horário da etapa (formato brasileiro)
- `page_url`: URL da página

### 4. `chat_lead_generated` - Lead Completo Gerado
**Disparado quando:** O usuário completa todo o formulário e gera um lead

**Variáveis disponíveis:**

#### Informações do Lead
- `lead_name`: Nome completo do cliente
- `lead_email`: E-mail do cliente
- `lead_phone`: Telefone do cliente
- `lead_company`: Empresa/Instituição do cliente
- `lead_message`: Mensagem/Observações do cliente

#### Detalhes do Produto
- `lead_product`: Produto de interesse selecionado
- `product_category`: Categoria do produto

#### Contexto
- `lead_source`: Origem do lead (`floating_chat` ou `product_page`)
- `chat_type`: Tipo do chat (`lead_generation`)
- `page_product`: Produto da página onde o lead foi gerado

#### Dados de Segmentação
- `lead_timestamp`: Data e hora completa (ISO)
- `lead_date`: Data (formato brasileiro)
- `lead_time`: Horário (formato brasileiro)
- `lead_day_of_week`: Dia da semana

#### Métricas de Marketing
- `conversion_value`: Valor estimado da conversão (100)
- `lead_quality`: Qualidade do lead (`high`)
- `funnel_stage`: Estágio no funil (`lead_generated`)

#### Dados Técnicos
- `user_agent`: Informações do navegador
- `page_url`: URL da página
- `referrer`: Página de origem

### 5. `chat_closed` - Fechamento do Chat
**Disparado quando:** O usuário fecha o modal de chat

**Variáveis disponíveis:**

#### Dados de Engajamento
- `messages_sent`: Número de mensagens enviadas pelo usuário
- `chat_duration_seconds`: Duração total do chat em segundos
- `completed_steps`: Número de etapas completadas
- `total_steps`: Total de etapas disponíveis
- `completion_rate`: Taxa de conclusão (0-100%)

#### Status do Lead
- `lead_completed`: Se o lead foi completado (`true`/`false`)
- `has_product_selection`: Se selecionou um produto
- `has_contact_info`: Se forneceu nome e e-mail

#### Contexto
- `chat_source`: Origem do chat
- `page_product`: Produto da página
- `close_timestamp`: Data e hora do fechamento (ISO)
- `close_date`: Data do fechamento (formato brasileiro)
- `close_time`: Horário do fechamento (formato brasileiro)
- `page_url`: URL da página

## Como Usar no Google Tag Manager

### 1. Configurando Variáveis

No GTM, crie variáveis do tipo "Variável da Camada de Dados" para cada campo que deseja capturar:

**Exemplo para nome do lead:**
- Nome da Variável: `Lead Name`
- Tipo: Variável da Camada de Dados
- Nome da Variável da Camada de Dados: `lead_name`

### 2. Criando Acionadores

Crie acionadores personalizados para cada evento:

**Exemplo para lead gerado:**
- Nome do Acionador: `Chat Lead Generated`
- Tipo: Evento Personalizado
- Nome do Evento: `chat_lead_generated`

### 3. Configurando Tags

**Para Google Analytics 4:**
```
Tipo de Tag: Google Analytics: Evento GA4
ID de Medição: [SEU_GA4_ID]
Nome do Evento: chat_lead_generated
Parâmetros do Evento:
- lead_source: {{Lead Source}}
- lead_product: {{Lead Product}}
- lead_value: {{Conversion Value}}
```

**Para Facebook Pixel:**
```
Tipo de Tag: Facebook Pixel
Tipo de Evento: Lead
Parâmetros Personalizados:
- content_name: {{Lead Product}}
- value: {{Conversion Value}}
- currency: BRL
```

### 4. Segmentação Recomendada

#### Por Origem do Lead
- `chat_source = 'floating_chat'`: Leads do ícone flutuante
- `chat_source = 'product_page'`: Leads de páginas de produto

#### Por Qualidade do Lead
- `completion_rate >= 100`: Leads completos
- `has_contact_info = true`: Leads com contato
- `has_product_selection = true`: Leads com interesse específico

#### Por Produto
- `lead_product`: Segmente por produto de interesse
- `product_category`: Segmente por categoria

#### Por Comportamento
- `chat_duration_seconds >= 60`: Usuários engajados
- `messages_sent >= 3`: Usuários ativos no chat

## Exemplos de Uso

### 1. Funil de Conversão
Crie um funil no GA4 usando os eventos:
1. `chat_opened` (Abertura)
2. `chat_product_selected` (Interesse)
3. `chat_step_completed` (Engajamento)
4. `chat_lead_generated` (Conversão)

### 2. Audiências Personalizadas
- **Usuários Interessados**: `chat_product_selected` nos últimos 30 dias
- **Leads Incompletos**: `chat_opened` mas não `chat_lead_generated`
- **Leads de Alta Qualidade**: `lead_quality = 'high'`

### 3. Campanhas de Remarketing
- Usuários que abriram o chat mas não converteram
- Usuários interessados em produtos específicos
- Leads que não completaram o formulário

## Monitoramento e Debug

### Verificando se os Eventos Estão Funcionando
1. Abra o console do navegador (F12)
2. Vá para a aba "Console"
3. Digite: `dataLayer` e pressione Enter
4. Você verá todos os eventos enviados

### Testando no GTM
1. Use o modo "Visualizar" no GTM
2. Navegue pelo site e interaja com o chat
3. Verifique se os eventos aparecem no painel de debug

## Suporte Técnico

Para dúvidas técnicas sobre a implementação, entre em contato com a equipe de desenvolvimento. Para questões sobre configuração no GTM, consulte a documentação oficial do Google Tag Manager.