CREATE SCHEMA IF NOT EXISTS app;

GRANT USAGE ON schema app TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA app TO service_role;

