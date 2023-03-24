# Tudo que precisa saber sobre o código de task

# 👀 Detalhes

> Uma tarefa é criada no windows através do Agendador de tarefas do Windows, 
> A tarefa é executada toda vez que um usuário faz Logon 

---

# 💭 Funcionamento

> Uma tarefa é apontada para um executável. Caso queira verificar as funções da tarefa, procure por `ODSSauron` no agendador de tarefas.
> Ou consulte o `task.xml` em assets

> A criação/verificação/execução da tarefas foi delegada para o  momento da instalação, passando a responsabilidade para o `NSIS` ( sistema de instalação criado pelo electron-builder)

> O script customizado do NSIS passado para o electron-builder está localizado em `custom.nsh` em assets

Resumidamente, o `custom.nsh` executa a seguinte análise:

 | PreInit <br><sub>( antes de instalar )</sub>| customInstall  <br><sub>(momento da instalação)</sub> | customCheckAppRunning <br><sub>(verificar se a aplicação está rodando)</sub> | 
| --------------------|---------------------|--------------------|
| Define local de instalação na pasta `Arquivos de Programas/ODSSauron` | deleta a task `ODSSauron` |  No momento da desinstalação essa função é chamada e deleta todas as task com o nome `ODSSauron`
|  | cria a task `ODSSauron` de acordo com o `task.xml` |   No momento da desinstalação essa função é chamada e para todos os processos com o nome `ODSSauron`|  
|  |  executa a task `ODSSauron` |  Em caso de erro na desisntalação é pedido ao usuário uma nova tentatica
