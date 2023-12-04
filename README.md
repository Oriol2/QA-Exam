# QA-Aizon

## Getting Started

Please follow the next intructions to execute my code.

### Test data
- **username**: oriol
- **password**: qatest

### Prerequisites

1. Make sure there is no product added in cart for the test data credentials above
2. Since `https://api.demoblaze.com/view` API is called for each product added, the following code will take ONLY the first price of all products selected:
```
cy.wait("@view").then((xhr) => {
    expect(xhr.response).to.have.property("statusCode", 200);
    cy.wrap(xhr.response.body.price).as("price");
  });
```
![Captura de pantalla (3)](https://github.com/Oriol2/QA-Exam/assets/90322159/d03451a0-5f5d-4873-a995-ff9b8108d95c)

3. Therefore, the total order calculation will fail
4. IMO, `https://api.demoblaze.com/view` API should return the total price amount in response instead of calling one API per product

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Oriol2/QA-Exam.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run cypress using terminal screen
   ```sh
   npx cypress run --spec cypress/e2e/aizon.feature --browser chrome
   ```
   ![Captura de pantalla (1)](https://github.com/Oriol2/QA-Exam/assets/90322159/522b989c-ceea-4884-898c-fb3eddbac488)

OR

3. Run cypress using UI screen
   ```sh
   npx cypress open
   ```
   ![Captura de pantalla (2)](https://github.com/Oriol2/QA-Exam/assets/90322159/44c8eb29-36b7-4cf0-b9f9-ff82b066e402)


