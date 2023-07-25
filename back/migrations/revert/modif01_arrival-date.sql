-- Revert colisandco:modif01_arrival-date from pg
BEGIN;

ALTER TABLE
    "delivery"
ALTER COLUMN
    "arrival_date"
SET
    NOT NULL;

COMMIT;