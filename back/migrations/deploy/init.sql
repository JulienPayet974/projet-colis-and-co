-- SQLBook: Code
-- Deploy colisandco:init to pg
BEGIN;

CREATE DOMAIN "email_validator" AS text CHECK(
    value ~ '^[a-zA-Z0-9.!#$%&''+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$'
);

CREATE DOMAIN "zipcode" AS text CHECK (
    value ~ '^0[1-9]\d{3}$' -- code postaux metropole de 01 a 09
    OR value ~ '^20[1-2]\d{2}$|^20300$' -- code postaux de la Corse
    OR value ~ '^[13-8]\d{4}$' -- code postaux les plus génériques
    OR value ~ '^9[0-6]\d{3}$' -- code postaux metropole commencant par 9
    OR value ~ '^97[1-6]\d{2}$' -- code postaux DOM
    OR value ~ '^98[4678]\d{2}$' -- code postaux TOM
    OR value ~ '^9{5}$' -- code postal de la poste
);

CREATE DOMAIN "posint" AS INT CHECK (value > 0);

CREATE DOMAIN "posnum" AS NUMERIC CHECK (value > 0.0);

CREATE TABLE "users" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" EMAIL_VALIDATOR NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "comp_address" TEXT,
    "zipcode" ZIPCODE NOT NULL,
    "city" TEXT NOT NULL,
    "birth_date" TEXT,
    "phone_number" TEXT NOT NULL,
    "carrier" BOOLEAN NOT NULL,
    "identity_verified" BOOLEAN NOT NULL,
    "role" TEXT DEFAULT 'user',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "delivery" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "type_of_marchandise" TEXT NOT NULL,
    "quantity" POSINT NOT NULL DEFAULT 1,
    "volume" INT NOT NULL,
    "length" INT NOT NULL,
    "width" INT NOT NULL,
    "height" INT NOT NULL,
    "weight" POSNUM NOT NULL,
    "departure_address" TEXT NOT NULL,
    "zipcode" ZIPCODE NOT NULL,
    "city" TEXT NOT NULL,
    "departure_phone_number" TEXT NOT NULL,
    "arrival_address" TEXT NOT NULL,
    "arrival_zipcode" ZIPCODE NOT NULL,
    "arrival_city" TEXT NOT NULL,
    "arrival_phone_number" TEXT NOT NULL,
    "departure_date" TEXT NOT NULL,
    "arrival_date" TEXT NOT NULL,
    "price" POSNUM NOT NULL,
    "image" VARCHAR(255),
    "creator_id" INT REFERENCES "users"("id"),
    "carrier_id" INT REFERENCES "users"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;