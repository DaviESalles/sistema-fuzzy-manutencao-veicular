# Sistema Inteligente para Priorização de Manutenções Veiculares Preventivas

Projeto desenvolvido para a disciplina **Sistemas Inteligentes Aplicados (SI17SW)**, do curso de **Bacharelado em Engenharia de Software** da **Universidade Tecnológica Federal do Paraná (UTFPR) - Campus Dois Vizinhos**.

## Sobre o projeto

Este projeto apresenta um **MVP web** de um sistema inteligente para auxiliar na **priorização de manutenções veiculares preventivas**.

A proposta é permitir que o usuário informe dados relacionados ao estado de uso do veículo e receba uma recomendação de prioridade para manutenção, utilizando uma abordagem baseada em **lógica fuzzy**.

O sistema foi pensado para apoiar motoristas e pequenos usuários de veículos que nem sempre têm clareza sobre quais itens de manutenção exigem atenção mais urgente.

## Problema abordado

A manutenção preventiva de veículos costuma ser negligenciada por falta de informação, organização ou percepção de urgência. Com isso, pequenos sinais de desgaste podem evoluir para falhas mais caras, perda de segurança e paradas inesperadas.

O problema tratado pelo sistema é: **como auxiliar o usuário a identificar, de forma simples, o nível de prioridade de uma manutenção veicular preventiva?**

## Solução proposta

A solução consiste em uma aplicação web simples, na qual o usuário informa dados relacionados ao veículo. A partir dessas entradas, o sistema aplica regras fuzzy para classificar a situação e indicar uma prioridade de manutenção.

Diferente de uma regra rígida do tipo "sim" ou "não", a lógica fuzzy permite trabalhar com níveis intermediários, como baixa, média ou alta prioridade. Isso aproxima a análise do tipo de raciocínio usado em decisões reais, nas quais os sinais nem sempre são totalmente objetivos.

## Técnica de Inteligência Artificial utilizada

A técnica utilizada no projeto é a **lógica fuzzy**.

A lógica fuzzy é adequada para problemas em que existe incerteza ou gradação entre os estados avaliados. No contexto deste projeto, ela permite representar condições como:

- manutenção pouco urgente;
- manutenção com prioridade moderada;
- manutenção urgente;
- situação crítica ou de maior atenção.

A decisão final é produzida a partir de regras que combinam os dados informados pelo usuário.

## Objetivos

### Objetivo geral

Desenvolver um MVP de sistema inteligente capaz de auxiliar na priorização de manutenções veiculares preventivas por meio de lógica fuzzy.

### Objetivos específicos

- identificar variáveis relevantes para avaliação da necessidade de manutenção;
- implementar regras fuzzy para análise das informações fornecidas;
- criar uma interface web simples para interação com o usuário;
- apresentar uma recomendação clara de prioridade;
- demonstrar a aplicação prática de uma técnica de Inteligência Artificial em um problema real.

## Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **Lógica fuzzy implementada no frontend**

## Estrutura do projeto

```text
.
├── index.html
├── style.css
├── script.js
├── README.md
├── docs/
│   ├── relatorio-final
│   └── apresentacao
└── assets/
    └── imagens-ou-prints-do-projeto
```

## Como executar o projeto

Como o MVP foi desenvolvido com HTML, CSS e JavaScript puros, não é necessário instalar dependências.

### Opção 1: abrir diretamente no navegador

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` em um navegador.
3. Preencha os campos da aplicação.
4. Visualize a prioridade de manutenção indicada pelo sistema.

### Opção 2: clonar com Git

```bash
git clone https://github.com/DaviESalles/sistema-fuzzy-manutencao-veicular
cd sistema-fuzzy-manutencao-veicular
```

Depois, abra o arquivo `index.html` no navegador.

## Como publicar com GitHub Pages

Caso queira disponibilizar o MVP online pelo GitHub Pages:

1. Acesse o repositório no GitHub.
2. Vá em **Settings**.
3. Entre em **Pages**.
4. Em **Branch**, selecione `main`.
5. Selecione a pasta `/root`.
6. Clique em **Save**.

Após alguns minutos, o GitHub irá gerar um link público para acessar a aplicação.

## Exemplo de uso

O usuário informa dados relacionados à condição do veículo. O sistema processa essas informações com base nas regras fuzzy definidas e retorna uma indicação de prioridade, ajudando na tomada de decisão sobre a manutenção preventiva.

## Resultados esperados

Espera-se que o sistema consiga demonstrar, de forma simples e funcional, como uma técnica de Inteligência Artificial pode ser aplicada em um problema prático do cotidiano.

O projeto não tem como objetivo substituir a avaliação de um mecânico ou de uma oficina especializada, mas sim servir como apoio inicial para organização e priorização das manutenções.

## Limitações

Por se tratar de um MVP acadêmico, o sistema possui algumas limitações:

- não utiliza dados reais de sensores veiculares;
- não realiza diagnóstico mecânico completo;
- depende das informações preenchidas pelo usuário;
- as regras fuzzy foram definidas para fins de demonstração acadêmica;
- não substitui uma avaliação profissional.

## Possíveis melhorias futuras

- integração com histórico real de manutenções;
- armazenamento dos dados do veículo;
- criação de perfis para múltiplos veículos;
- uso de dados de OBD2 ou sensores veiculares;
- ajuste das regras fuzzy com base em dados reais;
- geração de relatórios de manutenção;
- versão mobile ou PWA.

## Autor

**Davi Emanuel Salles**  
Bacharelado em Engenharia de Software  
Universidade Tecnológica Federal do Paraná - UTFPR  
Campus Dois Vizinhos

## Licença

Este projeto foi desenvolvido para fins acadêmicos.
