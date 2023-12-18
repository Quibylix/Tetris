describe("app test", () => {
  it("renders a canvas with the game", () => {
    cy.visit("/");
    cy.get("canvas").should("be.visible");
  });
});
