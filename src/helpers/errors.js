export const errorMessage = (error) => {
  switch (error) {
    case 'Invalid user!':
      return 'Błąd logowania - sprawdź login';
    case 'Invalid password!':
      return 'Błąd logowania - błędne hasło';
    case 'Missing fields':
      return 'Wypełnij brakujące pola';
    case 'Invalid email':
      return 'Błędny format adresu email';
    case 'Account already exists':
      return 'Konto o podanym adresu email już istnieje';
    default:
      return 'Nieznany błąd';
  }
};
