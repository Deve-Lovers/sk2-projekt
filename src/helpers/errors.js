export const errorMessage = (error) => {
  switch (error) {
    case 'Invalid user!':
      return 'Błąd logowania - sprawdź login oraz hasło';
    case 'Missing fields':
      return 'Wypełnij brakujące pola';
    case 'Invalid email':
      return 'Błędny format adresu email';
    default:
      return 'Nieznany błąd';
  }
};
