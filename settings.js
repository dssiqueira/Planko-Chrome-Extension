document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const renewButton = document.getElementById('renew');
    const passwordToggle = document.querySelector('.password-toggle');
    const tokenInfo = document.getElementById('token-info');
    const currentToken = document.getElementById('current-token');
    const toastContainer = document.getElementById('toast-container');

    // Função para mostrar notificação
    function showToast(message, type = 'success') {
        // Remove toasts anteriores
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => {
            toast.classList.add('is-hiding');
            setTimeout(() => {
                if (toast.parentNode === toastContainer) {
                    toastContainer.removeChild(toast);
                }
            }, 300);
        });

        // Cria novo toast
        const toast = document.createElement('div');
        toast.className = `toast is-${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);

        // Remove o toast após 3 segundos com animação
        setTimeout(() => {
            if (toast.parentNode === toastContainer) {
                toast.classList.add('is-hiding');
                setTimeout(() => {
                    if (toast.parentNode === toastContainer) {
                        toastContainer.removeChild(toast);
                    }
                }, 300); // Tempo da animação
            }
        }, 3000);
    }

    // Função para mascarar o token
    function maskToken(token) {
        if (!token) return 'Nenhum token salvo';
        return token.substring(0, 10) + '...' + token.substring(token.length - 10);
    }

    // Carregar email e token salvos
    chrome.storage.local.get(['email', 'token'], function(result) {
        if (result.email) {
            emailInput.value = result.email;
        }
        if (result.token) {
            currentToken.textContent = maskToken(result.token);
            tokenInfo.classList.remove('is-hidden');
        }
    });

    // Toggle para mostrar/ocultar senha
    passwordToggle.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    // Função para fazer login e obter token
    async function loginAndGetToken(email, password) {
        try {
            const response = await fetch('https://planko-back.onrender.com/v1/auth/login', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok && data.tokens && data.tokens.access && data.tokens.access.token) {
                const accessToken = data.tokens.access.token;
                const userId = data.user.id;

                // Salvar token, userId e email
                await new Promise((resolve) => {
                    chrome.storage.local.set({
                        token: accessToken,
                        userId: userId,
                        email: email
                    }, resolve);
                });

                // Atualizar display do token
                currentToken.textContent = maskToken(accessToken);
                tokenInfo.classList.remove('is-hidden');
                
                // Mostrar mensagem de sucesso
                showToast('Configurações salvas com sucesso!');
                
                // Limpar senha
                passwordInput.value = '';

                return true;
            } else {
                throw new Error(data.message || 'Erro ao fazer login');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            showToast('Erro ao fazer login. Verifique suas credenciais.', 'danger');
            return false;
        }
    }

    // Handler do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await loginAndGetToken(emailInput.value, passwordInput.value);
    });

    // Handler do botão renovar token
    renewButton.addEventListener('click', async function() {
        if (!emailInput.value || !passwordInput.value) {
            showToast('Por favor, preencha email e senha para renovar o token.', 'danger');
            return;
        }

        await loginAndGetToken(emailInput.value, passwordInput.value);
    });
});
