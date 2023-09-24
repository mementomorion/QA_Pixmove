describe('ToDo', () => {

  //#1 Перейти на сайт https://forhemer.github.io/React-Todo-List/

  beforeEach(() => {
    cy.visit('https://forhemer.github.io/React-Todo-List/'); 
  });

  it('Проверка ToDo', () => {
    cy.get('.todo-list li').should('have.length', 0)

    //#2 Добавить поочерёдно 3 элемента в ToDo лист

    // Текст для новых элементов для добавления в ToDo.
    const Item1 = 'Проверка работы ToDo!'
    const Item2 = 'Checking the operation of ToDo!'
    const Item3 = 'التحقق من تشغيل تودو!' 


    cy.get('[class=input-text]').type(`${Item1}{enter}`)
    cy.get('[class=input-text]').type(`${Item2}{enter}`)
    cy.get('[class=input-text]').type(`${Item3}{enter}`)


    //#3 Проверить, что элементов в листе стало действительно 3
    cy.get('.inner li')
      .should('have.length', 3)
      .last()
      .find('span')
      .should('have.text', Item3)


    //#4 Пометить один из элементов как выполненный (галочкой в чекбоксе)

    cy.contains('Проверка работы ToDo!')
      .parent()
      .find('input[type=checkbox]')
      .check()

    //#5 Проверить, что текст этого элемента стал зачёркнутым

    // cy.contains('Проверка работы ToDo!')
    // .should('have.css', 'text-decoration', 'line-through solid rgb(89, 89, 89)');
    
    //**Сверяем через css атрибут solid, чтобы не иметь зависимости к цвету.  
    cy.contains('Проверка работы ToDo!')
    .should(($element) => {
      const textDecoration = $element.css('text-decoration');
      expect(textDecoration).to.match(/line-through solid/);
    });

    //#6 Удалить элемент из списка

    cy.contains('Проверка работы ToDo!')
    .parent()
      .find('button[type=button]')
      .click()

    //#7 Проверить, что элемент больше не отображается в списке
    cy.contains('Проверка работы ToDo!').should('not.exist')


  })
})