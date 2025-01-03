# 🚀 Planko.io Chrome Extension

<div align="center">

![Planko.io Logo](https://planko.io/logo.png)

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge&logo=chrome&logoColor=white)](https://github.com/dssiqueira/planko-chrome-extension)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge&logo=github)](https://github.com/dssiqueira/planko-chrome-extension/pulls)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow.svg?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Built with Bulma](https://img.shields.io/badge/Built%20with-Bulma-00D1B2.svg?style=for-the-badge&logo=bulma)](https://bulma.io)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-4285F4.svg?style=for-the-badge&logo=google-chrome)](https://chrome.google.com/webstore)

*Uma extensão Chrome para criar tarefas rapidamente no Planko.io*

[Instalação](#-instalação) •
[Funcionalidades](#-funcionalidades) •
[Como Usar](#-como-usar) •
[Configuração](#-configuração) •
[Desenvolvimento](#-desenvolvimento)

</div>

## 📦 Instalação

1. Faça o download do código ou clone o repositório:
   ```bash
   git clone https://github.com/dssiqueira/planko-chrome-extension.git
   ```

2. Abra o Chrome e navegue até `chrome://extensions/`

3. Ative o "Modo do desenvolvedor" no canto superior direito

4. Clique em "Carregar sem compactação" e selecione a pasta da extensão

## ✨ Funcionalidades

- 🎯 **Criação Rápida de Tarefas**: Crie tarefas diretamente de qualquer página web
- 🔗 **Captura de URL**: Opção para incluir automaticamente a URL da página atual na descrição da tarefa
- 📅 **Data de Entrega**: Defina facilmente prazos para suas tarefas
- 🔐 **Autenticação Segura**: Login integrado com a plataforma Planko.io
- 🌟 **Interface Moderna**: Design limpo e intuitivo usando Bulma CSS
- 📱 **Responsivo**: Interface adaptável para diferentes tamanhos de tela
- 🔔 **Notificações Elegantes**: Sistema de notificações toast para feedback instantâneo

## 🚀 Como Usar

### 1. Configuração Inicial
1. Clique no ícone da extensão na barra de ferramentas
2. Acesse as configurações clicando no ícone de engrenagem
3. Faça login com suas credenciais do Planko.io

### 2. Criando uma Tarefa
1. Navegue até a página que deseja referenciar
2. Clique no ícone da extensão
3. Preencha a descrição da tarefa
4. Defina a data de entrega
5. Escolha se deseja incluir a URL atual
6. Clique em "Criar Tarefa"

## ⚙️ Configuração

### Autenticação
- A extensão utiliza o sistema de autenticação do Planko.io
- O token de acesso é armazenado de forma segura
- Renovação automática do token quando necessário

### Permissões Necessárias
- `storage`: Para armazenar configurações e token
- `activeTab`: Para acessar a URL da página atual
- `https://planko-back.onrender.com/*`: Para comunicação com a API

## 🛠️ Desenvolvimento

### Tecnologias Utilizadas

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bulma](https://img.shields.io/badge/Bulma-00D1B2.svg?style=for-the-badge&logo=bulma&logoColor=white)](https://bulma.io)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7.svg?style=for-the-badge&logo=font-awesome&logoColor=white)](https://fontawesome.com)
[![Chrome API](https://img.shields.io/badge/Chrome-API-4285F4.svg?style=for-the-badge&logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/reference)

### Estrutura do Projeto
```
planko-chrome-extension/
├── manifest.json        # Configuração da extensão
├── popup.html          # Interface principal
├── popup.js           # Lógica da interface principal
├── settings.html      # Página de configurações
├── settings.js        # Lógica das configurações
└── styles.css         # Estilos personalizados
```

### Endpoints da API

[![API Status](https://img.shields.io/badge/API-Online-success.svg?style=for-the-badge&logo=statuspage&logoColor=white)](https://planko-back.onrender.com)

- `POST /v1/auth/login`: Autenticação do usuário
- `POST /v1/tasks`: Criação de tarefas
- `GET /v1/auth/me`: Validação do token

## 🤝 Contribuindo

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge&logo=github)](https://github.com/dssiqueira/planko-chrome-extension/pulls)
[![Contributors](https://img.shields.io/github/contributors/dssiqueira/planko-chrome-extension.svg?style=for-the-badge&logo=github)](https://github.com/dssiqueira/planko-chrome-extension/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/dssiqueira/planko-chrome-extension.svg?style=for-the-badge&logo=github)](https://github.com/dssiqueira/planko-chrome-extension/issues)

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Notas de Versão

### Versão 1.0.0
- Interface moderna com Bulma CSS
- Sistema de notificações toast
- Captura automática de URL
- Autenticação integrada
- Gestão segura de tokens

## 📄 Licença

[![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge&logo=bookstack&logoColor=white)](LICENSE)

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autores

[![GitHub](https://img.shields.io/badge/GitHub-dssiqueira-181717.svg?style=for-the-badge&logo=github)](https://github.com/dssiqueira)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Diego_Siqueira-0A66C2.svg?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/dssiqueira)

## 🙏 Agradecimentos

- Equipe Planko.io pelo suporte
- Comunidade de desenvolvedores Chrome Extensions
- Contribuidores do projeto

---

<div align="center">

[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg?style=for-the-badge)](https://github.com/dssiqueira)
[![Powered by Coffee](https://img.shields.io/badge/Powered%20by-Coffee-brown.svg?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com)

[⬆ Voltar ao topo](#-plankoio-chrome-extension)

</div>
