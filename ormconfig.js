module.exports = {
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
