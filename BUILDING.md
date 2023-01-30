# Tudo que precisa saber sobre o deploy

Created time: January 30, 2023 10:52 AM

# 👀 Organização principal

> A organização do código atual é essa
> 
> 
> ![Untitled](Tudo%20que%20precisa%20saber%20sobre%20o%20deploy%200a35af163b6a4f059d1997578c72291a/Untitled.png)
> 

Mas para o deploy, iremos dividir a nossa base de código em duas partes:

- Códigos de criação do deploy
    
    São todos os códigos que apenas irão ser acionados durante o build e/ou deploy para realizarei o build e/ou deploy.
    
- Códigos da aplicação
    
    Todos os códigos que tem como objetivo ser o software que irão ser acionados pelo serviço.
    

---

# 💭 Funcionamento da criação do deploy

> Para o deploy alguns arquivos e pastas precisam ficar em evidências, como:
- `assets/`
- `config/`
- `tsconfig.build.json/`
- `webpack.config.js`
> 

Para o deploy, é aplicado um passo-a-passo simples com a seguinte ordem:

## ⚒️ **Fase de build - Criação do build da aplicação**

---

- `tsconfig.build.json` é acionado para transpilar o ts → js
    
    O ts.build.json compila todo o código da aplicação ( do software ) para dentro de uma pasta chamada `dist` . Criando então um arquivo `.js` dentro dela. 
    
    <aside>
    💡 É importante que a transpilação seja para CommonJS, isso porque um pacote que iremos usar posteriormente chamado `pkg` não interpreta o ESModules.
    
    </aside>
    
    <aside>
    💡 É importante também que o código da aplicação possa se concentrar em um arquivo, isso não quer dizer que só precisa ter um arquivo, mas sim que precisa ter um arquivo de inicialização.
    
    </aside>
    
- Cria o `service-install.exe` e `service-uninstall.exe` dentro de **assets/**
    - Através do pacote `pkg` é possível criar executáveis através de scripts, então é criado um executável através do script `service-install.js` e outro de `service-uninstall.js`  que estão em `assets/js/`
    - Esses scripts são responsáveis por chamar por `cmd` do windows os arquivos `.bat`
    - Esses executáveis só serão acionados após a instalação de arquivos na máquina do cliente.
    - Antes do `pkg` empacotar cada script, ele usa o `services-pkg-config.json` para definir configurações, veja configurações abaixo
        
        ```bash
        {
            "pkg": {
                "scripts": "./config/*.js",
                "targets": ["node14-win-x64"]
            }
        }
        ```
        
        - Basicamente, ao empacotar, ele empacota tanto o arquivo js: `service-installer.js` ou `service-uninstall.js`  mas também o arquivo de configuração definido em `config/`
        - Esse arquivo de configuração é importante para definir o nome das variáveis globais, como: **Nome do serviço**, **nome da aplicação, local absoluto da aplicação em desenvolvimento, local absoluto da aplicação no deploy, etc…**
- `webpack.config.js` é acionado para realizar o bundle do código da aplicação
    - O bundle do webpack cria em um arquivo só, toda a nossa aplicação. Ou seja, todos os `imports` que contém dentro do arquivo de inicialização da aplicação são literalmente importados para dentro de um arquivo. Contendo tudo que seja necessário para aquele arquivo rodar dentro dele mesmo.
    - O webpack irá criar uma pasta chamada `build/` na pasta raiz do projeto, contendo o arquivo de bundle: `bundle.js` e um arquivo de licença do próprio webpack
    

<aside>
💡 Após o webpack criar a pasta `build/` alguns comandos bash são passados

</aside>

- Comandos
    
    ```bash
    cp -r assets/* build/ &&  mkdir build\\logs && rm -rf build/js/
    ```
    
    - Copia tudo que está na pasta `assets/` para dentro da pasta `build/`
    - Cria uma pasta `logs/` dentro de `build/`
    - Deleta a pasta `js/` da pasta `build/`
    
- Cria o `build.exe`
    - O arquivo bundle.js que foi criado pelo webpack agora é empacotado em uma aplicação node através do `pkg` , para que não seja necessário ter o node instalado na máquina do usuário para rodar nossa aplicação.
    - Criará um arquivo chamado `build.exe` dentro da pasta `build/`

## 📦 Fase de preparação para o deploy - Empacotando a aplicação

---

- Comprimir a pasta `build/`
    - A pasta build/ agora tem tudo que é necessário para que a aplicação funcione, externamente, só faltaria copiar e colar a mesma dentro da máquina do usuário. Então iremos fazer isso de uma forma ideal e precisa.
    - A pasta `build/` é comprimida através do arquivo `compress.js` que está dentro de `assets/js` e o arquivo `build.zip`  é colocado dentro de `assets/`
- Crio o executável do deploy, o `monitory_sftw.exe`
    - Para entender melhor como o monitory_sftw funciona, é importante entender o `pkg`
        - No pkg, o executável sempre executará um arquivo .js, rodando através do node. Com o comando `node <nome do arquivo>` e poderá adicionar outros arquivos como assets e/ou como scripts
    - No caso do monitory_sftw.exe, o arquivo de inicialização é o `decompress.js` localizado em `assets/js/decompress.js`, esse arquivo tem a função de descompactar o `build.zip`
    - Como um assets para o `pkg` é passado o `build.zip`  ou seja, o build.zip é empacotado junto com o decompress.js
    - E como um script adicional, é passado o `config/global.js` que contém variáveis globais. Um arquivo de configuração global.
    - Todas essas configurações sobre o `pkg` gerar o monitory_sftw.exe está no package.json, na aba:
    
    ```json
    "bin": "assets/js/decompress.js", -> Arquivo de inicialização do pkg
    "pkg": {
    		"scripts": [
    			"assets/js/decompress.js",
    			"./config/*.js"
    		],
    		"assets": [
    			"assets/build.zip"
    		],
    		"targets": [
    			"node14-win-x64"
    		]
    	},
    ```
    
       
    

<aside>
💡 Após o monitory_sftw.exe ser gerado, ele poderá ser compartilhado com qualquer usuário e partirá para a fase de instalação

</aside>

## 🚀 **Fase de Instalação**

---

 Na instalação o `monitory_sftw.exe` irá chamar o `decompress.js` que irá realizar as seguintes funções

- Criação de pastas
    
    Através do código, o node irá criar a seguinte pasta em `C:\ProgramData\<nomeDaAplicação>` , onde `nomeDaAplicação` é definida pelas configurações globais em `config/globals.js`
    
- Extração de arquivos
    
    Lembra que precisaríamos copiar e colar a pasta `build/` para dentro da máquina do cliente?
    
    É exatamente isso que estamos fazendo agora, atraves do decompress.js ele irá chamar uma função que irá extrair o arquivo `build.zip` , que contém antiga pasta `build/` para dentro de `C:\ProgramData\<nomeDaAplicação>`.
    
- Instalação do serviço
    
    Após extrair a pasta, o caminho `C:\ProgramData\<nomeDaAplicação>\` estará com os nossos executáveis que instalam o serviço, e o executável do script da nossa aplicação.
    
    Portando ainda, através do `decompress.js` o executável de instalação de serviço é chamado através do terminal `cmd` e o serviço é instalado na máquina do usuário
    
    <aside>
    💡 Lembrando que ao instalar o serviço, o serviço irá procurar por um arquivo `build.exe` que é o arquivo da nossa aplicação empactado. Ou seja, ao iniciar, o serviço irá executar esse script em background
    
    </aside>
    
- Bônus: Desinstalação de serviço
    
    Na pasta descompactada, também terá um arquivo chamado `service-unistall.exe` , esse arquivo tem como função remover a serviço criado. Ele não é executado pelo código, mas caso necessite desinstalar, basta executar direto da pasta.