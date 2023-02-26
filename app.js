const {
	inquirerMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirmar,
	mostarListadoChecklist,
} = require("./helpers/inquirer");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const Tareas = require("./models/tareas");

const main = async () => {
	let opt = "";
	const tareas = new Tareas();
	const tareasDB = leerDB();

	if (tareasDB) {
		tareas.cargarTareasFromArray(tareasDB);
	}

	do {
		console.clear();
		opt = await inquirerMenu();

		switch (opt) {
			case "1": // Crear tarea
				const desc = await leerInput("Descripción: ");
				tareas.crearTarea(desc);
				break;
			case "2": // Listar tareas
				tareas.listadoCompleto();
				break;
			case "3": // Listar tareas completadas
				tareas.listarPendientes(true);
				break;
			case "4": // Listar tareas pendentes
				tareas.listarPendientes(false);
				break;
			case "5": // Completar tareas
				const ids = await mostarListadoChecklist(tareas.listadoArr);
				tareas.toggleCompletadas(ids);
				break;
			case "6": // Borrar tarea
				const id = await listadoTareasBorrar(tareas.listadoArr);
				if (id === "0") break;
				const ok = await confirmar("¿Estás seguro de eliminar esta tarea?");
				if (ok) {
					tareas.borrarTarea(id);
					console.log("Tarea borrada con exito");
				}
				break;
		}

		guardarDB(tareas.listadoArr);

		await pausa();
	} while (opt !== "0");
};

main();
