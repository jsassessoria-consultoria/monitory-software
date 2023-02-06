### Implementar de acordo com a aplicação

- ## [Sobre building e deploy](./BUILDING.md)
- ## [Sobre criação de serviços](./SERVICES.md)


## 🚀 Instalando a aplicação

No [repositório do software](https://github.com/jsassessoria-consultoria/monitory-software) procure pela aba de `releases`, encontrado na aba à direita na seção `<>code`, e clique.

#### imagem repo aqui

- Procure pela versão mais recente (a mais ao topo), procure pela seção de `Assets` e baixe o arquivo `ods_sauron_sftw.exe`. 

#### imagem releases aqui

- Se caso o navegar informar que aquela aplicação não é segura, mantenha o download mesmo assim
- Após o termino do download, vá para a pasta onde o arquivo foi baixado e o execute como administrador

#### imagem clicando aqui

- O arquivo irá abrir o prompt de comando, instalar as pastas e dependências automaticamente e inicialiar o serviço.

- Após esse processo o serviço se inicializará automaticamente na máquina do usuário. Sem necessidade de aplicar mais nenhum comando.

- Caso sinta dúvidas se a instalação foi completa após a conclusão da instalação você pode verificar no gerenciador de tarefas se o serviço `ODSSauron` está em execução.


## 🗑️ Desinstalando/Parando o serviço

Caso sinta a necessidade de desinstalar as pastas e o serviço em sua máquina, realize os seguintes passos

- Vá em `C:` e procure pela pasta `ProgramData`. Por padrão a pasta `ProgramData` é ocultada pelo windows, então procure a aba `Exibir` no cabeçalho do explorador de arquivos e ative a opção de itens ocultos, logo em seguida a pasta será exibida.

- Após entrar em `ProgramData` procure pela pasta da aplicação `ODSSauron`, nesta pasta estão todos os aquivos que o programa necessita para funcionar corretamente.

- Procure pelo arquivo `service-uninstall.exe` e o execute como administrador 

#### Imagem clicando aqui

- O prompt de comando será aberto e o serviço será parado e desintalado do seu computador.
- Nesse momento fique a vontade para deletar esse diretório.
- Caso queira instalar novamente a aplicação, siga os passos dados em [aqui](#🚀-instalando-a-aplicação)