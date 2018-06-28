create table if not exists users (
    provider text,
    spotify_id text, 
    username text,
    displayName text,
    profileUrl text,
    photos text,
    country text, 
    followers integer,
    product text
)