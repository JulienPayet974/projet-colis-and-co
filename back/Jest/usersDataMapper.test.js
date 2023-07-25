const usersDataMapper = require('../app/models/usersDataMapper');
const client = require('../app/models/helpers/database'); // ou utilisez un mock pour simuler la base de données

// Définissez une suite de tests pour le datamapper
describe('usersDataMapper', () => {
  // Définissez une suite de tests pour la méthode `getUserByEmail`
  describe('getUserByEmail', () => {
    // Définissez un test pour vérifier que la méthode renvoie l'utilisateur avec l'email fourni
    it('should return the user with the provided email', async () => {
      // Arrange : définissez les entrées et les sorties attendues du test
      const email = 'test@example.com';
      const expectedUser = {
        id: 1,
        email,
        password: 'hashedPassword',
        firstName: 'John',
        lastName: 'Doe',
      };
        // Créez un faux objet de résultat de base de données avec les données attendues
      const mockResult = {
        rows: [expectedUser],
      };
        // Utilisez un mock pour simuler la méthode `query` du client de base de données
      jest.spyOn(client, 'query').mockResolvedValue(mockResult);

      // Act : exécutez la méthode à tester
      const result = await usersDataMapper.getUserByEmail(email);

      // Assert : vérifiez que la méthode a renvoyé les résultats attendus
      // Vérifiez que la méthode `query` a été appelée avec la requête SQL et les valeurs attendues
      expect(client.query).toHaveBeenCalledWith({
        text: expect.stringContaining('SELECT'),
        values: [email],
      });
      // Vérifiez que la méthode a renvoyé l'utilisateur attendu
      expect(result).toEqual(expectedUser);
    });

    // Définissez un test pour vérifier que la méthode renvoie `undefined` si aucun utilisateur n'est trouvé avec l'email fourni
    it('should return undefined if no user with the provided email is found', async () => {
      // Arrange : définissez les entrées et les sorties attendues du test
      const email = 'nonexistent@example.com';
      // Créez un faux objet de résultat de base de données avec un tableau vide
      const mockResult = {
        rows: [],
      };
        // Utilisez un mock pour simuler la méthode `query` du client de base de données
      jest.spyOn(client, 'query').mockResolvedValue(mockResult);

      // Act : exécutez la méthode à tester
      const result = await usersDataMapper.getUserByEmail(email);

      // Assert : vérifiez que la méthode a renvoyé les résultats attendus
      // Vérifiez que la méthode `query` a été appelée avec la requête SQL et les valeurs attendues
      expect(client.query).toHaveBeenCalledWith({
        text: expect.stringContaining('SELECT'),
        values: [email],
      });
      // Vérifiez que la méthode a renvoyé `undefined`
      expect(result).toBeUndefined();
    });
  });
});
