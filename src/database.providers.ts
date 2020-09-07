import {createConnection} from "typeorm";

export const databaseProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: async() => await createConnection({
			type: 'mysql',
			host: 'mysql',
			port: 3306,
			username: 'root',
			password: 'root',
			database: 'sermabud',
			entities: [
				__dirname + 'dist/**/*.entity{.ts,.js}',
			],
			synchronize: true,
		})
	},
];
