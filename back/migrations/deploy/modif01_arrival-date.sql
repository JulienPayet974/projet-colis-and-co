-- SQLBook: Code
-- Deploy colisandco:modif01_arrival-date to pg
BEGIN;

ALTER TABLE
    "delivery"
ALTER COLUMN
    "arrival_date" DROP NOT NULL;

COMMIT;