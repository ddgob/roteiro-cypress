describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });
    
  it('Verifica contagem de tarefas ativas', () => {
    cy.visit('http://127.0.0.1:7001');
    cy.get('.new-todo')
      .type('Task 1{enter}')
      .type('Task 2{enter}')
      .type('Task 3{enter}');
    cy.get('.todo-list li .toggle')
      .first()
      .click();
    cy.get('.todo-count')
      .should('contain', '2 items left');
  });

  it('Limpa todas as tarefas adicionadas', () => {
    cy.visit('http://127.0.0.1:7001');
    cy.get('.new-todo')
      .type('Task 1{enter}')
      .type('Task 2{enter}')
      .type('Task 3{enter}');
    cy.get('.clear-completed').should('not.be.visible');
    cy.get('.todo-list li .toggle')
      .first()
      .click();
    cy.get('.clear-completed').should('be.visible');
    cy.get('.clear-completed').click();
    cy.get('.clear-completed').should('not.be.visible');
  });

  it('Marca e desmarca compleção de uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');
    cy.get('.new-todo')
      .type('Toggle task{enter}');
    cy.get('.todo-list li .toggle')
      .click();
    cy.get('.todo-list li')
      .first()
      .should('have.class', 'completed');
    cy.get('.todo-list li .toggle')
      .click();
    cy.get('.todo-list li')
      .first()
      .should('not.have.class', 'completed');
  });
  
});