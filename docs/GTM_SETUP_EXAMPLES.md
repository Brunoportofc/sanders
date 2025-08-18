# Exemplos Práticos de Configuração no Google Tag Manager

## Configurações Essenciais

### 1. Variáveis Principais

#### Informações do Lead
```
Nome: Lead Name
Tipo: Variável da Camada de Dados
Nome da Variável: lead_name

Nome: Lead Email
Tipo: Variável da Camada de Dados
Nome da Variável: lead_email

Nome: Lead Phone
Tipo: Variável da Camada de Dados
Nome da Variável: lead_phone

Nome: Lead Company
Tipo: Variável da Camada de Dados
Nome da Variável: lead_company

Nome: Lead Product
Tipo: Variável da Camada de Dados
Nome da Variável: lead_product
```

#### Contexto e Origem
```
Nome: Chat Source
Tipo: Variável da Camada de Dados
Nome da Variável: chat_source

Nome: Page Product
Tipo: Variável da Camada de Dados
Nome da Variável: page_product

Nome: Lead Source
Tipo: Variável da Camada de Dados
Nome da Variável: lead_source
```

#### Métricas de Engajamento
```
Nome: Chat Duration
Tipo: Variável da Camada de Dados
Nome da Variável: chat_duration_seconds

Nome: Completion Rate
Tipo: Variável da Camada de Dados
Nome da Variável: completion_rate

Nome: Messages Sent
Tipo: Variável da Camada de Dados
Nome da Variável: messages_sent
```

### 2. Acionadores (Triggers)

#### Lead Gerado
```
Nome: Chat Lead Generated
Tipo: Evento Personalizado
Nome do Evento: chat_lead_generated
Este acionador é ativado em: Alguns Eventos Personalizados
Condições:
- Event equals chat_lead_generated
```

#### Chat Aberto
```
Nome: Chat Opened
Tipo: Evento Personalizado
Nome do Evento: chat_opened
Este acionador é ativado em: Alguns Eventos Personalizados
Condições:
- Event equals chat_opened
```

#### Produto Selecionado
```
Nome: Product Selected
Tipo: Evento Personalizado
Nome do Evento: chat_product_selected
Este acionador é ativado em: Alguns Eventos Personalizados
Condições:
- Event equals chat_product_selected
```

#### Chat Fechado (Lead Incompleto)
```
Nome: Chat Closed Incomplete
Tipo: Evento Personalizado
Nome do Evento: chat_closed
Este acionador é ativado em: Alguns Eventos Personalizados
Condições:
- Event equals chat_closed
- lead_completed equals false
```

### 3. Tags Principais

#### Google Analytics 4 - Lead Gerado
```
Nome: GA4 - Chat Lead Generated
Tipo: Google Analytics: Evento GA4
ID de Medição: [SEU_GA4_MEASUREMENT_ID]
Nome do Evento: generate_lead
Parâmetros do Evento:
- currency: BRL
- value: 100
- lead_source: {{Lead Source}}
- lead_product: {{Lead Product}}
- chat_source: {{Chat Source}}
- page_product: {{Page Product}}
- lead_quality: high

Acionador: Chat Lead Generated
```

#### Google Analytics 4 - Chat Aberto
```
Nome: GA4 - Chat Opened
Tipo: Google Analytics: Evento GA4
ID de Medição: [SEU_GA4_MEASUREMENT_ID]
Nome do Evento: chat_opened
Parâmetros do Evento:
- chat_source: {{Chat Source}}
- page_product: {{Page Product}}
- engagement_type: chat_interaction

Acionador: Chat Opened
```

#### Facebook Pixel - Lead Gerado
```
Nome: Facebook - Lead Generated
Tipo: Facebook Pixel
Pixel ID: [SEU_FACEBOOK_PIXEL_ID]
Tipo de Evento: Lead
Parâmetros de Objeto:
- content_name: {{Lead Product}}
- content_category: equipamento_medico
- value: 100
- currency: BRL
Parâmetros Personalizados:
- lead_source: {{Lead Source}}
- chat_source: {{Chat Source}}

Acionador: Chat Lead Generated
```

#### Google Ads - Conversão de Lead
```
Nome: Google Ads - Lead Conversion
Tipo: Google Ads Conversion Tracking
ID de Conversão: [SEU_CONVERSION_ID]
Rótulo de Conversão: [SEU_CONVERSION_LABEL]
Valor da Conversão: 100
Código da Moeda: BRL

Acionador: Chat Lead Generated
```

## Configurações Avançadas

### 1. Audiências Personalizadas no GA4

#### Usuários que Abriram o Chat (Últimos 30 dias)
```
Nome: Chat Users - 30 days
Descrição: Usuários que abriram o chat nos últimos 30 dias
Condições:
- Evento: chat_opened
- Período: Últimos 30 dias
```

#### Leads Incompletos
```
Nome: Incomplete Leads
Descrição: Usuários que abriram chat mas não geraram lead
Condições:
- Incluir: Evento chat_opened nos últimos 30 dias
- Excluir: Evento chat_lead_generated nos últimos 30 dias
```

#### Interessados em Produto Específico
```
Nome: Product Interest - [NOME_DO_PRODUTO]
Descrição: Usuários interessados em produto específico
Condições:
- Evento: chat_product_selected
- Parâmetro: product_name contém "[NOME_DO_PRODUTO]"
- Período: Últimos 90 dias
```

### 2. Eventos Personalizados para Funil

#### Interesse Demonstrado
```
Nome: GA4 - Interest Shown
Tipo: Google Analytics: Evento GA4
Nome do Evento: interest_shown
Parâmetros:
- product_name: {{Product Name}}
- interest_level: high
- source: chat_interaction

Acionador: Product Selected
```

#### Engajamento Alto
```
Nome: GA4 - High Engagement
Tipo: Google Analytics: Evento GA4
Nome do Evento: high_engagement
Parâmetros:
- engagement_duration: {{Chat Duration}}
- messages_count: {{Messages Sent}}
- completion_rate: {{Completion Rate}}

Acionador Personalizado:
- Evento: chat_closed
- Condição: chat_duration_seconds maior que 60
```

### 3. Remarketing Avançado

#### Facebook - Leads Incompletos
```
Nome: Facebook - Incomplete Leads Remarketing
Tipo: Facebook Pixel
Tipo de Evento: InitiateCheckout
Parâmetros:
- content_name: {{Page Product}}
- value: 50
- currency: BRL

Acionador: Chat Closed Incomplete
```

#### Google Ads - Remarketing por Produto
```
Nome: Google Ads - Product Interest Remarketing
Tipo: Google Analytics: Evento GA4
Nome do Evento: product_interest
Parâmetros:
- product_category: medical_equipment
- interest_product: {{Lead Product}}
- remarketing_audience: product_specific

Acionador: Product Selected
```

## Configurações de E-commerce Enhanced

### Purchase Event (para leads de alto valor)
```
Nome: GA4 - High Value Lead
Tipo: Google Analytics: Evento GA4
Nome do Evento: purchase
Parâmetros:
- transaction_id: lead_{{Lead Email}}_{{timestamp}}
- value: 100
- currency: BRL
- items: [
  {
    item_id: "lead_generation",
    item_name: {{Lead Product}},
    category: "medical_equipment",
    quantity: 1,
    price: 100
  }
]

Acionador: Chat Lead Generated
Condição Adicional: lead_quality equals "high"
```

## Monitoramento e Relatórios

### 1. Variáveis de Debug

#### Debug Mode
```
Nome: Debug Mode
Tipo: Constante
Valor: true

(Use apenas durante testes)
```

#### Console Log
```
Nome: Console Debug
Tipo: HTML Personalizado
HTML:
<script>
  console.log('GTM Event:', {
    event: '{{Event}}',
    lead_name: '{{Lead Name}}',
    lead_product: '{{Lead Product}}',
    chat_source: '{{Chat Source}}'
  });
</script>

Acionador: All Custom Events
(Remover em produção)
```

### 2. Relatórios Personalizados no GA4

#### Funil de Conversão do Chat
```
Dimensões:
- Origem do Chat (chat_source)
- Produto da Página (page_product)

Métricas:
- Chat Aberto (evento chat_opened)
- Produto Selecionado (evento chat_product_selected)
- Lead Gerado (evento chat_lead_generated)

Segmentos:
- Por origem (floating_chat vs product_page)
- Por produto de interesse
```

#### Performance por Produto
```
Dimensões:
- Nome do Produto (lead_product)
- Categoria do Produto (product_category)

Métricas:
- Número de Leads
- Taxa de Conversão
- Valor Total dos Leads

Filtros:
- Evento = chat_lead_generated
- Período = Últimos 30 dias
```

## Checklist de Implementação

### Fase 1: Configuração Básica
- [ ] Criar variáveis principais (lead_name, lead_email, etc.)
- [ ] Configurar acionador para chat_lead_generated
- [ ] Criar tag GA4 para leads
- [ ] Testar em modo preview

### Fase 2: Integrações
- [ ] Configurar Facebook Pixel
- [ ] Configurar Google Ads Conversion
- [ ] Criar audiências de remarketing
- [ ] Testar todas as integrações

### Fase 3: Otimização
- [ ] Configurar eventos de funil completo
- [ ] Criar relatórios personalizados
- [ ] Configurar alertas automáticos
- [ ] Implementar testes A/B

### Fase 4: Monitoramento
- [ ] Verificar dados diariamente
- [ ] Analisar performance semanal
- [ ] Otimizar campanhas mensalmente
- [ ] Revisar configurações trimestralmente

## Troubleshooting

### Problemas Comuns

1. **Eventos não aparecem no GA4**
   - Verificar se o Measurement ID está correto
   - Confirmar se os acionadores estão ativos
   - Usar o modo debug do GTM

2. **Variáveis vazias**
   - Verificar se os nomes das variáveis estão corretos
   - Confirmar se os eventos estão sendo disparados
   - Usar console.log para debug

3. **Conversões não rastreadas**
   - Verificar configuração do Google Ads
   - Confirmar se o Conversion ID está correto
   - Testar com Google Tag Assistant

### Contatos de Suporte
- **Desenvolvimento**: Para questões técnicas sobre eventos
- **Marketing**: Para estratégias de campanhas
- **Analytics**: Para configuração de relatórios