const { addition, estPair, capitaliser } = require('../utils/utils');

describe('Tests unitaires : utils.js', () => {

    describe('Fonction addition', () => {
        test('doit additionner deux nombres positifs', () => {
            expect(addition(2, 3)).toBe(5);
        });

        test('doit gérer les nombres négatifs', () => {
            expect(addition(-2, -3)).toBe(-5);
        });

        test('doit additionner un positif et un négatif', () => {
            expect(addition(10, -5)).toBe(5);
        });
    });

    describe('Fonction estPair', () => {
        test('doit retourner true pour un nombre pair', () => {
            expect(estPair(4)).toBe(true);
            expect(estPair(0)).toBe(true);
        });

        test('doit retourner false pour un nombre impair', () => {
            expect(estPair(3)).toBe(false);
            expect(estPair(7)).toBe(false);
        });
    });

    describe('Fonction capitaliser', () => {
        test('doit mettre la première lettre en majuscule', () => {
            expect(capitaliser('bonjour')).toBe('Bonjour');
        });

        test('doit gérer une chaîne vide', () => {
            expect(capitaliser('')).toBe('');
        });

        test('ne doit pas changer une chaîne déjà capitalisée', () => {
            expect(capitaliser('Monde')).toBe('Monde');
        });

        test('doit gérer une chaîne d\'une seule lettre', () => {
            expect(capitaliser('a')).toBe('A');
        });
    });
});