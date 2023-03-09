### Implementar de acordo com a aplicação

## ⚒️ Funcionamento

Ao instalar a aplicação, será agendada uma tarefa no agendador de tarefas do Windows, apontando para a aplicação principal. 
Isso fará com que a aplicação rode em background através do agendador de tarefas.

- A tarefa é configurada para começar apenas quando algum usuário fazer logon.
- A tarefa esta apontada para o diretório do executável da aplicação `C:/ProgramData/ODSSauron/..`.
- A tarefa não é responsável por manter a aplicação em pé, quem fará isso é a aplicação em si.

- ## [Sobre building e deploy](./BUILDING.md)
- ## [Sobre criação de tasks](./TASKS.md)


## 🚀 Instalando a aplicação

No [repositório do software](https://github.com/jsassessoria-consultoria/monitory-software) procure pela aba de `releases`, encontrado na aba à direita na seção `<>code`, e clique.

![image](https://user-images.githubusercontent.com/98192816/222907286-6eb8eb85-77f4-4f26-b1d8-941e7b888057.png)


- Procure pela versão mais recente (a mais ao topo), procure pela seção de `Assets` e baixe o arquivo `ods_sauron_sftw.exe`. 

![image](https://user-images.githubusercontent.com/98192816/222907409-0a56b02b-aa55-4a84-950b-da9bc33aa6f5.png)


- Se caso o navegar informar que aquela aplicação não é segura, mantenha o download mesmo assim
- Após o termino do download, vá para a pasta onde o arquivo foi baixado e o execute como administrador

![image](https://user-images.githubusercontent.com/98192816/222907477-fb099c57-2883-47a8-b81d-7e6a1413f46f.png)

- O arquivo irá abrir o prompt de comando, instalar as pastas e dependências automaticamente e inicialiar a task.

- Após esse processo a task se inicializará automaticamente na máquina do usuário. Sem necessidade de aplicar mais nenhum comando.

- Caso sinta dúvidas se a instalação foi completa após a conclusão da instalação você pode verificar no gerenciador de tarefas se a task `ODSSauron` está em execução.


## 🗑️ Desinstalando/Parando a task

Caso sinta a necessidade de desinstalar as pastas e a task em sua máquina, realize os seguintes passos

- Vá em `C:` e procure pela pasta `ProgramData`. Por padrão a pasta `ProgramData` é ocultada pelo windows, então procure a aba `Exibir` no cabeçalho do explorador de arquivos e ative a opção de itens ocultos, logo em seguida a pasta será exibida.

- Após entrar em `ProgramData` procure pela pasta da aplicação `ODSSauron`, nesta pasta estão todos os aquivos que o programa necessita para funcionar corretamente.

- Procure pelo arquivo `task-uninstall.exe` e o execute como administrador 

- O prompt de comando será aberto e a task será parado e desintalado do seu computador.
- Nesse momento fique a vontade para deletar esse diretório.
- Caso queira instalar novamente a aplicação, siga os passos dados em [aqui](#🚀-instalando-a-aplicação)
