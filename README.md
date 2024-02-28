# Supabase
## Local Server
```
pnpm exec supabase start
pnpm exec supabase status
```


## Migration
### Create
```
pnpm exec supabase migration new <migration name>
```

### List & Up
```
pnpm exec supabase migration list
pnpm exec supabase migration up
```

## Gen Types of Schema
```
pnpm exec supabase gen types typescript --local --schema app --schema public > ./apps/web/src/app/server/infra/database.types.ts
```
