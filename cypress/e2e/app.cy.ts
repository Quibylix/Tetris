describe("app test", () => {
  it("renders a canvas with the game", () => {
    cy.visit("/");
    cy.get("canvas").should("be.visible");
  });

  it("renders a navbar with the Tetris title", () => {
    cy.visit("/");
    cy.get("nav").should("be.visible");
    cy.get("nav").contains("TETRIS");
  });
});
