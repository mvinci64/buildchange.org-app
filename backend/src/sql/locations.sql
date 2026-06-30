-- Serving view for GET /locations and GET /building/{id}.
-- Decouples the stable API contract from the physical schema (DEVELOPER_BOOK.md ADR-009).
-- The CASE bands MUST match app/src/utils/damage.ts and backend/src/lib/damage.ts (§15.3).

SET search_path TO "NEPALAID", public;

-- damage_by_ward is loaded from Nepal_Aid_New45.csv (columns WARD, DAMAGE_PCT_0M).
-- Replace with a materialized view if the dataset grows.
--   CREATE TABLE damage_by_ward (ward_id TEXT PRIMARY KEY, damage_pct_0m DOUBLE PRECISION);

CREATE OR REPLACE VIEW v_locations AS
SELECT
    w."ID"                                                              AS id,
    COALESCE(w."MUNICIPALITY_NAME_EN", w."DISTRICT_NAME_EN", w."DISTRICT_NAME") AS district,
    COALESCE(w."WARD_NAME_EN", w."WARD_NAME", w.ward)                   AS ward,
    ST_Y(ST_Centroid(ST_Transform(w.geom, 4326)))                      AS lat,
    ST_X(ST_Centroid(ST_Transform(w.geom, 4326)))                      AS lon,
    CASE
        WHEN d.damage_pct_0m > 0.75 THEN 4
        WHEN d.damage_pct_0m > 0.50 THEN 3
        WHEN d.damage_pct_0m > 0.25 THEN 2
        ELSE 1
    END                                                                AS damage_group
FROM "WARDS" w
JOIN damage_by_ward d ON d.ward_id = w."WARD_ID";

-- Spatial index recommended on the source geometry:
-- CREATE INDEX IF NOT EXISTS wards_geom_gix ON "WARDS" USING GIST (geom);
