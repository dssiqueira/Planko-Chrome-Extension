document.addEventListener('DOMContentLoaded', function() {
    const noTokenContent = document.getElementById('no-token-content');
    const withTokenContent = document.getElementById('with-token-content');
    const projectSelect = document.getElementById('project-select');
    const taskForm = document.getElementById('task-form');
    const taskError = document.getElementById('task-error');
    const taskNameInput = document.getElementById('task-name');
    const dueDateInput = document.getElementById('due-date');
    const saveUrlCheckbox = document.getElementById('save-url');
    const clearInputButton = document.querySelector('.clear-input');
    const toastContainer = document.getElementById('toast-container');

    // Configurar data mínima para hoje
    const today = new Date().toISOString().split('T')[0];
    dueDateInput.min = today;

    // Preencher o título da página atual
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0] && tabs[0].title) {
            taskNameInput.value = tabs[0].title;
        }
    });

    // Evento para limpar o campo de tarefa
    clearInputButton.addEventListener('click', function() {
        taskNameInput.value = '';
        taskNameInput.focus();
    });

    // Função para carregar os projetos
    async function loadProjects(token) {
        try {
            const response = await fetch('https://planko-back.onrender.com/v1/projects', {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok && Array.isArray(data.results)) {
                // Limpar opções existentes
                projectSelect.innerHTML = '';
                
                // Adicionar opção padrão
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Selecione um projeto...';
                projectSelect.appendChild(defaultOption);
                
                // Adicionar projetos
                data.results.forEach(project => {
                    const option = document.createElement('option');
                    option.value = project.id;
                    option.textContent = project.name;
                    projectSelect.appendChild(option);
                });

                taskError.classList.add('is-hidden');
            } else {
                throw new Error(data.message || 'Erro ao carregar projetos');
            }
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
            showToast('Erro ao carregar projetos. Por favor, tente novamente.', 'danger');
            projectSelect.innerHTML = '<option value="">Erro ao carregar projetos</option>';
        }
    }

    // Função para criar tarefa
    async function createTask(token, userId, projectId, taskData) {
        try {
            const taskPayload = {
                name: taskData.name,
                description: taskData.description,
                dueDate: taskData.dueDate,
                userId: userId,
                projectId: projectId,
                status: 1,
                priority: 1,
                position: 1
            };

            console.log('Payload da tarefa:', taskPayload);

            const response = await fetch('https://planko-back.onrender.com/v1/tasks', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(taskPayload)
            });

            const data = await response.json();

            if (response.ok) {
                showToast('Tarefa criada com sucesso!');
                taskForm.reset();
                saveUrlCheckbox.checked = true;
                
                // Fechar popup após criar tarefa
                setTimeout(() => {
                    window.close();
                }, 1000);
            } else {
                if (response.status === 401) {
                    showToast('Sessão expirada. Por favor, faça login novamente.', 'danger');
                } else {
                    throw new Error(data.message || 'Erro ao criar tarefa');
                }
            }
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            if (error.message.includes('Failed to fetch')) {
                showToast('Erro de conexão. Verifique sua internet.', 'danger');
            } else {
                showToast('Erro ao criar tarefa. Por favor, tente novamente.', 'danger');
            }
        }
    }

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

    // Verificar se existe um token salvo
    chrome.storage.local.get(['token', 'userId'], function(result) {
        if (result.token && result.userId) {
            noTokenContent.classList.add('is-hidden');
            withTokenContent.classList.remove('is-hidden');
            loadProjects(result.token);
        } else {
            noTokenContent.classList.remove('is-hidden');
            withTokenContent.classList.add('is-hidden');
            showToast('Token não encontrado. Por favor, faça login nas configurações.', 'danger');
        }
    });

    // Evento de submissão do formulário
    taskForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const projectId = projectSelect.value;
        const name = taskNameInput.value;
        const dueDate = dueDateInput.value;
        const description = document.getElementById('description').value;

        if (!projectId) {
            showToast('Por favor, selecione um projeto.', 'danger');
            return;
        }

        // Verificar se a data é válida
        if (new Date(dueDate) < new Date(today)) {
            showToast('A data de entrega não pode ser anterior a hoje.', 'danger');
            return;
        }

        // Pegar a URL atual da aba
        chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
            let finalDescription = description;

            if (tabs[0] && tabs[0].url && saveUrlCheckbox.checked) {
                const currentUrl = tabs[0].url;
                finalDescription = description + '\n\nSite de referência: ' + currentUrl;
            }

            try {
                // Verificar se há token salvo
                const result = await new Promise(resolve => {
                    chrome.storage.local.get(['token', 'userId'], resolve);
                });

                if (!result.token || !result.userId) {
                    showToast('Token não encontrado. Por favor, faça login nas configurações.', 'danger');
                    return;
                }

                // Criar tarefa
                await createTask(result.token, result.userId, projectId, {
                    name,
                    dueDate,
                    description: finalDescription
                });
            } catch (error) {
                console.error('Erro ao criar tarefa:', error);
                if (error.message.includes('Failed to fetch')) {
                    showToast('Erro de conexão. Verifique sua internet.', 'danger');
                } else {
                    showToast('Erro ao criar tarefa. Por favor, tente novamente.', 'danger');
                }
            }
        });
    });
});
