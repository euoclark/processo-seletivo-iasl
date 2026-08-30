# Teste Técnico — Analista de Automações


## 1. Visão geral

Este projeto implementa uma esteira completa de captação, tratamento, qualificação e comunicação de leads para o webinário **"Como automatizar captação e vendas no WhatsApp"**.

A solução contempla:

- Landing page pública para captação;

- Armazenamento dos dados enviados pelo formulário;

- Tratamento e normalização de uma base histórica;

- Validação de dados;

- Deduplicação;

- Lead scoring;

- Classificação em trilhas Quente, Morno e Frio;

- Separação de leads elegíveis e descartados;

- Roteamento de comunicação conforme a trilha;

- Configuração do disparo via Evolution API;

- Filas de reprocessamento assíncrono com contingência no Supabase e alertas no Discord.

A implementação considera dois cenários diferentes: entrada de leads em tempo real e tratamento da base histórica fornecida para o teste.


---


## 2. Arquitetura


### 2.1. Operação em tempo real

A operação da landing page é dividida em workflows com responsabilidades específicas:

```text
Landing Page 
  └─► [IASL] Recebimento de leads 
        └─► [IASL] Fila de reenvio - BD 
              └─► [IASL] Disparo de WhatsApp 
                    └─► [IASL] Fila de reenvio - Disparos
```

- **`[IASL] Recebimento de leads`**: Responsável pelo recebimento dos dados enviados pela landing page e pela continuidade do processamento.

- **`[IASL] Fila de reenvio - BD`**: Responsável por tentar salvar o lead novamente caso o banco de dados falhe.

- **`[IASL] Disparo de WhatsApp`**: Responsável pelo envio das mensagens aos leads elegíveis, utilizando a trilha atribuída para determinar a comunicação.

- **`[IASL] Fila de reenvio - Disparos`**: Responsável por tentar reenviar a mensagem caso o envio no WhatsApp falhe.

A separação dessas responsabilidades evita que uma falha pontual interrompa toda a operação.


### Destino dos dados em tempo real

Os cadastros recebidos pelo webhook são normalizados e armazenados na planilha de produção:

[Planilha de leads em tempo real no Google Sheets](https://docs.google.com/spreadsheets/d/1G3YMqp2G6i28veO_2DBZyrad_Ou9nKky9eIIljLeJH0/edit?usp=sharing)

> As planilhas estão compartilhadas publicamente por link. Para rodar ou testar os fluxos no seu próprio n8n, basta abrir a planilha em uma conta do Google com a credencial conectada no n8n ou apontar os nós para uma cópia vinculada à sua conta.


---


## 3. Tratamento da base histórica

Para o cenário do teste foi criado um workflow independente:

- **`[IASL] Tratamento da base`**

O fluxo processa a base original dentro do n8n, sem alteração manual dos dados.

A separação entre os fluxos não é apenas estrutural. Os dois cenários possuem problemas diferentes:

- Na **operação em tempo real**, a landing page permite controlar a qualidade dos dados na origem, utilizando campos estruturados e opções pré-definidas.

- Na **base histórica**, os dados já foram coletados e podem apresentar inconsistências. Nesse caso, o workflow precisa identificar, corrigir ou descartar cada registro de forma controlada.

Essa abordagem evita utilizar lógica desnecessariamente complexa em tempo real para tratar problemas que foram prevenidos na coleta da landing page.


### Planilha de entrega do Desafio 2

O CSV original foi importado no Google Sheets sem nenhuma edição manual.

O workflow do n8n lê essa base bruta e gera de forma autônoma as saídas de elegíveis e descartados:

- **`base_leads_webinar`**: Base bruta original importada (42 linhas intactas);

- **`Elegíveis`**: 33 leads qualificados, pontuados e distribuídos nas trilhas;

- **`Descartados`**: 9 leads com registro detalhado do motivo de descarte.

[Planilha da base tratada no Google Sheets](https://docs.google.com/spreadsheets/d/1Sgwq2ltOmOjBUslA9ZjV3n33Sd66hJdPeQG8nQWVFX8/edit?usp=sharing)

> Para rodar ou testar os fluxos no seu próprio n8n, basta abrir a planilha em uma conta do Google com a credencial conectada no n8n ou apontar os nós para uma cópia vinculada à sua conta.


---


## 4. Landing Page

Link da página: [https://landing-page-ten-blue-16.vercel.app](https://landing-page-ten-blue-16.vercel.app)


### Estrutura

A landing page foi desenvolvida seguindo a identidade visual, estrutura de comunicação e tom de voz da **IA Sem Limites**, adaptados ao contexto do webinário.

O formulário está posicionado diretamente na primeira dobra (hero section), garantindo acesso imediato à inscrição sem necessidade de rolagem.

As seções seguintes complementam a página e reduzem objeções:

- Contextualização do problema e gargalos do atendimento manual;

- Apresentação dos tópicos práticos que serão ensinados na aula;

- Apresentação dos especialistas;

- Seção de dúvidas frequentes (FAQ);

- Chamada final com redirecionamento de volta ao formulário.


### Campos

O formulário utiliza exatamente os nomes de coluna solicitados:

`nome`, `email`, `whatsapp`, `cargo`, `faturamento_mensal`, `principal_desafio`, `ja_usa_automacao`, `prazo_implementar`, `optin`.

- Sempre que possível, os campos foram estruturados em opções ou faixas, principalmente nos campos utilizados posteriormente pelo lead scoring.
  Isso reduz variações de preenchimento e melhora a qualidade dos dados que chegam à automação.

- O WhatsApp permanece como campo de texto para permitir diferentes formatos de entrada.
  A normalização fica sob responsabilidade da automação.

- O `optin` é um consentimento explícito e não é marcado por padrão.


---


## 5. Tratamento, validação e recuperação de dados

O workflow `[IASL] Tratamento da base` realiza o processamento em lote antes da qualificação dos leads:


### Padronização e recuperação

Quando um erro de preenchimento é claramente recuperável, o dado é corrigido antes da etapa de validação, evitando o descarte desnecessário de oportunidades de negócio.

O caso mais representativo durante o tratamento foi o de **João Silva**:

| Campo | Valor Original | Valor Tratado |
| :--- | :--- | :--- |
| **E-mail** | `joao.silva@gmail` (sem extensão) | `joao.silva@gmail.com` |
| **Cargo** | Sócio | Sócio (25 pts) |
| **Faturamento** | R\$ 50.001 a R\$ 100.000 | R\$ 50.001 a R\$ 100.000 (15 pts) |
| **Automação** | Não | Não (10 pts) |
| **Prazo** | Até 3 meses | Até 3 meses (10 pts) |
| **Opt-in** | Sim | Sim (Elegível) |
| **Resultado** | — | **60 pontos · Trilha Quente** |

A correção automática do domínio permitiu que um lead com perfil de sócio e alto potencial continuasse na esteira em vez de ser descartado por um simples erro de digitação.


### Validação e descarte controlado

Após a padronização, são verificadas as condições de elegibilidade (opt-in explícito, e-mail com estrutura válida, telefone funcional com DDD/DDI e ausência de dados de teste).

Os registros que não atendem aos critérios são separados e gravados na aba **Descartados** com a identificação exata do motivo (ex.: `Sem consentimento LGPD`, `E-mail inválido`, `Telefone inválido`, `Lead duplicado`).


### Deduplicação

Os registros são ordenados de forma decrescente pelo campo `timestamp` e a duplicidade é filtrada por e-mail, preservando sempre a conversão mais recente do lead.


---


## 6. Critérios de descarte

Os principais critérios utilizados foram:

- Ausência de opt-in;

- E-mail inválido ou fictício;

- WhatsApp inválido ou fictício;

- Nome ausente ou claramente utilizado para teste;

- Duplicidade.

Entre os exemplos considerados para identificação de dados inválidos ou fictícios estão:

- Nomes como `teste`, `test`, `asdf`;

- E-mails de teste ou domínios descartáveis/fictícios;

- Telefones com dígitos repetidos;

- Telefones sequenciais;

- Números sem estrutura válida de DDD e telefone.

A ordem de tratamento é importante:

1. Primeiro tento recuperar o que é recuperável;

2. Depois valido;

3. Somente então descarto o que realmente não pode seguir.


---


## 7. Lead Scoring

Foi aplicada a régua definida no teste:

| Critério | Condição | Pontos |
| :--- | :--- | :---: |
| **Faturamento** | Até R\$ 10.000 | 0 |
| **Faturamento** | R\$ 10.001 a R\$ 50.000 | 15 |
| **Faturamento** | Acima de R\$ 100.000 | 30 |
| **Cargo** | Sócio, CEO ou Diretor | 25 |
| **Cargo** | Gerente ou Coordenador | 15 |
| **Cargo** | Analista | 5 |
| **Cargo** | Outro | 0 |
| **Prazo** | Imediato | 20 |
| **Prazo** | Até 3 meses | 10 |
| **Prazo** | Sem previsão | 0 |
| **Automação** | Não | 10 |
| **Automação** | Sim, quero melhorar | 15 |


### Trilhas

| Trilha | Pontuação |
| :--- | :--- |
| **Quente** | 60 ou mais |
| **Morno** | 30 a 59 |
| **Frio** | Abaixo de 30 |


### Faixa de R\$ 50.001 a R\$ 100.000

O briefing define a pontuação para R\$ 10.001 a R\$ 50.000 e para valores acima de R\$ 100.000, mas não especifica o intervalo entre R\$ 50.001 e R\$ 100.000.

Como a base contém registros nessa faixa, foi adotada a premissa de que ela continua pertencendo à categoria intermediária, recebendo **15 pontos**.

A decisão foi documentada para tornar o comportamento reproduzível e evitar uma classificação arbitrária como 0 pontos.


---


## 8. Disparo segmentado

Depois do tratamento e scoring, os leads elegíveis são direcionados para uma das três trilhas:

```text
Elegível ──► Pontuação ──► Trilha
                            ├── Quente
                            ├── Morno
                            └── Frio
```

Cada trilha possui uma copy própria, considerando o nível de interesse e maturidade identificado pelo scoring. 

O disparo é estruturado por requisição HTTP para a Evolution API, utilizando o endpoint da Evolution API solicitado no briefing.


### Copy — Trilha Quente

```text
Fala {{ ($json.nome || $json.Nome || '').split(' ')[0] }}, tudo bem? Aqui é da equipe da IA Sem Limites.

Recebemos sua inscrição para o nosso webinário executivo.

Para operações que buscam escala rápida, atender lead de forma manual no WhatsApp é perder vendas por tempo de resposta. Na aula fechada, vamos abrir os bastidores de esteiras que qualificam e vendem de forma automatizada.

Garanta sua vaga na sala fechada por aqui: https://webinar.exemplo.com.br/automacao-whatsapp
```


### Copy — Trilha Morna

```text
Olá {{ ($json.nome || $json.Nome || '').split(' ')[0] }}, tudo certo? Aqui é da equipe da IA Sem Limites!

Confirmamos sua inscrição no webinário de automação no WhatsApp.

Muitas empresas perdem tempo precioso com curiosos enquanto clientes prontos para comprar ficam esperando resposta. Na transmissão, vamos mostrar como criar uma triagem automática para sua equipe só atender quem tem real potencial de compra.

Acesse o link para confirmar sua presença: https://webinar.exemplo.com.br/automacao-whatsapp
```


### Copy — Trilha Fria

```text
Oi {{ ($json.nome || $json.Nome || '').split(' ')[0] }}, como você está? Equipe da IA Sem Limites por aqui!

Que legal ver seu interesse no nosso webinário prático de automação!

Se você ainda gasta horas respondendo as mesmas dúvidas repetitivas e quer dar os primeiros passos para automatizar o seu WhatsApp do jeito certo, essa aula foi desenhada para você.

O seu link de acesso à transmissão está aqui: https://webinar.exemplo.com.br/automacao-whatsapp
```

Todas as mensagens direcionam para o link do webinário informado no briefing.


---


## 9. Tratamento de falhas e resiliência

A esteira foi construída com filas de reprocessamento assíncrono para garantir que nenhum dado seja perdido diante de instabilidades externas:

- **Fila de reenvio de banco de dados (`[IASL] Fila de reenvio - BD`):** Executa a cada 15 minutos buscando os leads que caíram na contingência do Supabase (`leads_pendentes_sheets`). Antes de realizar a gravação no Google Sheets, o fluxo consulta a planilha para garantir que o lead já não foi inserido por outra via, evitando duplicidade.

- **Fila de reenvio de disparos (`[IASL] Fila de reenvio - Disparos`):** Executa a cada 15 minutos buscando mensagens pendentes no Supabase (`disparos_pendentes`) e realiza até 3 tentativas de reenvio na Evolution API. 

  - **Alerta de falha definitiva no Discord (exclusivo deste fluxo):** Caso as 3 tentativas de disparo sejam esgotadas sem sucesso, este workflow marca o status como falha definitiva no banco e envia automaticamente uma notificação estruturada em um canal do Discord contendo nome, telefone, e-mail e trilha do lead. Isso permite que o time comercial realize uma abordagem manual imediata sem perder o timing da inscrição.


---


## 10. Como usei IA

Utilizei IA de forma pontual como ferramenta de apoio durante o desenvolvimento:

- **Validação de lógica:** usei IA para revisar algumas regras e comportamentos dos workflows no n8n, principalmente para conferir se a lógica implementada estava coerente com os requisitos do teste.

- **Code Nodes e expressões:** utilizei IA para auxiliar na construção e revisão de alguns trechos de JavaScript e expressões utilizadas nos workflows. As sugestões foram analisadas e testadas antes de serem incorporadas à solução.

- **Landing page:** utilizei IA para desenvolver a página a partir da identidade visual, estrutura de comunicação e tom de voz da IA Sem Limites, buscando manter consistência com a marca e adaptar essa linguagem ao contexto específico da masterclass.

- **Critério de uso:** as sugestões da IA foram utilizadas como apoio, e as decisões finais, testes e validações foram feitos por mim no ambiente de desenvolvimento.


### Prompts utilizados

Abaixo estão alguns dos prompts que considerei mais relevantes durante o desenvolvimento.


#### Prompt 1, Landing Page (Referência visual + Brief em Markdown)

> *"Acesse o site [https://iasemlimites.com](https://iasemlimites.com), analise a identidade visual, cores, fontes, estilo dos botões e a estrutura da página deles, e crie a nossa landing page em Next.js para o webinário seguindo exatamente o mesmo padrão visual da marca. Para os textos e seções (hero, problema, mentores, FAQ), use a copy estruturada que está no arquivo brief-copy-lp-ia-sem-limites.md."*


#### Prompt 2, Code Node / JavaScript (Validação + Tabela de Scoring Completa)

> *"Preciso de um script em JavaScript para o Code Node do n8n que receba o payload do formulário, faça a limpeza e normalização dos dados, valide e-mail e WhatsApp (com DDD e DDI 55), valide o opt-in e identifique dados inválidos ou fictícios, como nomes de teste (ex.: 'teste', 'test', 'asdf'), domínios ou e-mails fictícios (ex.: 'teste@teste.com', 'mailinator.com') e números de WhatsApp inválidos, repetidos, sequenciais ou sem DDD.  
>  
> Depois, aplique a régua de lead scoring com base nesses critérios do teste:  
> - Faturamento: até 10k = 0 pts | 10k a 50k = 15 pts | acima de 100k = 30 pts  
> - Cargo: Sócio/CEO/Diretor = 25 pts | Gerente/Coord = 15 pts | Analista = 5 pts | Outro = 0 pts  
> - Prazo: Imediato = 20 pts | até 3 meses = 10 pts | Sem previsão = 0 pts  
> - Automação: Sim, quero melhorar = 15 pts | Não = 10 pts  
> - Trilhas: Quente >= 60 | Morno 30 a 59 | Frio < 30  
>  
> O retorno deve ser o lead com os dados normalizados, a pontuação calculada, a trilha atribuída, o status de elegibilidade e o motivo de descarte caso seja inelegível."*


#### Prompt 3, Validação de Lógica no n8n (Deduplicação com Menor Número de Nós)

> *"No n8n, como eu faço para ordenar os leads por data mais recente, remover os duplicados mantendo o último envio e ao mesmo tempo separar os que foram descartados para salvar em outra aba sem perder os dados, usando o menor número de nós possível?"*


#### Prompt 4, Expressões do n8n (Parsing de Faturamento com Contexto Real da Base)

> *"Na base de leads do formulário, a coluna de faturamento veio com textos livres misturados como 'uns 80k', 'R$ 45.000,00', '10.001 a 50.000' e 'prefiro nao informar'. Como monto a expressão dentro do nó Set do n8n para identificar esses padrões e converter para a pontuação correta da régua (30, 15 ou 0 pontos) sem quebrar o fluxo?"*


### Caso em que a IA exigiu revisão

Durante o desenvolvimento da landing page, em alterações iterativas, houve situações em que a IA aplicou uma mudança solicitada e acabou desfazendo ou alterando outra implementação que já estava funcionando.

As alterações foram revisadas manualmente e os elementos afetados foram corrigidos antes da versão final.

Isso reforçou a necessidade de tratar a IA como ferramenta de apoio e revisar o resultado final, principalmente em alterações sobre código existente.


---


## 11. Versionamento

O projeto está organizado e estruturado contendo a landing page, workflows exportados e documentação:

- A separação dos workflows permite visualizar individualmente as responsabilidades de cada etapa da solução;

- A estrutura de pastas foi pensada para manter o repositório claro, intuitivo e de fácil navegação.


---


## 12. Entregáveis

- [x] **Landing page pública e responsiva:** [Acessar landing page](https://landing-page-ten-blue-16.vercel.app)

- [x] **Formulário com os campos solicitados**

- [x] **Armazenamento dos dados em destino real:** [Planilha de leads em tempo real](https://docs.google.com/spreadsheets/d/1G3YMqp2G6i28veO_2DBZyrad_Ou9nKky9eIIljLeJH0/edit?usp=sharing)

- [x] **Base tratada e classificada:** [Planilha da base tratada no Google Sheets](https://docs.google.com/spreadsheets/d/1Sgwq2ltOmOjBUslA9ZjV3n33Sd66hJdPeQG8nQWVFX8/edit?usp=sharing)

- [x] **Workflow de tratamento da base dentro do n8n**

- [x] **Leads elegíveis com pontuação e trilha atribuída**

- [x] **Leads descartados com motivo de descarte**

- [x] **Roteamento entre as três trilhas (Quente, Morno e Frio)**

- [x] **Copies específicas para cada trilha**

- [x] **Requisição configurada para Evolution API**

- [x] **Workflows exportados em JSON (pasta `fluxos/`)**

- [x] **Projeto versionado em Git**

- [x] **README com premissas, decisões e critérios**

- [x] **Vídeo demonstrativo:** [Assistir ao vídeo demonstrativo no Google Drive](https://drive.google.com/file/d/1JViPjwskpVN9wVkaWk49zVw3tQDN41JO/view?usp=sharing)
