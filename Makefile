
typecheck:
	pnpm exec tsc --watch

gen.schema:
	pnpm exec supabase gen types typescript --local --schema app --schema public > ./apps/web/src/app/server/common/supabase/database.types.ts

