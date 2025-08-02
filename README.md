## Getting Started

Easiest way to run is using docker compose file:
```bash
docker compose up --build
```
If you run into a migration mismatch or drift error, reset the database with:

```bash
docker compose down -v --remove-orphans
```

Then run again:
```bash
docker compose up --build
```

Local Development
1. Start up local mysql server and create a database named tasksdb

2. Add .env and add database url 
```bash
DATABASE_URL="mysql://user:password@localhost:3306/tasksdb"
```
3. run these commands
```bash
npm install
npx prisma db push
npx prisma generate //if schema was changed
npm run dev
```
