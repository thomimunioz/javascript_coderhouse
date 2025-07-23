const discos_disponibles = [
    {titulo: 'Dark Side of the Moon', artista: 'Pink Floyd', precio: 200}, 
    {titulo: 'I Never Loved A Man', artista: 'Aretha Franklin', precio:350}, 
    {titulo: 'El Amor Después del Amor', artista: 'Fito Paez', precio: 400}, 
    {titulo: 'To Pimp A Butterfly', artista: 'Kendrick Lamar', precio: 500},
    {titulo: 'Whats Going On', artista: 'Marvin Gaye', precio: 250}]

const nombre_usuario = prompt(
    '¡Bienvenido a Vinilos Indigo!\n\n'+
    'Por favor, ingresá tu nombre para comenzar:\n'
);

let dinero_disponible = prompt(
    `¡Hola ${nombre_usuario}!

    ¿Cuanto dinero quiere ingresar para comprar?`
);

let salir = false;

do {
    const opcion = prompt(
        `${nombre_usuario}, por favor elegí una opción:
        1 - Ver saldo disponible
        2 - Comprar discos
        3 - Salir`
    );

    switch(opcion) {
        case '1':
            alert(`Tu saldo actual esTho: $${dinero_disponible}`);
            break;

        case '2':
            let total = 0;
            let salirMenuDiscos = false;
            let discos_comprados = [];

            do {
                let mensaje = '';

                for (let i = 0; i < discos_disponibles.length; i++) {
                    mensaje += `${i+1} - ${discos_disponibles[i].titulo} - ${discos_disponibles[i].artista} - Precio: $${discos_disponibles[i].precio}\n`;
                }

                let disco_elegido = Number(prompt(
                    'Elegí el número del disco que querés comprar o ingresá 0 para volver al menú principal:\n\n' + 
                    mensaje + 
                    '\nTotal gastado: $' + total
                ));

                if (disco_elegido === 0) {
                    salirMenuDiscos = true;
                } else if (disco_elegido >= 1 && disco_elegido <= discos_disponibles.length) {
                    const precio = discos_disponibles[disco_elegido - 1].precio;

                    if (dinero_disponible >= precio) {
                        discos_comprados.push(disco_elegido);
                        total += precio;
                        dinero_disponible -= precio;
                        alert(`Compraste: ${discos_disponibles[disco_elegido - 1].titulo}. Te quedan $${dinero_disponible} disponibles para seguir comprando.`);
                    } else {
                        alert('No te alcanza el saldo para comprar este disco');
                    }
                } else {
                    alert('Opción inválida, por favor ingresá un número válido.');
                }

            } while (!salirMenuDiscos);

            break;

        case '3':
            alert(`¡Adiós ${nombre_usuario}, gracias por tu visita!`);
            salir = true;
            break;

        default:
            alert('Opción inválida. Por favor, elija una opción del menú.');
    }
} while (!salir);