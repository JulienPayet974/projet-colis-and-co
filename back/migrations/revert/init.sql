-- Revert colisandco:init from pg
BEGIN;

DROP TABLE "users",
"delivery";

DROP DOMAIN email_validator;

DROP DOMAIN zipcode;

DROP DOMAIN posint;

DROP DOMAIN posnum;

COMMIT;