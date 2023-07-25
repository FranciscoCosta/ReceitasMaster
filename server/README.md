
  <h1>MasterReceita Backend</h1>

  <p>O backend do MasterReceita foi desenvolvido utilizando o framework Nest.js com Typescript, e a base de dados foi implementada usando o Docker com PostgreSQL.</p>

   <h2>Configuração do Ambiente</h2>
    <ol>
        <li>Navegue para o diretório "server" e execute o comando para instalar as dependências:</li>
    </ol>
    <pre><code>cd sever
npm install
    </code></pre>

  <p>Renomeie o arquivo <code>.example.env</code> para <code>.env</code> e configure as variáveis de ambiente necessárias.</p>

  <p>Certifique-se de que o Docker Desktop esteja instalado e em execução em sua máquina.</p>

  <p>Agora, inicie o servidor de desenvolvimento:</p>
    <pre><code>npm run start:dev
    </code></pre>

  <h2>Rotas</h2>

  <h3>Autenticação</h3>
    <ul>
        <li><code>POST /auth/signin</code>: Permite ao usuário fazer login e gera um token de acesso.</li>
        <li><code>POST /auth/signup</code>: Permite cadastrar um novo usuário. Todos os dados são validados antes de serem armazenados.</li>
    </ul>

  <h3>Usuários</h3>
    <ul>
        <li><code>GET /users/me</code>: Devolve as informações do usuário logado.</li>
        <li><code>GET /users/:id</code>: Devolve as informações do usuário com o ID fornecido na rota.</li>
        <li><code>PATCH /users/</code>: Usada para atualizar os dados do usuário logado.</li>
    </ul>

  <h3>Receitas</h3>
    <ul>
        <li><code>GET /recipes</code>: Devolve todas as receitas disponíveis.</li>
        <li><code>GET /recipes/:id</code>: Devolve as informações da receita com o ID fornecido na rota.</li>
        <li><code>POST /recipes</code>: Usada para criar uma nova receita.</li>
        <li><code>PATCH /recipes/:id</code>: Usada para atualizar os dados de uma receita. Esta rota é protegida para que apenas o dono da receita possa alterá-la.</li>
        <li><code>DELETE /recipes/:id</code>: Usada para apagar uma receita. Esta rota também é protegida para que apenas o dono da receita possa excluí-la.</li>
        <li><code>GET /recipes/my-recipes</code>: Usada para buscar as receitas do usuário logado.</li>
    </ul>

   <h3>Reviews</h3>
    <ul>
        <li><code>GET /reviews/:id</code>: Devolve todas as reviews da receita com o ID fornecido na rota.</li>
        <li><code>POST /reviews/:id</code>: Cria uma nova review para a receita com o ID fornecido na rota. Esta rota é protegida, permitindo que apenas usuários autenticados façam reviews.</li>
        <li><code>PATCH /reviews/:id</code>: Atualiza uma review existente para a receita com o ID fornecido na rota. Esta rota também é protegida e requer autenticação.</li>
        <li><code>DELETE /reviews/:id</code>: Apaga uma review existente da receita com o ID fornecido na rota. A rota é protegida para garantir que apenas o autor da review possa excluí-la.</li>
    </ul>

  <h2>Testes</h2>
    <p>Foram utilizados testes end-to-end para garantir a funcionalidade correta das rotas e da lógica do backend. Para rodar os testes, siga as instruções abaixo:</p>

  <ol>
        <li>Renomeie o arquivo <code>example.env.test</code> para <code>.env.test</code> e configure as variáveis de ambiente necessárias para o ambiente de teste.</li>
        <li>Execute o seguinte comando para reiniciar o banco de dados de teste:</li>
    </ol>
    <pre><code>npm run db:test:restart
    </code></pre>

  <p>Agora, inicie os testes:</p>
    <pre><code>npm run test
    </code></pre>

</body>
</html>
