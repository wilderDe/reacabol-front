const { renderHook } = require("@testing-library/react");
const { useAuthJest } = require("../../src/hooks/useAuthJest");


/*describe('Pruebas de useAuth', () => {

    test('verifica que las funciones se devuelvan correctamente', () => {
        const { result } = renderHook( () => useAuthJest() )
        const { verificarLogin, renovarToken, logout } = result.current
        expect(typeof verificarLogin).toBe('String');
        expect(typeof renovarToken).toBe('function');
        expect(typeof logout).toBe('function');

    });

} ) ;
*/

describe('Pruebas de autenticacion', () => {
    test('Debe llamar a verificarLogin y que los parametros sean enviados', 
        async () => {
        
            const { result } = renderHook(() => useAuthJest())
            const { verificarLogin } = result.current;

            const usuario = "usuarioDesc"
            const password = "password"

            await verificarLogin({ usuario, password })
    })
})


